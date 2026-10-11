export type ArticleCategory =
  | "Fund Comparison"
  | "Performance Analysis"
  | "Market Trends"
  | "Category Deep-Dive"
  | "SIP Strategies";

export interface AMFISchemeData {
  schemeCode: string;
  schemeName: string;
  fundHouse: string;
  category: string;
  nav: number;
  date: string;
  cagr1Y?: number;
  cagr3Y?: number;
  cagr5Y?: number;
  expenseRatio?: number;
  aumCr?: number;
  riskRating?: string;
  benchmark?: string;
}

export interface SEOMetadata {
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  targetQueries?: string[];
  eeatScore?: number;
  riskRating?: string;
  canonicalUrl?: string;
}

export interface SocialSnippet {
  platform: "twitter" | "instagram" | "facebook";
  copy: string;
  scheduledTime?: string;
  status?: "draft" | "scheduled" | "published";
}

export interface DataFreshnessStatus {
  isValid: boolean;
  isOlderThan30Days: boolean;
  staleDatesDetected?: string[];
  warningTriggered?: boolean;
  refetchTriggered?: boolean;
  refetchAttempts?: number;
  message?: string;
  checkedAt?: string;
  verifiedMonth?: string;
}

export interface ArticlePost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  tags: string[];
  status: "published" | "draft" | "scheduled" | "archived";
  authorName: string;
  authorTitle: string;
  authorAvatar?: string;
  coverImage?: string;
  readTimeMinutes: number;
  viewsCount: number;
  amfiSchemeCodes?: string[];
  amfiDataSnapshot?: AMFISchemeData[];
  seoMetadata: SEOMetadata;
  dataFreshness?: DataFreshnessStatus;
  socialSnippets?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
  scheduledFor?: string | null;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  translations?: {
    hi?: {
      title: string;
      excerpt: string;
      content: string;
      seoMetadata?: Partial<SEOMetadata>;
    };
    [key: string]: any;
  };
}

export interface Comment {
  id: string;
  postId: string;
  authorName: string;
  authorEmail: string;
  content: string;
  status: "approved" | "pending" | "spam";
  adminReply?: string;
  createdAt: string;
}

export interface KeywordMetric {
  keyword: string;
  volume: string;
  difficulty: "Low" | "Medium" | "High";
  intent: "Informational" | "Commercial" | "Transactional";
}

export interface KeywordResearchResult {
  seedKeyword: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  keywordMetrics: KeywordMetric[];
  lsiKeywords: string[];
  faqs: Array<{ question: string; answer: string }>;
  searchIntent: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  description: string;
  authorName: string;
  authorTitle: string;
  authorBio: string;
  authorCredentials: string;
  sebiRegistrationNumber: string;
  contactEmail: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  enableAutoSocialScheduling: boolean;
  googleSearchConsoleVerification: string;
}

export interface ContentSuggestion {
  title: string;
  category: ArticleCategory;
  hook: string;
  estimatedTraffic: string;
  amfiSchemeCodes?: string[];
}

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: "super_admin" | "editor" | "analyst";
  mustChangePassword?: boolean;
  lastLogin?: string;
  token?: string;
}

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  categoryPreferences?: string[];
  status: "active" | "unsubscribed" | "pending";
  subscribedAt: string;
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

export interface UserBehaviorSession {
  sessionId: string;
  startedAt: string;
  lastActiveAt: string;
  deviceType: "desktop" | "mobile" | "tablet";
  pagesVisited: string[];
  toolsUsed: string[];
  totalDurationSeconds: number;
}

export interface BehaviorAnalyticsDatabaseStatus {
  type: string;
  filePath: string;
  status: string;
  isolatedFromSupabase: boolean;
  lastUpdated: string;
  totalTrackedSessions: number;
}

export interface AnalyticsOverviewData {
  databaseStatus: BehaviorAnalyticsDatabaseStatus;
  summary: {
    totalSessions: number;
    totalPageViews: number;
    totalToolInteractions: number;
    totalActiveReadingMinutes: number;
    avgDwellSecondsPerSession: number;
  };
  contentAffinity: ContentAffinityItem[];
  toolUsage: ToolUsageItem[];
  journeyPatterns: UserJourneyPattern[];
  searchTrends: SearchQueryItem[];
  recentSessions: UserBehaviorSession[];
}

