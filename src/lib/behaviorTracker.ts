// Client-Side Behavioral Intelligence Tracker
// Operates with the dedicated isolated analytics database backend (/api/analytics/track)

export interface TrackerEvent {
  type: "page_view" | "tool_interaction" | "dwell_time" | "scroll_depth" | "search_query" | "share_click";
  sessionId: string;
  path: string;
  title?: string;
  category?: string;
  toolId?: string;
  dwellSeconds?: number;
  maxScrollPercentage?: number;
  metadata?: Record<string, any>;
  timestamp?: string;
}

class BehaviorTracker {
  private sessionId: string = "";
  private eventQueue: TrackerEvent[] = [];
  private flushTimer: any = null;
  private currentPath: string = "";
  private pageStartTime: number = Date.now();
  private maxScrollSeen: number = 0;
  private scrollMilestonesReported: Set<number> = new Set();
  private isTabVisible: boolean = true;
  private activeDwellSeconds: number = 0;
  private dwellInterval: any = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.initSession();
      this.setupVisibilityListener();
      this.setupUnloadFlush();
    }
  }

  private initSession() {
    try {
      let id = sessionStorage.getItem("yn_behavior_session_id");
      if (!id) {
        id = `sess-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
        sessionStorage.setItem("yn_behavior_session_id", id);
      }
      this.sessionId = id;
    } catch {
      this.sessionId = `sess-${Date.now().toString(36)}-tmp`;
    }
  }

  public getSessionId(): string {
    if (!this.sessionId) this.initSession();
    return this.sessionId;
  }

  private getDeviceType(): "desktop" | "mobile" | "tablet" {
    if (typeof window === "undefined") return "desktop";
    const width = window.innerWidth;
    if (width < 640) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  }

  private setupVisibilityListener() {
    if (typeof document === "undefined") return;
    document.addEventListener("visibilitychange", () => {
      this.isTabVisible = !document.hidden;
    });

    // Start 5-second interval tracking active dwell time
    this.dwellInterval = setInterval(() => {
      if (this.isTabVisible && this.currentPath) {
        this.activeDwellSeconds += 5;
        // Periodic heartbeat flush every 20 seconds of continuous reading
        if (this.activeDwellSeconds % 20 === 0 && this.activeDwellSeconds > 0) {
          this.enqueue({
            type: "dwell_time",
            sessionId: this.getSessionId(),
            path: this.currentPath,
            dwellSeconds: 20,
          });
        }
      }
    }, 5000);
  }

  private setupUnloadFlush() {
    if (typeof window === "undefined") return;
    const flushOnExit = () => {
      if (this.currentPath && this.activeDwellSeconds > 0) {
        const remainingDwell = this.activeDwellSeconds % 20;
        if (remainingDwell > 0) {
          this.enqueue({
            type: "dwell_time",
            sessionId: this.getSessionId(),
            path: this.currentPath,
            dwellSeconds: remainingDwell,
          });
        }
      }
      this.flushImmediate();
    };

    window.addEventListener("pagehide", flushOnExit);
    window.addEventListener("beforeunload", flushOnExit);
  }

  private enqueue(event: TrackerEvent) {
    event.timestamp = new Date().toISOString();
    event.metadata = {
      ...(event.metadata || {}),
      deviceType: this.getDeviceType(),
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 80) : undefined,
    };
    this.eventQueue.push(event);

    if (this.eventQueue.length >= 8) {
      this.flushImmediate();
    } else if (!this.flushTimer) {
      this.flushTimer = setTimeout(() => {
        this.flushImmediate();
      }, 3500);
    }
  }

  public flushImmediate() {
    if (this.flushTimer) {
      clearTimeout(this.flushTimer);
      this.flushTimer = null;
    }
    if (this.eventQueue.length === 0) return;

    const payload = JSON.stringify(this.eventQueue);
    this.eventQueue = [];

    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      const sent = navigator.sendBeacon("/api/analytics/track", blob);
      if (sent) return;
    }

    // Fallback to fetch
    if (typeof fetch !== "undefined") {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {
        // Silent fail for network glitches
      });
    }
  }

  // --- Public Tracking APIs ---

  public trackPageView(path: string, title?: string, category?: string) {
    if (this.currentPath === path) return;

    // Flush previous page dwell time if any
    if (this.currentPath && this.activeDwellSeconds > 0) {
      const finalDwell = Math.min(600, this.activeDwellSeconds);
      this.enqueue({
        type: "dwell_time",
        sessionId: this.getSessionId(),
        path: this.currentPath,
        dwellSeconds: finalDwell,
      });
    }

    this.currentPath = path;
    this.pageStartTime = Date.now();
    this.activeDwellSeconds = 0;
    this.maxScrollSeen = 0;
    this.scrollMilestonesReported.clear();

    this.enqueue({
      type: "page_view",
      sessionId: this.getSessionId(),
      path,
      title: title || path,
      category: category || "General",
    });
  }

  public trackScroll(percentage: number) {
    if (!this.currentPath) return;
    const clamped = Math.min(100, Math.max(0, Math.round(percentage)));
    if (clamped > this.maxScrollSeen) {
      this.maxScrollSeen = clamped;
    }

    // Milestones at 25%, 50%, 75%, 100%
    const milestones = [25, 50, 75, 100];
    for (const m of milestones) {
      if (clamped >= m && !this.scrollMilestonesReported.has(m)) {
        this.scrollMilestonesReported.add(m);
        this.enqueue({
          type: "scroll_depth",
          sessionId: this.getSessionId(),
          path: this.currentPath,
          maxScrollPercentage: m,
        });
      }
    }
  }

  public trackToolInteraction(
    toolId: string,
    toolName: string,
    category: "calculator" | "guide" | "hub" | "reference" = "calculator",
    metadata?: Record<string, any>
  ) {
    this.enqueue({
      type: "tool_interaction",
      sessionId: this.getSessionId(),
      path: this.currentPath || `/tools/${toolId}`,
      toolId,
      title: toolName,
      metadata: {
        category,
        ...(metadata || {}),
      },
    });
  }

  public trackSearch(query: string, resultsFound: boolean) {
    const clean = query.trim().slice(0, 60);
    if (!clean) return;
    this.enqueue({
      type: "search_query",
      sessionId: this.getSessionId(),
      path: this.currentPath || "/",
      metadata: {
        query: clean,
        resultsFound,
      },
    });
  }

  public trackShare(targetPathOrToolId: string, platform?: string) {
    this.enqueue({
      type: "share_click",
      sessionId: this.getSessionId(),
      path: this.currentPath || targetPathOrToolId,
      toolId: targetPathOrToolId.includes("/") ? undefined : targetPathOrToolId,
      metadata: {
        platform: platform || "clipboard",
      },
    });
  }
}

export const behaviorTracker = new BehaviorTracker();
