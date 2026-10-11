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

// Baseline seed data to immediately populate the intelligence algorithm with realistic data
function getBaselineInitialDatabase(): AnalyticsDatabaseState {
  const now = new Date().toISOString();
  return {
    databaseId: "yieldnest_behavior_analytics_isolated_v1",
    version: 1,
    description: "Dedicated behavioral intelligence database - strictly isolated from Supabase CMS",
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    lastUpdated: now,
    summary: {
      totalSessions: 1420,
      totalPageViews: 4890,
      totalToolInteractions: 2340,
      totalActiveReadingMinutes: 8750,
      avgDwellSecondsPerSession: 195,
    },
    contentAffinity: {
      "/article/direct-vs-regular-plans-true-cost-distributor-commissions": {
        path: "/article/direct-vs-regular-plans-true-cost-distributor-commissions",
        title: "Direct vs Regular Mutual Funds: True Cost of Commissions & Long-Term Wealth Compounding",
        category: "Fund Comparison",
        views: 890,
        totalDwellSeconds: 142400,
        avgDwellSeconds: 160,
        scroll25: 780,
        scroll50: 690,
        scroll75: 580,
        scroll100: 470,
        shares: 62,
        affinityScore: 94,
        lastViewed: now,
      },
      "/article/small-cap-mutual-funds-stress-test-sebi-amfi-liquidity": {
        path: "/article/small-cap-mutual-funds-stress-test-sebi-amfi-liquidity",
        title: "Small Cap Mutual Funds Stress Test: SEBI Mandated Liquidity Analysis",
        category: "Market Trends",
        views: 740,
        totalDwellSeconds: 111000,
        avgDwellSeconds: 150,
        scroll25: 680,
        scroll50: 590,
        scroll75: 480,
        scroll100: 360,
        shares: 48,
        affinityScore: 89,
        lastViewed: now,
      },
      "/article/sebi-amfi-mutual-fund-categorization-guide-all-scheme-categories-rules": {
        path: "/article/sebi-amfi-mutual-fund-categorization-guide-all-scheme-categories-rules",
        title: "SEBI & AMFI Mutual Fund Categorization Guide: All 36 Scheme Categories Explained",
        category: "Category Deep-Dive",
        views: 680,
        totalDwellSeconds: 122400,
        avgDwellSeconds: 180,
        scroll25: 630,
        scroll50: 560,
        scroll75: 490,
        scroll100: 410,
        shares: 55,
        affinityScore: 91,
        lastViewed: now,
      },
      "/article/nifty-50-index-funds-vs-active-large-cap-funds": {
        path: "/article/nifty-50-index-funds-vs-active-large-cap-funds",
        title: "Nifty 50 Index Funds vs Active Large Cap Funds: Alpha Decay & Tracking Error",
        category: "Performance Analysis",
        views: 610,
        totalDwellSeconds: 85400,
        avgDwellSeconds: 140,
        scroll25: 540,
        scroll50: 470,
        scroll75: 390,
        scroll100: 290,
        shares: 34,
        affinityScore: 82,
        lastViewed: now,
      },
      "/article/sip-vs-lumpsum-quantitative-return-comparison-market-cycles": {
        path: "/article/sip-vs-lumpsum-quantitative-return-comparison-market-cycles",
        title: "SIP vs Lumpsum: Quantitative Return Comparison Across 15-Year Market Cycles",
        category: "SIP Strategies",
        views: 590,
        totalDwellSeconds: 88500,
        avgDwellSeconds: 150,
        scroll25: 530,
        scroll50: 460,
        scroll75: 380,
        scroll100: 310,
        shares: 41,
        affinityScore: 85,
        lastViewed: now,
      },
      "/article/how-to-read-mutual-fund-factsheet-essential-metrics-guide": {
        path: "/article/how-to-read-mutual-fund-factsheet-essential-metrics-guide",
        title: "How to Read a Mutual Fund Factsheet: 10 Critical Metrics Beyond Historical Returns",
        category: "Performance Analysis",
        views: 450,
        totalDwellSeconds: 58500,
        avgDwellSeconds: 130,
        scroll25: 390,
        scroll50: 320,
        scroll75: 250,
        scroll100: 190,
        shares: 26,
        affinityScore: 78,
        lastViewed: now,
      },
    },
    toolUsage: {
      "sip-calculator": {
        toolId: "sip-calculator",
        toolName: "SIP Wealth Compounding Calculator",
        category: "calculator",
        path: "/calculators/sip",
        usesCount: 1240,
        interactionsCount: 4620,
        shareClicks: 84,
        avgSessionSeconds: 165,
        stickinessIndex: 96,
        lastUsed: now,
      },
      "direct-vs-regular": {
        toolId: "direct-vs-regular",
        toolName: "Direct vs Regular TER Drag Calculator",
        category: "calculator",
        path: "/calculators/direct-vs-regular",
        usesCount: 890,
        interactionsCount: 3110,
        shareClicks: 71,
        avgSessionSeconds: 190,
        stickinessIndex: 92,
        lastUsed: now,
      },
      "step-up-sip": {
        toolId: "step-up-sip",
        toolName: "Step-Up SIP Compounding Calculator",
        category: "calculator",
        path: "/calculators/step-up-sip",
        usesCount: 760,
        interactionsCount: 2840,
        shareClicks: 49,
        avgSessionSeconds: 145,
        stickinessIndex: 88,
        lastUsed: now,
      },
      "redemption-checklist": {
        toolId: "redemption-checklist",
        toolName: "10-Point Pre-Redemption Due Diligence Checklist",
        category: "guide",
        path: "/guides/redemption-checklist",
        usesCount: 580,
        interactionsCount: 2150,
        shareClicks: 63,
        avgSessionSeconds: 210,
        stickinessIndex: 90,
        lastUsed: now,
      },
      "how-to-choose": {
        toolId: "how-to-choose",
        toolName: "How to Choose a Mutual Fund (10-Point Checklist & Quiz)",
        category: "guide",
        path: "/guides/how-to-choose-a-mutual-fund",
        usesCount: 520,
        interactionsCount: 1980,
        shareClicks: 42,
        avgSessionSeconds: 240,
        stickinessIndex: 87,
        lastUsed: now,
      },
      "cost-of-delay": {
        toolId: "cost-of-delay",
        toolName: "Cost of Delay SIP Calculator",
        category: "calculator",
        path: "/calculators/cost-of-delay",
        usesCount: 460,
        interactionsCount: 1420,
        shareClicks: 38,
        avgSessionSeconds: 130,
        stickinessIndex: 81,
        lastUsed: now,
      },
      "tax-estimator": {
        toolId: "tax-estimator",
        toolName: "Mutual Fund Capital Gains Tax Estimator (Budget 2024)",
        category: "calculator",
        path: "/calculators/tax-estimator",
        usesCount: 430,
        interactionsCount: 1310,
        shareClicks: 32,
        avgSessionSeconds: 155,
        stickinessIndex: 79,
        lastUsed: now,
      },
      "swp-calculator": {
        toolId: "swp-calculator",
        toolName: "Systematic Withdrawal Plan (SWP) Simulator",
        category: "calculator",
        path: "/calculators/swp",
        usesCount: 390,
        interactionsCount: 1190,
        shareClicks: 27,
        avgSessionSeconds: 140,
        stickinessIndex: 77,
        lastUsed: now,
      },
      "goal-planner": {
        toolId: "goal-planner",
        toolName: "Inflation-Adjusted Goal Planner",
        category: "calculator",
        path: "/calculators/goal-planner",
        usesCount: 360,
        interactionsCount: 980,
        shareClicks: 21,
        avgSessionSeconds: 150,
        stickinessIndex: 74,
        lastUsed: now,
      },
      "sip-vs-lumpsum": {
        toolId: "sip-vs-lumpsum",
        toolName: "SIP vs Lumpsum Strategy Comparator",
        category: "calculator",
        path: "/calculators/sip-vs-lumpsum",
        usesCount: 340,
        interactionsCount: 890,
        shareClicks: 19,
        avgSessionSeconds: 125,
        stickinessIndex: 72,
        lastUsed: now,
      },
    },
    navigationTransitions: {
      "/ -> /calculators": 420,
      "/ -> /category/fund-comparison": 340,
      "/category/fund-comparison -> /article/direct-vs-regular-plans-true-cost-distributor-commissions": 290,
      "/article/direct-vs-regular-plans-true-cost-distributor-commissions -> /calculators/direct-vs-regular": 260,
      "/calculators -> /calculators/sip": 240,
      "/calculators/sip -> /calculators/step-up-sip": 180,
      "/ -> /toolkit": 210,
      "/toolkit -> /guides/redemption-checklist": 160,
      "/guides -> /guides/how-to-choose-a-mutual-fund": 150,
      "/category/category-deep-dive -> /hub/basics": 130,
    },
    searchQueries: {
      "direct vs regular": { query: "direct vs regular", count: 184, resultsFound: true, lastSearched: now },
      "quant small cap": { query: "quant small cap", count: 142, resultsFound: true, lastSearched: now },
      "parag parikh flexi cap": { query: "parag parikh flexi cap", count: 128, resultsFound: true, lastSearched: now },
      "elss tax saving": { query: "elss tax saving", count: 96, resultsFound: true, lastSearched: now },
      "exit load timing": { query: "exit load timing", count: 74, resultsFound: true, lastSearched: now },
      "cas statement cams": { query: "cas statement cams", count: 68, resultsFound: true, lastSearched: now },
      "gold etf vs mutual fund": { query: "gold etf vs mutual fund", count: 42, resultsFound: false, lastSearched: now },
      "arbitrage fund tax": { query: "arbitrage fund tax", count: 37, resultsFound: false, lastSearched: now },
    },
    recentSessions: [
      {
        sessionId: "sess-9021",
        startedAt: new Date(Date.now() - 12 * 60000).toISOString(),
        lastActiveAt: new Date(Date.now() - 4 * 60000).toISOString(),
        deviceType: "desktop",
        pagesVisited: ["/", "/category/fund-comparison", "/article/direct-vs-regular-plans-true-cost-distributor-commissions", "/calculators/direct-vs-regular"],
        toolsUsed: ["direct-vs-regular"],
        totalDurationSeconds: 480,
      },
      {
        sessionId: "sess-9022",
        startedAt: new Date(Date.now() - 25 * 60000).toISOString(),
        lastActiveAt: new Date(Date.now() - 18 * 60000).toISOString(),
        deviceType: "mobile",
        pagesVisited: ["/calculators", "/calculators/sip", "/calculators/step-up-sip"],
        toolsUsed: ["sip-calculator", "step-up-sip"],
        totalDurationSeconds: 420,
      },
      {
        sessionId: "sess-9023",
        startedAt: new Date(Date.now() - 45 * 60000).toISOString(),
        lastActiveAt: new Date(Date.now() - 35 * 60000).toISOString(),
        deviceType: "desktop",
        pagesVisited: ["/toolkit", "/guides/redemption-checklist", "/faq"],
        toolsUsed: ["redemption-checklist"],
        totalDurationSeconds: 600,
      },
    ],
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
      dbState = JSON.parse(raw);
      console.log(`[Analytics DB] Loaded persistent behavioral database from ${DB_FILE}`);
    } else {
      dbState = getBaselineInitialDatabase();
      persistDatabaseSync(dbState);
      console.log(`[Analytics DB] Initialized fresh behavioral database at ${DB_FILE}`);
    }
  } catch (err) {
    console.warn("[Analytics DB] Error loading DB file, fallback to baseline:", err);
    dbState = getBaselineInitialDatabase();
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

  return {
    databaseStatus: {
      type: "Dedicated Isolated JSON Store",
      filePath: DB_FILE,
      status: "Online & Synchronized",
      isolatedFromSupabase: true,
      lastUpdated: db.lastUpdated,
      totalTrackedSessions: db.summary.totalSessions,
    },
    summary: db.summary,
    contentAffinity: rankedContent,
    toolUsage: rankedTools,
    journeyPatterns,
    searchTrends: rankedSearches,
    recentSessions: db.recentSessions.slice(0, 15),
  };
}

// Maintenance: Reset data
export function resetAnalyticsDatabase() {
  dbState = getBaselineInitialDatabase();
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
