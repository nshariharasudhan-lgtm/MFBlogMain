import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, "../data");
const DB_FILE = path.join(DATA_DIR, "behavior_analytics.json");
const TMP_FILE = path.join(DATA_DIR, "behavior_analytics.tmp.json");

export interface AnalyticsEvent {
  id?: string;
  type: "page_view" | "tool_interaction" | "dwell_time" | "scroll_depth" | "search_query" | "share_click";
  sessionId: string;
  timestamp?: string;
  path: string;
  title?: string;
  category?: string;
  toolId?: string;
  dwellSeconds?: number;
  maxScrollPercentage?: number;
  metadata?: Record<string, any>;
}

export interface ContentAffinityItem {
  path: string;
  title: string;
  category: string;
  views: number;
  totalDwellSeconds: number;
  avgDwellSeconds: number;
  scroll25: number;
  scroll50: number;
  scroll75: number;
  scroll100: number;
  shares: number;
  affinityScore: number; // 0 - 100 calculated by algorithm
  lastViewed: string;
}

export interface ToolUsageItem {
  toolId: string;
  toolName: string;
  category: "calculator" | "guide" | "hub" | "reference";
  path: string;
  usesCount: number;
  interactionsCount: number;
  shareClicks: number;
  avgSessionSeconds: number;
  stickinessIndex: number; // 0 - 100 calculated by algorithm
  lastUsed: string;
}

export interface SearchQueryItem {
  query: string;
  count: number;
  resultsFound: boolean;
  lastSearched: string;
}

export interface UserJourneyPattern {
  fromPath: string;
  toPath: string;
  count: number;
  transitionProbability: number;
}

export interface AnalyticsDatabaseState {
  databaseId: "yieldnest_behavior_analytics_isolated_v1";
  version: 1;
  description: "Dedicated behavioral intelligence database - strictly isolated from Supabase CMS";
  createdAt: string;
  lastUpdated: string;
  summary: {
    totalSessions: number;
    totalPageViews: number;
    totalToolInteractions: number;
    totalActiveReadingMinutes: number;
    avgDwellSecondsPerSession: number;
  };
  contentAffinity: Record<string, ContentAffinityItem>;
  toolUsage: Record<string, ToolUsageItem>;
  navigationTransitions: Record<string, number>;
  searchQueries: Record<string, SearchQueryItem>;
  recentSessions: Array<{
    sessionId: string;
    startedAt: string;
    lastActiveAt: string;
    deviceType: "desktop" | "mobile" | "tablet";
    pagesVisited: string[];
    toolsUsed: string[];
    totalDurationSeconds: number;
  }>;
}

// Clean initial database state: Zero dummy figures, strictly authentic visitor tracking
export function getCleanInitialDatabase(): AnalyticsDatabaseState {
  const now = new Date().toISOString();
  return {
    databaseId: "yieldnest_behavior_analytics_isolated_v1",
    version: 1,
    description: "Dedicated behavioral intelligence database - strictly isolated from Supabase CMS",
    createdAt: now,
    lastUpdated: now,
    summary: {
      totalSessions: 0,
      totalPageViews: 0,
      totalToolInteractions: 0,
      totalActiveReadingMinutes: 0,
      avgDwellSecondsPerSession: 0,
    },
    contentAffinity: {},
    toolUsage: {},
    navigationTransitions: {},
    searchQueries: {},
    recentSessions: [],
  };
}

// In-Memory state for low-latency operations
let dbState: AnalyticsDatabaseState | null = null;
let saveDebounceTimer: NodeJS.Timeout | null = null;

// Initialize or load isolated database from disk
export function initAnalyticsDatabase(): AnalyticsDatabaseState {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      // Purge legacy dummy figures if found from previous seed template
      if (parsed.summary && parsed.summary.totalSessions >= 1400) {
        console.log(`[Analytics DB] Purging legacy dummy figures from ${DB_FILE}`);
        dbState = getCleanInitialDatabase();
        persistDatabaseSync(dbState);
      } else {
        dbState = parsed;
        console.log(`[Analytics DB] Loaded persistent real behavioral database from ${DB_FILE}`);
      }
    } else {
      dbState = getCleanInitialDatabase();
      persistDatabaseSync(dbState);
      console.log(`[Analytics DB] Initialized clean authentic behavioral database at ${DB_FILE}`);
    }
  } catch (err) {
    console.warn("[Analytics DB] Error loading DB file, fallback to clean state:", err);
    dbState = getCleanInitialDatabase();
  }

  return dbState!;
}

// Atomic file write using write-to-temp + rename to protect against corruption
function persistDatabaseSync(data: AnalyticsDatabaseState) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(TMP_FILE, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(TMP_FILE, DB_FILE);
  } catch (err) {
    console.error("[Analytics DB] Failed atomic write to disk:", err);
  }
}

// Debounced asynchronous flush to minimize disk I/O on high-traffic bursts
export function queueDatabasePersist() {
  if (saveDebounceTimer) return;
  saveDebounceTimer = setTimeout(() => {
    saveDebounceTimer = null;
    if (dbState) {
      dbState.lastUpdated = new Date().toISOString();
      persistDatabaseSync(dbState);
    }
  }, 2000);
}

// Formula: Content Affinity Score (0 - 100)
// Takes into account Views, Active Dwell Time, Scroll Depth completion, and Shares
function computeAffinityScore(item: ContentAffinityItem): number {
  const avgMins = item.avgDwellSeconds / 60;
  const scrollRate = item.views > 0 ? (item.scroll75 + item.scroll100) / (2 * item.views) : 0;
  const shareRatio = item.views > 0 ? (item.shares * 10) / item.views : 0;

  // Weighted raw score
  let raw = (avgMins * 20) + (scrollRate * 45) + (shareRatio * 25) + Math.min(10, Math.log10(Math.max(1, item.views)) * 3.5);
  return Math.min(99, Math.max(15, Math.round(raw)));
}

// Formula: Tool Stickiness Index (0 - 100)
// Evaluates interactions per session and share/export rates
function computeToolStickiness(item: ToolUsageItem): number {
  if (item.usesCount === 0) return 10;
  const interactionPerUse = item.interactionsCount / item.usesCount;
  const shareRate = (item.shareClicks * 15) / item.usesCount;
  const raw = (interactionPerUse * 18) + shareRate + 20;
  return Math.min(98, Math.max(20, Math.round(raw)));
}

// Ingestion Pipeline: Record incoming events from client tracker
export function recordAnalyticsEvent(event: AnalyticsEvent) {
  if (!dbState) {
    initAnalyticsDatabase();
  }
  const db = dbState!;
  const now = new Date().toISOString();

  // 1. Update session metrics
  let session = db.recentSessions.find((s) => s.sessionId === event.sessionId);
  if (!session) {
    session = {
      sessionId: event.sessionId,
      startedAt: now,
      lastActiveAt: now,
      deviceType: (event.metadata?.deviceType as any) || "desktop",
      pagesVisited: [event.path],
      toolsUsed: event.toolId ? [event.toolId] : [],
      totalDurationSeconds: event.dwellSeconds || 10,
    };
    db.recentSessions.unshift(session);
    if (db.recentSessions.length > 250) {
      db.recentSessions.pop();
    }
    db.summary.totalSessions++;
  } else {
    session.lastActiveAt = now;
    if (!session.pagesVisited.includes(event.path)) {
      // Record transition path
      const lastPage = session.pagesVisited[session.pagesVisited.length - 1];
      if (lastPage && lastPage !== event.path) {
        const transitionKey = `${lastPage} -> ${event.path}`;
        db.navigationTransitions[transitionKey] = (db.navigationTransitions[transitionKey] || 0) + 1;
      }
      session.pagesVisited.push(event.path);
    }
    if (event.toolId && !session.toolsUsed.includes(event.toolId)) {
      session.toolsUsed.push(event.toolId);
    }
    if (event.dwellSeconds) {
      session.totalDurationSeconds += event.dwellSeconds;
    }
  }

  // 2. Process specific event types
  switch (event.type) {
    case "page_view": {
      db.summary.totalPageViews++;
      // If viewing an article or research publication
      if (event.path.startsWith("/article/") || event.path.startsWith("/category/") || event.path.startsWith("/guides/")) {
        const key = event.path;
        if (!db.contentAffinity[key]) {
          db.contentAffinity[key] = {
            path: key,
            title: event.title || key,
            category: event.category || "General Research",
            views: 0,
            totalDwellSeconds: 0,
            avgDwellSeconds: 0,
            scroll25: 0,
            scroll50: 0,
            scroll75: 0,
            scroll100: 0,
            shares: 0,
            affinityScore: 50,
            lastViewed: now,
          };
        }
        db.contentAffinity[key].views++;
        db.contentAffinity[key].lastViewed = now;
        db.contentAffinity[key].affinityScore = computeAffinityScore(db.contentAffinity[key]);
      }
      break;
    }

    case "dwell_time": {
      const dwell = Math.max(1, Math.min(600, event.dwellSeconds || 10));
      db.summary.totalActiveReadingMinutes += Math.round((dwell / 60) * 10) / 10;
      const key = event.path;
      if (db.contentAffinity[key]) {
        db.contentAffinity[key].totalDwellSeconds += dwell;
        db.contentAffinity[key].avgDwellSeconds = Math.round(
          db.contentAffinity[key].totalDwellSeconds / Math.max(1, db.contentAffinity[key].views)
        );
        db.contentAffinity[key].affinityScore = computeAffinityScore(db.contentAffinity[key]);
      }
      break;
    }

    case "scroll_depth": {
      const depth = event.maxScrollPercentage || 0;
      const key = event.path;
      if (db.contentAffinity[key]) {
        if (depth >= 25) db.contentAffinity[key].scroll25++;
        if (depth >= 50) db.contentAffinity[key].scroll50++;
        if (depth >= 75) db.contentAffinity[key].scroll75++;
        if (depth >= 100) db.contentAffinity[key].scroll100++;
        db.contentAffinity[key].affinityScore = computeAffinityScore(db.contentAffinity[key]);
      }
      break;
    }

    case "tool_interaction": {
      db.summary.totalToolInteractions++;
      const toolKey = event.toolId || "generic-tool";
      if (!db.toolUsage[toolKey]) {
        db.toolUsage[toolKey] = {
          toolId: toolKey,
          toolName: event.title || toolKey,
          category: (event.metadata?.category as any) || "calculator",
          path: event.path,
          usesCount: 0,
          interactionsCount: 0,
          shareClicks: 0,
          avgSessionSeconds: 120,
          stickinessIndex: 60,
          lastUsed: now,
        };
      }
      db.toolUsage[toolKey].usesCount++;
      db.toolUsage[toolKey].interactionsCount += (event.metadata?.stepCount || 1);
      db.toolUsage[toolKey].lastUsed = now;
      db.toolUsage[toolKey].stickinessIndex = computeToolStickiness(db.toolUsage[toolKey]);
      break;
    }

    case "share_click": {
      if (event.toolId && db.toolUsage[event.toolId]) {
        db.toolUsage[event.toolId].shareClicks++;
        db.toolUsage[event.toolId].stickinessIndex = computeToolStickiness(db.toolUsage[event.toolId]);
      }
      if (db.contentAffinity[event.path]) {
        db.contentAffinity[event.path].shares++;
        db.contentAffinity[event.path].affinityScore = computeAffinityScore(db.contentAffinity[event.path]);
      }
      break;
    }

    case "search_query": {
      const query = (event.metadata?.query || "").toLowerCase().trim();
      if (query && query.length >= 2) {
        const resultsFound = Boolean(event.metadata?.resultsFound ?? true);
        if (!db.searchQueries[query]) {
          db.searchQueries[query] = {
            query,
            count: 0,
            resultsFound,
            lastSearched: now,
          };
        }
        db.searchQueries[query].count++;
        db.searchQueries[query].lastSearched = now;
      }
      break;
    }
  }

  queueDatabasePersist();
}

// Ingestion Pipeline: Batch events
export function recordBatchAnalyticsEvents(events: AnalyticsEvent[]) {
  for (const event of events) {
    recordAnalyticsEvent(event);
  }
}

// Query Engine: Retrieve behavioral intelligence report
export function getAnalyticsOverview(timeFilter: "all" | "30d" | "7d" | "24h" = "all") {
  if (!dbState) {
    initAnalyticsDatabase();
  }
  const db = dbState!;

  // 1. Ranked Content Affinity (Highest Affinity score first)
  const rankedContent = Object.values(db.contentAffinity).sort((a, b) => b.affinityScore - a.affinityScore);

  // 2. Ranked Tools (Highest Stickiness Index first)
  const rankedTools = Object.values(db.toolUsage).sort((a, b) => b.stickinessIndex - a.stickinessIndex);

  // 3. Top Navigation Funnels
  const totalTransitions = Object.values(db.navigationTransitions).reduce((s, v) => s + v, 0);
  const journeyPatterns: UserJourneyPattern[] = Object.entries(db.navigationTransitions)
    .map(([key, count]) => {
      const [fromPath, toPath] = key.split(" -> ");
      return {
        fromPath: fromPath || "/",
        toPath: toPath || "/",
        count,
        transitionProbability: totalTransitions > 0 ? Math.round((count / totalTransitions) * 100) : 0,
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // 4. Ranked Search Intent
  const rankedSearches = Object.values(db.searchQueries).sort((a, b) => b.count - a.count).slice(0, 20);

  const avgDwellSecondsPerSession =
    db.summary.totalSessions > 0
      ? Math.round((db.summary.totalActiveReadingMinutes * 60) / db.summary.totalSessions)
      : 0;

  return {
    databaseStatus: {
      type: "Dedicated Isolated JSON Store",
      filePath: DB_FILE,
      status: "Online & Synchronized (Real Data)",
      isolatedFromSupabase: true,
      lastUpdated: db.lastUpdated,
      totalTrackedSessions: db.summary.totalSessions,
    },
    summary: {
      ...db.summary,
      avgDwellSecondsPerSession,
    },
    contentAffinity: rankedContent,
    toolUsage: rankedTools,
    journeyPatterns,
    searchTrends: rankedSearches,
    recentSessions: db.recentSessions.slice(0, 15),
  };
}

// Maintenance: Reset data
export function resetAnalyticsDatabase() {
  dbState = getCleanInitialDatabase();
  persistDatabaseSync(dbState);
  return dbState;
}

// Export raw database
export function exportAnalyticsRawDatabase(): AnalyticsDatabaseState {
  if (!dbState) {
    initAnalyticsDatabase();
  }
  return dbState!;
}
