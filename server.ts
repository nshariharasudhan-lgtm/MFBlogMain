import express from "express";
import crypto from "crypto";
import cookieParser from "cookie-parser";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { INITIAL_ARTICLES } from "./src/lib/seedData";
import {
  LEGACY_ALIASES,
  buildLlmsTxtString,
  buildLlmsFullString,
  buildSitemapXmlString,
  injectToolkitDirectoryPage,
} from "./scripts/prerender";
import {
  initAnalyticsDatabase,
  recordAnalyticsEvent,
  recordBatchAnalyticsEvents,
  getAnalyticsOverview,
  resetAnalyticsDatabase,
  exportAnalyticsRawDatabase,
} from "./server/analyticsDb";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Trust proxy for accurate req.ip evaluation behind Vercel/reverse proxies
app.set("trust proxy", 1);

// -------------------------------------------------------------
// Hardened Security Headers Middleware (Zero Leakage & Armor)
// -------------------------------------------------------------
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Permissions-Policy",
    "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()"
  );
  next();
});

// Cookie parser for secure HttpOnly session tokens
app.use(cookieParser());

// JSON body parser with safety limit (1MB max prevents payload explosion attacks)
app.use(express.json({ limit: "1mb" }));

// Canonical Host & URL Normalization: 301 redirect naked domain & mfblog to www.yieldnest.online & strip trailing slashes
app.use((req, res, next) => {
  const host = (req.headers.host || "").toLowerCase();
  if (host === "yieldnest.online" || host === "mfblog.vercel.app") {
    return res.redirect(301, `https://www.yieldnest.online${req.originalUrl}`);
  }
  if (req.path.length > 1 && req.path.endsWith("/")) {
    const query = req.url.slice(req.path.length);
    const cleanPath = req.path.slice(0, -1);
    return res.redirect(301, cleanPath + query);
  }
  next();
});

// URL normalization for Vercel Serverless Function rewrites
app.use((req, _res, next) => {
  const forwardedUri = req.headers["x-forwarded-uri"] as string;
  const matchedPath = (req.headers["x-matched-path"] || req.headers["x-vercel-matched-path"]) as string;
  if ((req.url === "/api" || req.url === "/api/") && (forwardedUri || matchedPath)) {
    req.url = forwardedUri || matchedPath;
  }
  next();
});

// Google Search Console verification endpoint - strictly serves GOOGLE_VERIFICATION_FILENAME only
const GOOGLE_VERIFICATION_FILENAME = (process.env.GOOGLE_VERIFICATION_FILENAME || "").trim();
if (GOOGLE_VERIFICATION_FILENAME) {
  const cleanFilename = GOOGLE_VERIFICATION_FILENAME.startsWith("/")
    ? GOOGLE_VERIFICATION_FILENAME
    : `/${GOOGLE_VERIFICATION_FILENAME}`;
  app.get(cleanFilename, (_req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.send(`google-site-verification: ${path.basename(cleanFilename)}`);
  });
}

// Bing / IndexNow protocol verification endpoint
const INDEXNOW_KEY = "caef2d2b54404d86b8fecc69ca144cfc";
app.get(["/caef2d2b54404d86b8fecc69ca144cfc.txt", "/indexnow.txt"], (_req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=86400");
  return res.send(INDEXNOW_KEY);
});

// Server-side Gemini client with required User-Agent
const apiKey = process.env.GEMINI_API_KEY || "";
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// Server-side Supabase client with URL sanitization
const rawSupabaseUrl = (process.env.VITE_SUPABASE_URL || "").trim();
const supabaseUrl = rawSupabaseUrl.replace(/\/rest\/v1\/?.*$/i, "").replace(/\/+$/, "").trim();
const supabaseKey = (process.env.VITE_SUPABASE_ANON_KEY || "").trim();
const serverSupabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

if (serverSupabase) {
  console.log("[Supabase Server] Connected successfully to:", supabaseUrl);
} else {
  console.warn("[Supabase Server] Supabase credentials not detected in environment.");
}

// Resilient model cascade to handle high-demand spikes
const CANDIDATE_MODELS = [
  "gemini-3.1-flash-lite",
  "gemini-2.5-flash",
  "gemini-flash-latest",
];

async function generateJSONWithFallback(prompt: string, temperature = 0.4): Promise<any> {
  if (!ai) return null;
  for (const modelName of CANDIDATE_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature,
        },
      });
      let text = response.text?.trim() || "";
      if (text.startsWith("```")) {
        text = text.replace(/^```[a-z]*\n?/i, "").replace(/\n?```$/i, "").trim();
      }
      if (text) {
        const parsed = JSON.parse(text);
        console.log(`[Gemini] Model ${modelName} successfully returned structured JSON`);
        return parsed;
      }
    } catch (err: any) {
      console.warn(`[Gemini] Model ${modelName} error (${err?.status || err?.code || "err"}): ${err?.message || err}. Trying next fallback model...`);
    }
  }
  return null;
}

// Helper: Calculate CAGR between two NAVs over N years
function calculateCAGR(startNav: number, endNav: number, years: number) {
  if (!startNav || !endNav || years <= 0) return 0;
  return Number(((Math.pow(endNav / startNav, 1 / years) - 1) * 100).toFixed(2));
}

// -------------------------------------------------------------
// Rate Limiting System (Brute Force & DoS Shield)
// -------------------------------------------------------------
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

function createRateLimiter(options: { windowMs: number; max: number; message: string }) {
  const store = new Map<string, RateLimitRecord>();

  // Periodically clean expired rate limits
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of store.entries()) {
      if (now > value.resetTime) {
        store.delete(key);
      }
    }
  }, Math.min(options.windowMs, 60000));

  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const ip = req.ip || "client-ip";
    const now = Date.now();
    let record = store.get(ip);

    if (!record || now > record.resetTime) {
      record = { count: 1, resetTime: now + options.windowMs };
      store.set(ip, record);
      return next();
    }

    record.count++;
    if (record.count > options.max) {
      const retryAfter = Math.ceil((record.resetTime - now) / 1000);
      res.setHeader("Retry-After", String(retryAfter));
      return res.status(429).json({ error: options.message, retryAfterSeconds: retryAfter });
    }

    next();
  };
}

const loginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts from this IP. Please try again after 15 minutes.",
});

const aiLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 20,
  message: "AI rate limit reached. Please wait a minute before making more requests.",
});

const publicApiLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 120,
  message: "API rate limit reached. Please slow down your requests.",
});

// -------------------------------------------------------------
// Admin Authentication & Session Management (Vercel-Compatible Signed Cookies)
// -------------------------------------------------------------
function getAdminConfig(): { email: string; passwordHash: string } | null {
  const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const passwordHash = (process.env.ADMIN_PASSWORD_HASH || "").trim();
  if (!email || !passwordHash) {
    return null;
  }
  return { email, passwordHash };
}

function timingSafeEqualStr(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function verifyScryptPassword(plainPassword: string, storedHash: string): boolean {
  if (!plainPassword || !storedHash) return false;
  const parts = storedHash.split(":");
  if (parts.length !== 2) return false;
  const [salt, keyHex] = parts;
  try {
    const derivedKey = crypto.scryptSync(plainPassword, salt, 64);
    const keyBuf = Buffer.from(keyHex, "hex");
    if (derivedKey.length !== keyBuf.length) return false;
    return crypto.timingSafeEqual(derivedKey, keyBuf);
  } catch {
    return false;
  }
}

function hashScryptPassword(plainPassword: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(plainPassword, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

const SESSION_SECRET =
  (process.env.SESSION_SECRET || "").trim() ||
  (process.env.ADMIN_PASSWORD_HASH
    ? crypto.createHash("sha256").update(process.env.ADMIN_PASSWORD_HASH).digest("hex")
    : "yieldnest-session-secret-production-auth-key-32chars");

interface SignedSessionPayload {
  email: string;
  role: string;
  exp: number;
}

function createSignedSessionToken(payload: SignedSessionPayload): string {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", SESSION_SECRET).update(data).digest("base64url");
  return `${data}.${signature}`;
}

function verifySignedSessionToken(token: string): SignedSessionPayload | null {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [data, signature] = parts;
  const expectedSig = crypto.createHmac("sha256", SESSION_SECRET).update(data).digest("base64url");
  if (!timingSafeEqualStr(signature, expectedSig)) return null;
  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf-8")) as SignedSessionPayload;
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

function requireAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  let token = (req.cookies && req.cookies["admin_session"]) || "";
  if (!token) {
    const authHeader = req.headers["authorization"] || "";
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7).trim();
    } else if (req.headers["x-admin-token"]) {
      token = String(req.headers["x-admin-token"]).trim();
    }
  }

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Administrator authentication required." });
  }

  const session = verifySignedSessionToken(token);
  if (!session) {
    res.clearCookie("admin_session", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
    return res.status(401).json({ error: "Session expired or invalid. Please log in again." });
  }

  (req as any).adminUser = session;
  next();
}

// -------------------------------------------------------------
// Admin Auth Endpoints
// -------------------------------------------------------------
app.post("/api/admin/login", loginLimiter, (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const config = getAdminConfig();
  if (!config) {
    return res.status(503).json({
      success: false,
      message: "Administrator authentication is not configured on this server.",
    });
  }

  const inputEmail = String(email).trim().toLowerCase();
  const isEmailMatch = inputEmail === config.email;
  const isPasswordMatch = verifyScryptPassword(String(password), config.passwordHash);

  if (!isEmailMatch || !isPasswordMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid administrator credentials. Access denied.",
    });
  }

  const token = createSignedSessionToken({
    email: config.email,
    role: "super_admin",
    exp: Date.now() + 24 * 60 * 60 * 1000,
  });

  res.cookie("admin_session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });

  return res.json({
    success: true,
    token,
    user: {
      id: "admin-master",
      email: config.email,
      fullName: (process.env.ADMIN_NAME || "").trim() || undefined,
      role: "super_admin",
      mustChangePassword: false,
      lastLogin: new Date().toISOString(),
      token,
    },
  });
});

app.get("/api/admin/me", requireAdminAuth, (req, res) => {
  const session = (req as any).adminUser as SignedSessionPayload;
  return res.json({
    success: true,
    user: {
      id: "admin-master",
      email: session.email,
      fullName: (process.env.ADMIN_NAME || "").trim() || undefined,
      role: session.role,
      mustChangePassword: false,
      token: (req.cookies && req.cookies["admin_session"]) || "",
    },
  });
});

app.post("/api/admin/change-password", requireAdminAuth, (req, res) => {
  const { oldPassword, newPassword } = req.body || {};
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: "oldPassword and newPassword are required." });
  }

  const config = getAdminConfig();
  if (!config) {
    return res.status(503).json({ error: "Admin authentication not configured." });
  }

  if (!verifyScryptPassword(String(oldPassword), config.passwordHash)) {
    return res.status(400).json({ success: false, message: "Current password is incorrect." });
  }

  if (String(newPassword).length < 8) {
    return res.status(400).json({ success: false, message: "New password must be at least 8 characters long." });
  }

  const newHash = hashScryptPassword(String(newPassword));
  return res.json({
    success: true,
    message: "Password verified. Update ADMIN_PASSWORD_HASH in environment variables with the new scrypt hash.",
    newPasswordHash: newHash,
  });
});

app.post("/api/admin/logout", (_req, res) => {
  res.clearCookie("admin_session", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
  return res.json({ success: true, message: "Logged out successfully" });
});

// -------------------------------------------------------------
// Dedicated Behavioral Analytics & Content Affinity Engine
// (Strictly Isolated from Supabase database)
// -------------------------------------------------------------
// Initialize isolated analytics database
initAnalyticsDatabase();

// Ingestion: Record visitor interactions, dwell time, and tool usages
app.post("/api/analytics/track", (req, res) => {
  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {}
    }

    if (Array.isArray(body)) {
      recordBatchAnalyticsEvents(body);
    } else if (body && typeof body === "object") {
      recordAnalyticsEvent(body);
    }
    return res.status(200).json({ ok: true, timestamp: Date.now() });
  } catch (err: any) {
    console.warn("[Analytics Track] Warning:", err?.message);
    return res.status(200).json({ ok: false });
  }
});

// Query: Retrieve aggregated intelligence report for Admin Dashboard
app.get("/api/analytics/overview", (req, res) => {
  try {
    const timeFilter = (req.query.timeFilter as any) || "all";
    const data = getAnalyticsOverview(timeFilter);
    return res.json(data);
  } catch (err: any) {
    console.error("[Analytics Overview] Error:", err);
    return res.status(500).json({ error: "Failed to generate analytics overview" });
  }
});

// Reset: Admin-only reset of behavioral metrics
app.post("/api/analytics/reset", requireAdminAuth, (_req, res) => {
  try {
    resetAnalyticsDatabase();
    return res.json({ success: true, message: "Behavioral analytics reset to clean baseline." });
  } catch (err: any) {
    return res.status(500).json({ error: "Failed to reset analytics database" });
  }
});

// Export: Admin-only raw database JSON download
app.get("/api/analytics/export", requireAdminAuth, (_req, res) => {
  try {
    const rawData = exportAnalyticsRawDatabase();
    res.setHeader("Content-Disposition", 'attachment; filename="yieldnest_behavior_analytics.json"');
    res.setHeader("Content-Type", "application/json");
    return res.send(JSON.stringify(rawData, null, 2));
  } catch (err: any) {
    return res.status(500).json({ error: "Failed to export analytics database" });
  }
});

// -------------------------------------------------------------
// 1. AMFI India Mutual Fund APIs
// -------------------------------------------------------------
app.get("/api/amfi/search", publicApiLimiter, async (req, res) => {
  const query = ((req.query.q as string) || "").trim().toLowerCase().slice(0, 80);
  if (!query) {
    return res.json([]);
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const response = await fetch(`https://api.mfapi.in/mf/search?q=${encodeURIComponent(query)}`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (response.ok) {
      const results = (await response.json()) as Array<{ schemeCode: number; schemeName: string }>;
      const mapped = results.slice(0, 15).map((item) => ({
        schemeCode: String(item.schemeCode).replace(/[^0-9]/g, ""),
        schemeName: item.schemeName,
        fundHouse: item.schemeName.split(" ")[0] + " Mutual Fund",
        category: item.schemeName.toLowerCase().includes("direct") ? "Direct Plan" : "Regular Plan",
      }));
      return res.json(mapped);
    }
    return res.status(502).json({ error: "AMFI search data currently unavailable from upstream." });
  } catch {
    return res.status(502).json({ error: "AMFI search request timed out or failed." });
  }
});

app.get("/api/amfi/fund/:schemeCode", publicApiLimiter, async (req, res) => {
  const schemeCode = String(req.params.schemeCode || "").replace(/[^0-9a-zA-Z_-]/g, "").slice(0, 30);
  if (!schemeCode) {
    return res.status(400).json({ error: "Invalid scheme code format" });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4500);
    const response = await fetch(`https://api.mfapi.in/mf/${encodeURIComponent(schemeCode)}`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (response.ok) {
      const data = await response.json();
      if (data && data.meta && data.data && data.data.length > 0) {
        const latestEntry = data.data[0];
        const latestNav = parseFloat(latestEntry.nav);
        const dataLength = data.data.length;

        // Calculate 1Y, 3Y, 5Y CAGR if sufficient historical records exist
        const nav1Y = data.data[Math.min(248, dataLength - 1)] ? parseFloat(data.data[Math.min(248, dataLength - 1)].nav) : 0;
        const nav3Y = data.data[Math.min(745, dataLength - 1)] ? parseFloat(data.data[Math.min(745, dataLength - 1)].nav) : 0;
        const nav5Y = data.data[Math.min(1240, dataLength - 1)] ? parseFloat(data.data[Math.min(1240, dataLength - 1)].nav) : 0;

        return res.json({
          schemeCode,
          schemeName: data.meta.scheme_name,
          fundHouse: data.meta.fund_house,
          category: data.meta.scheme_category,
          nav: latestNav,
          date: latestEntry.date,
          cagr1Y: nav1Y ? calculateCAGR(nav1Y, latestNav, 1) : null,
          cagr3Y: nav3Y ? calculateCAGR(nav3Y, latestNav, 3) : null,
          cagr5Y: nav5Y ? calculateCAGR(nav5Y, latestNav, 5) : null,
          expenseRatio: null,
          aumCr: null,
          riskRating: null,
          history: data.data.slice(0, 30),
        });
      }
    }
    return res.status(404).json({ error: "Fund scheme data unavailable from AMFI." });
  } catch {
    return res.status(502).json({ error: "AMFI fund data request timed out or failed." });
  }
});

app.get("/api/amfi/fund-performance-filters", publicApiLimiter, async (_req, res) => {
  try {
    const response = await fetch("https://polling.crisil.com/gateway/pollingsebi/api/amfi/fundperformancefilters", {
      method: "POST",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({}),
    });
    if (response.ok) {
      const data = await response.json();
      return res.json(data);
    }
    return res.status(502).json({ error: "Failed to fetch AMFI filters" });
  } catch (err: any) {
    return res.status(502).json({ error: err.message || "AMFI filters error" });
  }
});

app.post("/api/amfi/fund-performance", publicApiLimiter, async (req, res) => {
  try {
    const { maturityType = 1, category = 1, subCategory = 1, mfid = 0, reportDate } = req.body || {};
    const response = await fetch("https://polling.crisil.com/gateway/pollingsebi/api/amfi/fundperformance", {
      method: "POST",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        maturityType: Number(maturityType),
        category: Number(category),
        subCategory: Number(subCategory),
        mfid: Number(mfid),
        reportDate: reportDate || "05-Oct-2026",
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return res.json(data);
    }
    return res.status(502).json({ error: "Failed to fetch AMFI fund performance" });
  } catch (err: any) {
    return res.status(502).json({ error: err.message || "AMFI performance fetch error" });
  }
});

// -------------------------------------------------------------
// 2. Keyword Research Engine
// -------------------------------------------------------------
app.post("/api/ai/research-keywords", requireAdminAuth, aiLimiter, async (req, res) => {
  const { topic, category } = req.body;
  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  const prompt = `You are a Senior Financial SEO Strategist specializing in Indian Mutual Funds (SEBI and AMFI domain).
Topic: "${topic}"
Category: "${category || "Mutual Fund Research"}"

Perform rigorous keyword research for an authoritative, EEAT-compliant financial article.
Return ONLY valid JSON matching this schema:
{
  "seedKeyword": "string",
  "primaryKeyword": "string (high intent, 50-60 characters ideal for title)",
  "secondaryKeywords": ["string", "string", "string", "string"],
  "keywordMetrics": [
    {"keyword": "string", "volume": "string (e.g. 14,500/mo)", "difficulty": "Low"|"Medium"|"High", "intent": "Informational"|"Commercial"|"Transactional"}
  ],
  "lsiKeywords": ["string", "string", "string", "string"],
  "faqs": [
    {"question": "string", "answer": "string"}
  ],
  "searchIntent": "string"
}`;

  const json = await generateJSONWithFallback(prompt, 0.3);
  if (json && json.primaryKeyword) {
    return res.json(json);
  }
  return res.status(503).json({ error: "Keyword research data unavailable. Check AI API configuration." });
});

// -------------------------------------------------------------
// 3. AI-Driven Content Suggestions
// -------------------------------------------------------------
app.get("/api/ai/content-suggestions", requireAdminAuth, aiLimiter, async (_req, res) => {
  const prompt = `You are the Editor-in-Chief of a premier Indian Mutual Fund research publication adhering strictly to AMFI regulations and EEAT (Experience, Expertise, Authoritativeness, Trustworthiness).
Provide 4 compelling, trending, highly researched editorial article ideas based on current 2026 AMFI India data, market trends, fund comparisons, and performance evaluations.
CURRENT CALENDAR YEAR IS 2026. All proposed topics, comparisons, and market data hooks MUST reflect the current 2026 market environment. Do NOT suggest topics anchored to past years like 2024 or 2025.
Return ONLY valid JSON:
{
  "suggestions": [
    {
      "title": "string (engaging, authoritative, SEO-targeted)",
      "category": "Fund Comparison" | "Performance Analysis" | "Market Trends" | "Category Deep-Dive" | "SIP Strategies",
      "hook": "string (1-2 sentences summarizing data-backed core thesis)",
      "estimatedTraffic": "High" | "Very High" | "Medium",
      "amfiSchemeCodes": ["string"]
    }
  ]
}`;

  const parsed = await generateJSONWithFallback(prompt, 0.6);
  if (parsed && Array.isArray(parsed.suggestions) && parsed.suggestions.length > 0) {
    return res.json(parsed);
  }
  return res.status(503).json({ error: "Content suggestions unavailable. Check AI API configuration." });
});

// -------------------------------------------------------------
// Data Freshness Validation Layer (30-Day Recency & AMFI Verification)
// -------------------------------------------------------------
interface DataFreshnessValidationResult {
  isFresh: boolean;
  isOlderThan30Days: boolean;
  staleDatesDetected: string[];
  warningMessage: string;
  checkedAt: string;
  currentReferenceMonth: string;
}

function validateDataFreshness(
  data: {
    title?: string;
    excerpt?: string;
    content?: string;
    amfiDataSnapshot?: any[];
  },
  referenceDate: Date = new Date()
): DataFreshnessValidationResult {
  const staleDates: string[] = [];
  const refTime = referenceDate.getTime();
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
  const cutoffTime = refTime - thirtyDaysMs;

  const currentYear = referenceDate.getFullYear();
  const currentMonth = referenceDate.getMonth(); // 0-indexed (8 = Sep in 2026)
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const monthNames = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
  ];
  const shortMonths = [
    "jan", "feb", "mar", "apr", "may", "jun",
    "jul", "aug", "sep", "oct", "nov", "dec"
  ];

  const fullText = `${data.title || ""} ${data.excerpt || ""} ${data.content || ""}`;

  // 1. Check for outdated years (e.g. 2024, 2025, or earlier) in data or context
  const outdatedYearRegex = /\b(202[0-5]|201\d)\b/g;
  let yearMatch: RegExpExecArray | null;
  while ((yearMatch = outdatedYearRegex.exec(fullText)) !== null) {
    const matchedYear = yearMatch[1];
    const startPos = Math.max(0, yearMatch.index - 35);
    const endPos = Math.min(fullText.length, yearMatch.index + 40);
    const context = fullText.slice(startPos, endPos).toLowerCase();

    // Context check: Flag if used in data, NAV, date, benchmark, or table context
    if (
      context.includes("as on") ||
      context.includes("as of") ||
      context.includes("nav") ||
      context.includes("data") ||
      context.includes("snapshot") ||
      context.includes("q1") ||
      context.includes("q2") ||
      context.includes("q3") ||
      context.includes("q4") ||
      context.includes("cagr") ||
      context.includes("benchmark") ||
      context.includes("return") ||
      context.includes("table") ||
      context.includes("trailing")
    ) {
      staleDates.push(`Outdated year ${matchedYear} in context "${context.trim().replace(/\s+/g, " ")}"`);
    }
  }

  // 2. Check for explicit date formats e.g. "31-May-2024", "15-Jun-2026"
  const ddmmyyyyRegex = /\b(\d{1,2})[-/ ]([A-Za-z]{3,9})[-/ ](20\d\d)\b/g;
  let ddmmyyyyMatch: RegExpExecArray | null;
  while ((ddmmyyyyMatch = ddmmyyyyRegex.exec(fullText)) !== null) {
    const rawDateStr = ddmmyyyyMatch[0];
    const day = parseInt(ddmmyyyyMatch[1], 10);
    const monthStr = ddmmyyyyMatch[2].toLowerCase();
    const year = parseInt(ddmmyyyyMatch[3], 10);

    let mIndex = monthNames.indexOf(monthStr);
    if (mIndex === -1) mIndex = shortMonths.indexOf(monthStr.slice(0, 3));

    if (mIndex !== -1) {
      const parsedDate = new Date(year, mIndex, day);
      if (!isNaN(parsedDate.getTime())) {
        const isCurrentMonth = year === currentYear && mIndex === currentMonth;
        const isPrevMonth = year === prevMonthYear && mIndex === prevMonth;
        if (!isCurrentMonth && !isPrevMonth) {
          staleDates.push(`Date ${rawDateStr} (${monthNames[mIndex]} ${year} is older than previous month)`);
        } else if (parsedDate.getTime() < cutoffTime) {
          staleDates.push(`Date ${rawDateStr} is older than 30-day cutoff`);
        }
      }
    }
  }

  // 3. Check for month-year patterns e.g. "May 2024", "June 2026"
  const monthYearRegex = /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(20\d\d)\b/gi;
  let myMatch: RegExpExecArray | null;
  while ((myMatch = monthYearRegex.exec(fullText)) !== null) {
    const mStr = myMatch[1].toLowerCase();
    const yr = parseInt(myMatch[2], 10);
    const mIdx = monthNames.indexOf(mStr);
    if (mIdx !== -1) {
      const isCurrentMonth = yr === currentYear && mIdx === currentMonth;
      const isPrevMonth = yr === prevMonthYear && mIdx === prevMonth;
      if (!isCurrentMonth && !isPrevMonth) {
        staleDates.push(`Outdated reference to ${myMatch[0]}`);
      }
    }
  }

  // 4. Check attached AMFI snapshot dates
  if (Array.isArray(data.amfiDataSnapshot)) {
    for (const fund of data.amfiDataSnapshot) {
      if (fund.date) {
        const parts = String(fund.date).split(/[-/ ]/);
        if (parts.length === 3) {
          const mStr = parts[1].toLowerCase();
          const yr = parseInt(parts[2], 10);
          let mIdx = monthNames.indexOf(mStr);
          if (mIdx === -1) mIdx = shortMonths.indexOf(mStr.slice(0, 3));
          if (mIdx !== -1) {
            const isCurrentMonth = yr === currentYear && mIdx === currentMonth;
            const isPrevMonth = yr === prevMonthYear && mIdx === prevMonth;
            if (!isCurrentMonth && !isPrevMonth) {
              staleDates.push(`AMFI snapshot dated ${fund.date}`);
            }
          }
        }
      }
    }
  }

  const uniqueStale = Array.from(new Set(staleDates));
  const isOlderThan30Days = uniqueStale.length > 0;

  return {
    isFresh: !isOlderThan30Days,
    isOlderThan30Days,
    staleDatesDetected: uniqueStale,
    warningMessage: isOlderThan30Days
      ? `Stale data detected (>30 days old): Found ${uniqueStale.length} outdated references.`
      : "Data verified: All AMFI metrics are within current/previous month.",
    checkedAt: referenceDate.toISOString(),
    currentReferenceMonth: referenceDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
  };
}

// -------------------------------------------------------------
// 4. Automated EEAT Article Generation with AMFI Data
// -------------------------------------------------------------
app.post("/api/ai/generate-article", requireAdminAuth, aiLimiter, async (req, res) => {
  const {
    topic,
    category,
    keywords = [],
    amfiDataSnapshot = [],
    authorName = "Research Desk",
    authorCredentials = "Mutual Fund Research Team",
    tone = "Authoritative, analytical, and accessible to retail investors",
  } = req.body;

  if (!topic || !topic.trim()) {
    return res.status(400).json({ error: "Topic is required" });
  }

  const cleanTopic = topic.trim();

  // Generate slug
  const slug = cleanTopic
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();

  // Fetch regulatory facts and admin-entered data points from Supabase
  let regulatoryFacts: any[] = [];
  let adminDataPoints: any[] = [];
  if (serverSupabase) {
    try {
      const [factsRes, pointsRes] = await Promise.all([
        serverSupabase.from("regulatory_facts").select("*").limit(50),
        serverSupabase.from("data_points").select("*").limit(50),
      ]);
      if (factsRes.data) regulatoryFacts = factsRes.data;
      if (pointsRes.data) adminDataPoints = pointsRes.data;
    } catch (e) {
      console.warn("[generate-article] Supabase tables fetch note:", e);
    }
  }

  // Use strictly admin-entered data points. Never fall back to a built-in fund list.
  const resolvedDataPoints = Array.isArray(amfiDataSnapshot) && amfiDataSnapshot.length > 0
    ? amfiDataSnapshot
    : adminDataPoints;
  const amfiContext = JSON.stringify(resolvedDataPoints);
  const regulatoryContext = JSON.stringify(regulatoryFacts);
  const now = new Date();
  const currentYear = now.getFullYear(); // 2026
  const currentMonthYear = now.toLocaleDateString("en-US", { month: "long", year: "numeric" }); // September 2026

  const prompt = `You are the senior editorial writer and SEO content strategist for YieldNest.online, an Indian personal-finance, mutual-fund research, investment education, and financial-tools website.

Your job is to create high-quality, search-friendly, trustworthy and genuinely useful articles for YieldNest.

IMPORTANT: Follow every instruction below.

==================================================
1. YIELDNEST BRAND VOICE
==================================================

Write in a:
- Professional
- Clear
- Neutral
- Analytical
- Educational
- Practical
- Trustworthy
- Calm
- Conversational
tone.

The article should feel like:
"A knowledgeable financial analyst explaining a topic clearly to an ordinary Indian investor."

Do NOT sound like:
- A salesperson
- A financial influencer
- A motivational speaker
- A sensational news website
- A generic AI-generated blog
- A marketing agency

YieldNest should educate, not sell.

Core editorial principle:
EXPLAIN → DEMONSTRATE → ANALYZE → PROVIDE PERSPECTIVE → LET THE READER DECIDE

Never exaggerate financial opportunities or make the reader feel pressured to invest.

==================================================
2. WRITING PHILOSOPHY
==================================================

Follow these principles:
- Explain before concluding.
- Present evidence before interpretation.
- Distinguish facts from assumptions.
- Acknowledge uncertainty.
- Never promise investment returns.
- Never present predictions as facts.
- Prefer clarity over jargon.
- Be useful rather than verbose.
- Write for humans first.
- Optimize naturally for search without keyword stuffing.

The reader should finish the article thinking:
"I understand this now, and I know what I should consider next."

==================================================
3. TARGET AUDIENCE
==================================================

Primary audience: Indian investors, including:
- Beginners
- First-time mutual-fund investors
- SIP investors
- Long-term investors
- Investors comparing funds
- Investors researching financial concepts
- Readers looking for calculators and practical financial tools

Write in clear Indian English.
Use familiar Indian financial terminology such as:
- ₹
- lakh
- crore
- SIP
- SWP
- STP
- ELSS
- PPF
- NPS
- FD
- RD
- AMC
- NAV
- TER
- expense ratio

Use "lakh" and "crore" rather than unnecessarily converting everything into millions or hundreds of thousands.

==================================================
4. ARTICLE TONE
==================================================

Use confident language when the facts are clear.
Use cautious language when discussing uncertain outcomes.
Prefer: "may", "could", "can", "historically", "based on the assumptions", "under this scenario", "investors may want to consider".
Avoid presenting uncertain outcomes as guaranteed.
Never say: "This fund will give 15% returns."
Prefer: "The fund delivered a 15% annualized return over the period analyzed."
Always distinguish historical performance from future expectations.

==================================================
5. DO NOT USE HYPE
==================================================

Avoid phrases such as:
- Best investment ever
- Guaranteed returns
- Get rich
- Massive wealth
- Must-buy fund
- This fund will make you rich
- Secret investment strategy
- Don't miss this opportunity
- Guaranteed profit
- Sure-shot investment
- Safest investment

Do not make investment recommendations sound like facts.
Instead of: "This is the best mutual fund."
Write: "This fund has shown strong historical performance, but investors should also consider volatility, drawdowns, expenses, portfolio composition and investment objectives."

==================================================
6. SIMPLE ENGLISH
==================================================

Prefer short, clear sentences.
Avoid unnecessarily complicated financial language.
Instead of: "Investors seeking to optimize portfolio allocation may consider deploying capital through systematic investment mechanisms."
Write: "A SIP allows you to invest a fixed amount at regular intervals instead of investing a large amount at once."

Explain technical terms immediately when they first appear.
Use this formula: TERM → DEFINITION → EXAMPLE → INTERPRETATION

==================================================
7. ARTICLE INTRODUCTION
==================================================

Keep the introduction approximately 60–120 words.
The introduction must immediately explain:
1. What the topic is.
2. Why it matters.
3. What the reader will learn.

Do not spend several paragraphs introducing the subject.
Do not start with generic phrases such as: "In today's ever-changing financial landscape..."
Start directly with the subject.

==================================================
8. QUICK ANSWER
==================================================

Provide a "Quick Answer" near the beginning (under ## Quick Answer).
The Quick Answer should directly answer the main search query in 2–4 clear sentences.

==================================================
9. KEY TAKEAWAYS
==================================================

Include 3–6 concise key takeaways (under ## Key Takeaways) as bullet points.

==================================================
10. STANDARD ARTICLE STRUCTURE
==================================================

Adapt this default structure to the topic:
H1 — Main Article Title
Short Introduction (60–120 words)
## Quick Answer
## Key Takeaways
H2 — What Is [Topic]?
H2 — How Does [Topic] Work?
H2 — Practical Example & Calculation
H2 — Important Factors to Consider
H2 — Advantages & Limitations
H2 — Comparison / Analysis (with Markdown Table)
H2 — What Investors Should Consider
## Investor Takeaway
## Frequently Asked Questions (4–8 questions)
## Continue Learning (Related YieldNest Tools & Articles)

==================================================
11. HEADINGS & 12. ONE QUESTION PER SECTION
==================================================

Use a logical heading hierarchy: only ONE H1.
H2 for major sections, H3 for subsections.
Whenever possible, make H2 headings answer specific reader questions (e.g. "What Is an Expense Ratio?", "How Does an Expense Ratio Affect Returns?", "Is a Lower Expense Ratio Always Better?").

==================================================
13. PARAGRAPH LENGTH & FORMATTING
==================================================

Keep paragraphs short (2–4 sentences).
Optimize formatting for mobile readers.
Use bullet points, comparison tables, subheadings, and callout sections. Avoid large blocks of text.

==================================================
14. EXAMPLES & 15. ASSUMPTIONS VS FACTS
==================================================

Use practical examples with clear Indian rupee figures (e.g. ₹5,000 monthly for 20 years -> ₹12,00,000 contribution, 12% assumed return -> estimated ₹49.5 lakh).
Always distinguish:
FACT vs ASSUMPTION vs ILLUSTRATION vs HISTORICAL DATA vs INTERPRETATION vs SCENARIO.
Clearly state that illustrations are assumptions and not guaranteed returns.

==================================================
16. NUMBERS AND FORMATTING
==================================================

Use ₹5,000, ₹10 lakh, ₹1.25 crore, 12%, 7.5%.
Avoid: Rs. 5,000/-, Rs 5000, ₹ 5000, 12 %.
Do not use excessive decimals (prefer 12.4% over 12.438729%).

==================================================
17. TABLES & 18. COMPARISON ARTICLES
==================================================

Use Markdown tables for comparisons, calculations, and feature differences.
Remain neutral. Do not declare a single winner. Compare multiple dimensions (costs, volatility, portfolio fit, investment horizon).

==================================================
19. INVESTOR TAKEAWAY
==================================================

Include a clearly labelled:
## Investor Takeaway
Summarize the practical meaning of the analysis without turning it into a sales pitch.

==================================================
20. RISKS AND LIMITATIONS & 21. FINANCIAL LANGUAGE
==================================================

Explicitly acknowledge relevant market, interest-rate, credit, liquidity, or tax limitations.
Never imply historical returns will repeat or calculator assumptions are guaranteed.

==================================================
22. MARKET PREDICTIONS
==================================================

Do not present predictions as facts. Discuss scenarios with stated drivers.

==================================================
23. SEO TITLE, 24. META DESCRIPTION & 25. URL
==================================================

Title: Search-focused, clear, 50–65 characters.
Meta description: 140–160 characters explaining what the article offers.
URL slug: short, descriptive, lower-case hyphenated.

==================================================
26. INTERNAL LINKING & 27. CALCULATOR INTEGRATION
==================================================

Include 2–5 natural, contextual links to existing YieldNest tools and guides:
- Calculators:
  * [SIP Calculator](/calculators/sip)
  * [Step-Up SIP Calculator](/calculators/step-up-sip)
  * [Lumpsum Calculator](/calculators/lumpsum)
  * [SWP Calculator](/calculators/swp)
  * [Goal Planner Calculator](/calculators/goal-planner)
  * [Mutual Fund Tax Estimator](/calculators/tax-estimator)
  * [Direct vs Regular Drag Calculator](/calculators/direct-vs-regular)
  * [Cost of Delay Calculator](/calculator/cost-of-delay)
  * [All Calculators Suite](/calculators)
- Guides & Pillars:
  * [Direct vs Regular Mutual Funds: Compounding Drag & Commissions](/article/direct-vs-regular-mutual-funds-charges-commissions-compounding)
  * [How to Evaluate Mutual Fund Performance: Rolling Returns, Alpha & Beta](/article/evaluating-mutual-fund-performance-rolling-returns-risk-ratios)
  * [How to Choose a Mutual Fund Guide](/guides/how-to-choose-a-mutual-fund)
  * [Mutual Fund Redemption Checklist](/guides/redemption-checklist)
  * [Topic Hubs](/hubs)
  * [Glossary](/glossary)
  * [FAQ Hub](/faq)

==================================================
28. RELATED RESOURCES
==================================================

At the end of the article, include:
## Continue Learning
List 3–5 genuinely related YieldNest resources with links.

==================================================
29. FREQUENTLY ASKED QUESTIONS
==================================================

Include 4–8 useful FAQs under:
## Frequently Asked Questions
Each FAQ should answer a genuine reader question using H3 headings.

==================================================
32 & 33. AVOID AI CLICHÉS
==================================================

ABSOLUTE BAN on repetitive AI phrases:
- "In today's ever-changing financial landscape..."
- "Whether you're a seasoned investor or a beginner..."
- "Let's dive into..."
- "Unlock the power of..."
- "Navigate the complex world of..."
- "In conclusion..."
- "It is important to note that..."
- "Embark on your investment journey..."
Start directly with the subject.

==================================================
34. ARTICLE LENGTH & 35. FIRST 100 WORDS
==================================================

Complete the topic; do not pad the topic (typically 1,000–2,000+ words).
In the first ~100 words, clearly establish: what the topic is, why it matters, what the reader will learn.

==================================================
36. YIELDNEST CONTENT FORMULA
==================================================

QUESTION → SIMPLE ANSWER → EXPLANATION → EXAMPLE → DATA → ANALYSIS → LIMITATION → INVESTOR TAKEAWAY

==================================================
37 & 38. MOST IMPORTANT RULE
==================================================

"Whenever you use a number, explain what the number means — not just what the number is."
Write like a knowledgeable financial analyst sitting beside an ordinary Indian investor and explaining the subject clearly, honestly, and without trying to sell them anything.
Do not add author bios or citations at the end unless requested.

==================================================
SPECIFIC ARTICLE ASSIGNMENT & CONTEXT
==================================================

Topic: "${cleanTopic}"
Category: "${category || "Fund Comparison"}"
Keywords to optimize for: ${JSON.stringify(keywords)}
Author: "${authorName}", "${authorCredentials}"
Verified Admin-Entered Data Points (${currentMonthYear}): ${amfiContext}
Verified Regulatory Facts: ${regulatoryContext.length > 2 ? regulatoryContext : "SEBI Mutual Fund Categorization & Disclosure Regulations; Section 112A Equity LTCG 12.5% above ₹1.25 Lakh; STCG 20%; Statutory TER slabs based on AUM; 3-tier structure (Sponsor, independent Trustees, AMC, Custodian)."}

==================================================
GROUNDING & DATA INTEGRITY RULES (STRICT ZERO-HALLUCINATION):
==================================================
- You must use ONLY admin-entered data points and verified regulatory facts provided in this prompt.
- You must NEVER fall back to a built-in or invented fund list.
- If ANY specific fund figure, metric, NAV, TER, AUM, return, ratio, or fact is missing or not provided in the inputs above, you MUST write "[[DATA NEEDED]]" in place of the missing value. Never invent or hallucinate data points.
- CURRENT CALENDAR YEAR IS ${currentYear} (${currentMonthYear}).
- NEVER use outdated years (e.g. 2024 or 2025) as the current year.
- Current Indian tax law: Equity LTCG is 12.5% above ₹1.25 Lakh, STCG is 20%.

Return ONLY valid JSON matching this schema:
{
  "title": "string (clear, search-focused, 50-65 chars)",
  "slug": "${slug}",
  "excerpt": "string (concise 140-160 char meta description)",
  "content": "string (full Markdown formatted article strictly following all rules above, using [[DATA NEEDED]] for missing metrics)",
  "readTimeMinutes": 6,
  "category": "${category || "Fund Comparison"}",
  "seoMetadata": {
    "metaTitle": "string",
    "metaDescription": "string (140-160 chars)",
    "primaryKeyword": "string",
    "secondaryKeywords": ["string", "string"],
    "eeatScore": 98,
    "riskRating": "Very High (Equity)"
  },
  "socialScheduling": {
    "twitter": "string (thread opener for X with 3-4 hashtags)",
    "instagram": "string (clean carousel summary, emoji bullets, bio link CTA)",
    "facebook": "string (analytical community discussion post with stats and link)"
  }
}`;

  let articleData = await generateJSONWithFallback(prompt, 0.4);

  if (!articleData || !articleData.title || !articleData.content) {
    return res.status(503).json({
      error: "Article generation unavailable. Check AI API configuration or try again.",
    });
  }

  // 1. Data Freshness Validation Layer Check (Warning only - never rewrite text)
  const validation = validateDataFreshness(articleData, now);

  // Ensure slug and clean properties
  if (!articleData.slug) articleData.slug = slug;
  articleData.authorName = authorName;
  articleData.authorTitle = authorCredentials;

  // Attach Data Freshness Status metadata
  articleData.dataFreshness = {
    isValid: validation.isFresh,
    isOlderThan30Days: validation.isOlderThan30Days,
    staleDatesDetected: validation.staleDatesDetected,
    warningTriggered: validation.isOlderThan30Days || validation.staleDatesDetected.length > 0,
    message: validation.staleDatesDetected.length > 0
      ? `Warning: Draft contains references older than 30 days (${validation.staleDatesDetected.slice(0, 3).join(", ")}). Publication will be blocked until corrected.`
      : `Data verified: All AMFI metrics and observations are within the current 30-day window (${currentMonthYear}).`,
    checkedAt: now.toISOString(),
    verifiedMonth: currentMonthYear,
  };

  // Auto-sync newly generated article to Supabase if connected
  if (serverSupabase) {
    try {
      await serverSupabase.from("posts").upsert(
        {
          slug: articleData.slug,
          title: articleData.title,
          excerpt: articleData.excerpt,
          content: articleData.content,
          category: articleData.category || category || "Fund Comparison",
          tags: articleData.seoMetadata?.secondaryKeywords || keywords || [],
          status: "draft",
          author_name: authorName,
          author_title: authorCredentials,
          read_time_minutes: articleData.readTimeMinutes || 6,
          amfi_data_snapshot: amfiDataSnapshot || [],
          seo_metadata: articleData.seoMetadata || {},
          data_freshness: articleData.dataFreshness || null,
          social_shares: articleData.socialScheduling || {},
        },
        { onConflict: "slug" }
      );
      console.log(`[Supabase Server] Draft auto-upserted to posts table: ${articleData.slug}`);
    } catch (dbErr) {
      console.warn("[Supabase Server] Draft auto-upsert note:", dbErr);
    }
  }

  return res.json(articleData);
});

// -------------------------------------------------------------
// 5. Social Media Snippet Generator & Rescheduler
// -------------------------------------------------------------
app.post("/api/social/generate-snippets", requireAdminAuth, aiLimiter, async (req, res) => {
  const { title, excerpt, keyFindings } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const prompt = `Create high-impact social media posts for an authoritative financial research article:
Title: "${title}"
Excerpt: "${excerpt}"
Key Findings: "${keyFindings || ""}"

Generate tailored posts for:
1. Twitter / X (Punchy hook, key data highlight, under 280 characters, 3 hashtags)
2. Instagram (Visual carousel breakdown, slide outline, emoji bullets, bio CTA, 6-8 hashtags)
3. Facebook (Community discussion, actionable takeaways, link referral, conversational tone)
Include 3 recommended publication times in IST.

Return ONLY valid JSON:
{
  "twitter": "string",
  "instagram": "string",
  "facebook": "string",
  "suggestedTimes": ["string", "string", "string"]
}`;

  const parsed = await generateJSONWithFallback(prompt, 0.4);
  if (parsed && (parsed.twitter || parsed.instagram || parsed.facebook)) {
    return res.json(parsed);
  }
  return res.status(503).json({ error: "Social snippet generation unavailable. Check AI API configuration." });
});

// -------------------------------------------------------------
// 6. Direct Supabase Bulk Sync Endpoint
// -------------------------------------------------------------
app.post("/api/posts/sync-supabase", requireAdminAuth, async (req, res) => {
  if (!serverSupabase) {
    return res.status(400).json({ error: "Supabase is not configured on the server." });
  }
  const { posts } = req.body;
  if (!posts || !Array.isArray(posts)) {
    return res.status(400).json({ error: "An array of posts is required" });
  }

  try {
    let synced = 0;
    for (const p of posts) {
      const { error } = await serverSupabase.from("posts").upsert(
        {
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          content: p.content,
          category: p.category,
          tags: p.tags,
          status: p.status,
          author_name: p.authorName,
          author_title: p.authorTitle,
          author_avatar: p.authorAvatar,
          cover_image: p.coverImage,
          read_time_minutes: p.readTimeMinutes,
          views_count: p.viewsCount,
          amfi_scheme_codes: p.amfiSchemeCodes,
          amfi_data_snapshot: p.amfiDataSnapshot,
          seo_metadata: p.seoMetadata,
          social_shares: p.socialSnippets,
          published_at: p.publishedAt,
        },
        { onConflict: "slug" }
      );
      if (!error) synced++;
    }
    return res.json({ success: true, count: synced, message: `Synced ${synced} posts to Supabase.` });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Failed to sync" });
  }
});

// -------------------------------------------------------------
// 7. Posts API & Storage Persistence (Supabase Only)
// -------------------------------------------------------------
async function getAllAggregatedArticles(onlyPublished = false): Promise<any[]> {
  const articlesMap = new Map<string, any>();

  // 1. Baseline seed articles
  for (const art of INITIAL_ARTICLES) {
    if (onlyPublished && art.status !== "published") continue;

    articlesMap.set(art.slug, {
      ...art,
      authorName: "YieldNest Research Desk",
      authorTitle: "YieldNest Research Desk",
      readTimeMinutes: art.readTimeMinutes || 6,
    });
  }

  // 2. Supabase posts (save and load posts from Supabase only)
  if (serverSupabase) {
    try {
      const query = serverSupabase.from("posts").select("*").order("published_at", { ascending: false });
      if (onlyPublished) {
        query.eq("status", "published");
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        for (const d of data) {
          articlesMap.set(d.slug, {
            id: d.id,
            slug: d.slug,
            title: d.title,
            excerpt: d.excerpt,
            content: d.content,
            category: d.category,
            tags: d.tags || [],
            status: d.status,
            authorName: "YieldNest Research Desk",
            authorTitle: "YieldNest Research Desk",
            authorAvatar: d.author_avatar,
            coverImage: d.cover_image,
            readTimeMinutes: d.read_time_minutes || 6,
            viewsCount: d.views_count || 0,
            amfiSchemeCodes: d.amfi_scheme_codes || [],
            amfiDataSnapshot: d.amfi_data_snapshot || [],
            seoMetadata: d.seo_metadata || {},
            socialSnippets: d.social_shares || {},
            scheduledFor: d.scheduled_for,
            publishedAt: d.published_at,
            createdAt: d.created_at,
            updatedAt: d.updated_at,
          });
        }
      }
    } catch (err) {
      console.warn("[Storage] Supabase fetch error in getAllAggregatedArticles:", err);
    }
  }

  const now = Date.now();
  return Array.from(articlesMap.values())
    .map((p) => {
      let pubAt = p.publishedAt;
      if (p.status === "published" && pubAt && new Date(pubAt).getTime() > now) {
        pubAt = new Date().toISOString();
      }
      return { ...p, publishedAt: pubAt };
    })
    .sort(
      (a, b) => new Date(b.publishedAt || b.createdAt || 0).getTime() - new Date(a.publishedAt || a.createdAt || 0).getTime()
    );
}

app.get("/api/posts", publicApiLimiter, async (_req, res) => {
  const posts = await getAllAggregatedArticles(false);
  return res.json(posts);
});

// -------------------------------------------------------------
// Category Taxonomy & Metadata
// -------------------------------------------------------------
const CATEGORY_META: Record<string, { name: string; title: string; description: string }> = {
  "fund-comparison": {
    name: "Fund Comparison",
    title: "Fund Comparison Mutual Fund Research & Analysis | YieldNest.online",
    description: "Side-by-side mutual fund analyses, 5-year rolling returns, downside capture, and AMFI scheme comparisons on YieldNest.online.",
  },
  "performance-analysis": {
    name: "Performance Analysis",
    title: "Performance Analysis & Rolling Return Studies | YieldNest.online",
    description: "Quantitative mutual fund performance analysis, risk-adjusted ratios (Sharpe, Sortino), and rolling return evaluations.",
  },
  "market-trends": {
    name: "Market Trends",
    title: "Market Trends & AMFI Mutual Fund Inflow Analytics | YieldNest.online",
    description: "Analysis of Indian mutual fund market trends, AMFI monthly inflow trajectories, SIP book growth, and industry liquidity.",
  },
  "category-deep-dive": {
    name: "Category Deep-Dive",
    title: "Category Deep-Dive & Scheme Analyses | YieldNest.online",
    description: "Comprehensive deep-dives into Indian equity fund categories: Flexi Cap, Small Cap, Large & Mid Cap, and Index funds.",
  },
  "sip-strategies": {
    name: "SIP Strategies",
    title: "SIP Strategies & Compounding Wealth Tactics | YieldNest.online",
    description: "Mathematical frameworks for systematic investment planning, step-up SIP compounding, and direct plan cost optimization.",
  },
};

const CATEGORY_NAME_TO_SLUG: Record<string, string> = {
  "Fund Comparison": "fund-comparison",
  "Performance Analysis": "performance-analysis",
  "Market Trends": "market-trends",
  "Category Deep-Dive": "category-deep-dive",
  "SIP Strategies": "sip-strategies",
};

// -------------------------------------------------------------
// Article Retrieval & Aggregation (Supabase + Local + Seed)
// -------------------------------------------------------------
async function getPublishedArticlesList(): Promise<any[]> {
  return getAllAggregatedArticles(true);
}

// -------------------------------------------------------------
// POST /api/posts & DELETE /api/posts/:id Handlers (Protected)
// -------------------------------------------------------------
app.post("/api/posts", requireAdminAuth, async (req, res) => {
  const post = req.body;
  if (!post || !post.slug) {
    return res.status(400).json({ error: "Post data with slug is required" });
  }

  // Strict slug sanitization for Google Search Console URL indexability
  const sanitizedSlug = String(post.slug)
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\/[^/]+/i, "")
    .replace(/^\/?(article|category)\//i, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\s_.]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  post.slug = sanitizedSlug;
  post.authorName = "YieldNest Research Desk";
  post.authorTitle = "YieldNest Research Desk";

  // A stale-date finding blocks publishing and shows a warning, never rewrites the text
  if (post.status === "published") {
    const freshness = validateDataFreshness(post);
    if (freshness.isOlderThan30Days || (freshness.staleDatesDetected && freshness.staleDatesDetected.length > 0)) {
      return res.status(400).json({
        error: "Publishing blocked: Stale dates or outdated references detected.",
        staleDatesDetected: freshness.staleDatesDetected,
        message: `Publishing is blocked because stale or outdated references were detected: ${freshness.staleDatesDetected.join("; ")}. Review and correct factual data before publishing.`,
      });
    }
  }

  // Save to Supabase only
  if (!serverSupabase) {
    return res.status(503).json({ error: "Supabase database is not configured. Cannot save post." });
  }

  try {
    const { data, error } = await serverSupabase.from("posts").upsert(
      {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags,
        status: post.status,
        author_name: "Research Desk",
        author_title: "YieldNest Research Desk",
        author_avatar: post.authorAvatar,
        cover_image: post.coverImage,
        read_time_minutes: post.readTimeMinutes,
        views_count: post.viewsCount,
        amfi_scheme_codes: post.amfiSchemeCodes,
        amfi_data_snapshot: post.amfiDataSnapshot,
        seo_metadata: post.seoMetadata,
        social_shares: post.socialSnippets,
        scheduled_for: post.scheduledFor,
        published_at: post.publishedAt || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" }
    ).select().single();

    if (error) {
      console.error("[/api/posts] Supabase upsert error:", error);
      return res.status(500).json({ error: `Supabase save failed: ${error.message}` });
    }

    // Auto-sync static sitemap and LLMs file
    syncStaticSitemapAndLlms().catch((err) => console.warn("Sitemap sync warning:", err));

    return res.json({ success: true, post: { ...post, ...data } });
  } catch (dbErr: any) {
    console.error("[/api/posts] Supabase upsert exception:", dbErr);
    return res.status(500).json({ error: dbErr?.message || "Failed to save post to Supabase" });
  }
});

app.delete("/api/posts/:id", requireAdminAuth, async (req, res) => {
  const id = String(req.params.id || "").replace(/[^0-9a-zA-Z_-]/g, "");
  const slug = String((req.query.slug as string) || "").replace(/[^0-9a-zA-Z_-]/g, "");

  if (!id && !slug) {
    return res.status(400).json({ error: "Invalid post identifier format." });
  }

  if (!serverSupabase) {
    return res.status(503).json({ error: "Supabase database is not configured. Cannot delete post." });
  }

  // Delete from Supabase database only
  try {
    if (id) {
      await serverSupabase.from("posts").delete().eq("id", id);
      await serverSupabase.from("posts").delete().eq("slug", id);
    }
    if (slug) {
      await serverSupabase.from("posts").delete().eq("slug", slug);
    }
  } catch (err: any) {
    console.warn("[/api/posts/:id] Supabase delete warning:", err);
    return res.status(500).json({ error: err.message || "Failed to delete post from Supabase" });
  }

  // Update sitemaps
  syncStaticSitemapAndLlms().catch((err) => console.warn("Sitemap sync warning:", err));
  return res.json({ success: true, message: "Article permanently deleted from Supabase." });
});

// -------------------------------------------------------------
// RSS Feed Generation
// -------------------------------------------------------------

function buildRssXmlString(articles: any[]): string {
  const siteUrl = "https://www.yieldnest.online";
  const now = new Date().toUTCString();
  const items = articles.slice(0, 30).map((art) => {
    const pubDate = new Date(art.publishedAt || art.createdAt || Date.now()).toUTCString();
    const title = escapeHtml(art.title || "");
    const desc = escapeHtml(art.excerpt || "");
    const link = `${siteUrl}/article/${encodeURIComponent(art.slug)}`;
    return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${desc}</description>
      <category>${escapeHtml(art.category || "Mutual Funds")}</category>
    </item>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>YieldNest.online - Independent Mutual Fund Research &amp; Analytics</title>
    <link>${siteUrl}</link>
    <description>Data-driven research on Indian Mutual Funds, AMFI NAV analysis, and objective fund category comparisons.</description>
    <language>en-in</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}

async function syncStaticSitemapAndLlms() {
  try {
    const articles = await getPublishedArticlesList();
    const xml = buildSitemapXmlString(articles);
    const publicSitemapPath = path.join(__dirname, "public", "sitemap.xml");
    fs.writeFileSync(publicSitemapPath, xml, "utf-8");
    const distSitemapPath = path.join(__dirname, "dist", "sitemap.xml");
    if (fs.existsSync(path.join(__dirname, "dist"))) {
      fs.writeFileSync(distSitemapPath, xml, "utf-8");
    }

    // Also sync public/llms.txt and public/llms-full.txt
    const llmsTxtContent = buildLlmsTxtString(articles);
    const llmsFullContent = buildLlmsFullString(articles);

    const publicLlmsPath = path.join(__dirname, "public", "llms.txt");
    fs.writeFileSync(publicLlmsPath, llmsTxtContent, "utf-8");
    const publicLlmsFullPath = path.join(__dirname, "public", "llms-full.txt");
    fs.writeFileSync(publicLlmsFullPath, llmsFullContent, "utf-8");

    const distPath = path.join(__dirname, "dist");
    if (fs.existsSync(distPath)) {
      fs.writeFileSync(path.join(distPath, "llms.txt"), llmsTxtContent, "utf-8");
      fs.writeFileSync(path.join(distPath, "llms-full.txt"), llmsFullContent, "utf-8");
    }
  } catch (err) {
    console.warn("[Sync] Failed to sync static sitemap / llms:", err);
  }
}

// -------------------------------------------------------------
// SEO Endpoints (robots.txt, sitemap.xml, llms.txt)
// -------------------------------------------------------------
app.get("/robots.txt", (_req, res) => {
  const robotsPath = path.join(__dirname, "public", "robots.txt");
  if (fs.existsSync(robotsPath)) {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.sendFile(robotsPath);
  }
  const fallback = `# robots.txt for YieldNest.online
User-agent: *
Allow: /
Disallow: /admin

User-agent: Googlebot
Allow: /
Disallow: /admin

User-agent: Google-InspectionTool
Allow: /

Sitemap: https://www.yieldnest.online/sitemap.xml
`;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  return res.send(fallback);
});

app.get("/sitemap.xml", async (_req, res) => {
  try {
    const articles = await getPublishedArticlesList();
    const xml = buildSitemapXmlString(articles);
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=1800, s-maxage=1800");
    return res.status(200).send(xml);
  } catch (err: any) {
    console.error("Failed to generate sitemap.xml dynamically, falling back to static file:", err);
    const publicSitemapPath = path.join(__dirname, "public", "sitemap.xml");
    const distSitemapPath = path.join(__dirname, "dist", "sitemap.xml");
    if (fs.existsSync(publicSitemapPath)) {
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      return res.sendFile(publicSitemapPath);
    } else if (fs.existsSync(distSitemapPath)) {
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      return res.sendFile(distSitemapPath);
    }
    return res.status(500).send("Error generating sitemap");
  }
});

app.get(["/rss.xml", "/feed.xml", "/feed"], async (_req, res) => {
  try {
    const articles = await getPublishedArticlesList();
    const xml = buildRssXmlString(articles);
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=1800, s-maxage=1800");
    return res.status(200).send(xml);
  } catch (err: any) {
    console.error("Failed to generate rss.xml:", err);
    return res.status(500).send("Error generating RSS feed");
  }
});

app.get(["/llms.txt", "/.well-known/llms.txt"], (_req, res) => {
  const llmsPath = path.join(__dirname, "public", "llms.txt");
  if (fs.existsSync(llmsPath)) {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.sendFile(llmsPath);
  }
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  return res.send("# YieldNest.online\n\nIndependent Mutual Fund Research & Analytics.");
});

app.get("/llms-full.txt", (_req, res) => {
  const fullPath = path.join(__dirname, "public", "llms-full.txt");
  if (fs.existsSync(fullPath)) {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.sendFile(fullPath);
  }
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  return res.send("# YieldNest.online - Full Content Archive");
});

app.get(["/.well-known/ai-catalog.json", "/.well-known/ard.json", "/ai-catalog.json"], (_req, res) => {
  const catalogPath = path.join(__dirname, "public", ".well-known", "ai-catalog.json");
  if (fs.existsSync(catalogPath)) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.sendFile(catalogPath);
  }
  return res.status(404).json({ error: "Not found" });
});

// -------------------------------------------------------------
// Markdown-to-Semantic-HTML Server-Side Renderer
// -------------------------------------------------------------
function escapeHtml(str: string): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderChartToHtml(type: string, blockContent: string): string {
  const lines = blockContent.split("\n");
  let title = "Comparative Performance Analysis";
  let subtitle = "";
  let legend1 = "Direct Plan";
  let legend2 = "Regular Plan";
  const rows: Array<{ label: string; v1: number; v2?: number; color?: string; badge?: string }> = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.toLowerCase().startsWith("title:")) { title = trimmed.slice(6).trim(); continue; }
    if (trimmed.toLowerCase().startsWith("subtitle:")) { subtitle = trimmed.slice(9).trim(); continue; }
    if (trimmed.toLowerCase().startsWith("legend1:")) { legend1 = trimmed.slice(8).trim(); continue; }
    if (trimmed.toLowerCase().startsWith("legend2:")) { legend2 = trimmed.slice(8).trim(); continue; }
    const parts = trimmed.split("|").map((p) => p.trim());
    if (parts.length >= 2) {
      const label = parts[0];
      const v1 = parseFloat(parts[1].replace("%", ""));
      const v2 = parts[2] ? parseFloat(parts[2].replace("%", "")) : undefined;
      const color = parts[3] || (parts[2] && parts[2].startsWith("#") ? parts[2] : undefined);
      const badge = parts[4] || (parts[3] && !parts[3].startsWith("#") ? parts[3] : undefined);
      rows.push({ label, v1: isNaN(v1) ? 0 : v1, v2: isNaN(v2 as number) ? undefined : v2, color, badge });
    }
  }

  const maxVal = Math.max(...rows.flatMap((d) => [d.v1, d.v2 !== undefined ? d.v2 : 0]), 10);
  const isDouble = type.includes("bar") && rows.some((d) => d.v2 !== undefined);

  let out = `<div style="margin:2rem 0;padding:1.5rem;background:#ffffff;border:1px solid #e0ddd3;border-radius:1rem;font-family:sans-serif;">`;
  out += `<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #f0eee6;padding-bottom:0.75rem;margin-bottom:1rem;">`;
  out += `<div><h4 style="margin:0;font-size:1.15rem;font-weight:700;color:#1c1917;">${escapeHtml(title)}</h4>`;
  if (subtitle) out += `<div style="font-size:0.75rem;color:#78716c;margin-top:0.25rem;">${escapeHtml(subtitle)}</div>`;
  out += `</div>`;
  if (isDouble) {
    out += `<div style="display:flex;gap:1rem;font-size:0.75rem;background:#faf9f5;padding:0.35rem 0.75rem;border-radius:0.5rem;border:1px solid #e7e5e4;">`;
    out += `<span style="display:flex;align-items:center;gap:0.35rem;"><span style="width:10px;height:10px;background:#047857;display:inline-block;border-radius:2px;"></span>${escapeHtml(legend1)}</span>`;
    out += `<span style="display:flex;align-items:center;gap:0.35rem;"><span style="width:10px;height:10px;background:#d97706;display:inline-block;border-radius:2px;"></span>${escapeHtml(legend2)}</span>`;
    out += `</div>`;
  }
  out += `</div>`;

  out += `<div style="display:flex;flex-direction:column;gap:1rem;">`;
  for (const r of rows) {
    const w1 = Math.min(100, Math.max(8, (r.v1 / maxVal) * 100));
    const w2 = r.v2 !== undefined ? Math.min(100, Math.max(8, (r.v2 / maxVal) * 100)) : 0;
    out += `<div><div style="display:flex;justify-content:space-between;font-size:0.85rem;font-weight:600;margin-bottom:0.25rem;color:#292524;"><span>${escapeHtml(r.label)}</span><span style="color:#047857;font-weight:700;">+${r.v1}%</span></div>`;
    out += `<div style="background:#f5f5f4;border-radius:9999px;height:14px;overflow:hidden;margin-bottom:0.25rem;"><div style="background:${r.color || '#047857'};width:${w1}%;height:100%;border-radius:9999px;"></div></div>`;
    if (r.v2 !== undefined) {
      out += `<div style="background:#f5f5f4;border-radius:9999px;height:10px;overflow:hidden;"><div style="background:#d97706;width:${w2}%;height:100%;border-radius:9999px;"></div></div>`;
    }
    out += `</div>`;
  }
  out += `</div>`;

  out += `<div style="margin-top:1rem;padding-top:0.5rem;border-top:1px solid #f0eee6;font-size:0.7rem;color:#78716c;display:flex;justify-content:space-between;"><span>Source: Association of Mutual Funds in India (AMFI)</span><span>As on 05-Oct-2026 Disclosures</span></div>`;
  out += `</div>`;
  return out;
}

function renderMarkdownToHtml(markdown: string): string {
  if (!markdown) return "";
  let html = markdown
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Chart blocks
  html = html.replace(/```chart([^\n]*)\n([\s\S]*?)```/gi, (_m, chartType, code) => {
    return renderChartToHtml(chartType || "bar", code);
  });

  // Code blocks
  html = html.replace(/```([a-z0-9_-]*)\n([\s\S]*?)```/gi, (_m, _lang, code) => {
    return `<pre style="background:#1c1a17;color:#f3f1e9;padding:1rem;border-radius:0.75rem;overflow-x:auto;font-size:0.8rem;margin:1.25rem 0;"><code>${code.trim()}</code></pre>`;
  });
  html = html.replace(/`([^`]+)`/g, `<code style="background:#eae8e0;padding:0.15rem 0.35rem;border-radius:0.25rem;font-size:0.85em;">$1</code>`);

  // Headings
  html = html.replace(/^### (.*$)/gim, `<h3 style="font-size:1.15rem;font-weight:600;margin-top:1.5rem;margin-bottom:0.5rem;color:#1a1a1a;">$1</h3>`);
  html = html.replace(/^## (.*$)/gim, `<h2 style="font-size:1.4rem;font-weight:600;margin-top:2rem;margin-bottom:0.75rem;padding-bottom:0.25rem;border-bottom:1px solid #eae8e0;color:#1a1a1a;">$1</h2>`);
  html = html.replace(/^# (.*$)/gim, `<h1 style="font-size:1.75rem;font-weight:700;margin-top:2rem;margin-bottom:1rem;color:#1a1a1a;">$1</h1>`);

  // Blockquotes
  html = html.replace(/^> (.*$)/gim, `<blockquote style="border-left:4px solid #d97706;padding:0.5rem 1rem;margin:1rem 0;background:#fffbeb;font-style:italic;color:#451a03;border-radius:0 0.5rem 0.5rem 0;">$1</blockquote>`);

  // Horizontal rules
  html = html.replace(/^---$/gim, `<hr style="margin:1.75rem 0;border:0;border-top:1px solid #eae8e0;" />`);

  // Bold & Italic
  html = html.replace(/\*\*([^*]+)\*\*/g, `<strong>$1</strong>`);
  html = html.replace(/\*([^*]+)\*/g, `<em>$1</em>`);

  // Links (strictly sanitized against javascript:/vbscript:/data: schemes)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, text, rawUrl) => {
    const trimmed = (rawUrl || "").trim();
    const isSafe =
      /^https?:\/\//i.test(trimmed) ||
      /^\/(?!\/)/.test(trimmed) ||
      /^#[a-z0-9_-]+$/i.test(trimmed) ||
      /^mailto:[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(trimmed);
    const safeUrl = isSafe ? escapeHtml(trimmed) : "#";
    return `<a href="${safeUrl}" style="color:#065f46;text-decoration:underline;font-weight:500;">${text}</a>`;
  });

  // Tables
  const lines = html.split("\n");
  const parsedLines: string[] = [];
  let inTable = false;
  let tableHeaderDone = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("|") && line.endsWith("|")) {
      const cells = line.slice(1, -1).split("|").map((c) => c.trim());
      if (cells.every((c) => /^:?-+:?$/.test(c))) {
        continue;
      }
      if (!inTable) {
        inTable = true;
        tableHeaderDone = false;
        parsedLines.push(`<div style="overflow-x:auto;margin:1.5rem 0;"><table style="width:100%;font-size:0.85rem;border-collapse:collapse;border:1px solid #e5e3dc;background:#ffffff;border-radius:0.5rem;">`);
      }
      if (!tableHeaderDone) {
        tableHeaderDone = true;
        parsedLines.push(`<thead style="background:#f4f2eb;font-weight:600;border-bottom:1px solid #e5e3dc;"><tr>${cells.map((c) => `<th style="padding:0.6rem 0.8rem;text-align:left;">${c}</th>`).join("")}</tr></thead><tbody>`);
      } else {
        parsedLines.push(`<tr style="border-bottom:1px solid #f0eee6;">${cells.map((c) => `<td style="padding:0.6rem 0.8rem;">${c}</td>`).join("")}</tr>`);
      }
    } else {
      if (inTable) {
        inTable = false;
        parsedLines.push(`</tbody></table></div>`);
      }
      parsedLines.push(lines[i]);
    }
  }
  if (inTable) {
    parsedLines.push(`</tbody></table></div>`);
  }
  html = parsedLines.join("\n");

  // Paragraphs & Lists
  const paragraphs = html.split(/\n\s*\n/);
  html = paragraphs
    .map((p) => {
      const trimmed = p.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<table") ||
        trimmed.startsWith("<div") ||
        trimmed.startsWith("<blockquote") ||
        trimmed.startsWith("<hr") ||
        trimmed.startsWith("<pre") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<ol")
      ) {
        return trimmed;
      }
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const items = trimmed.split("\n").filter((l) => l.trim().startsWith("- ") || l.trim().startsWith("* "));
        return `<ul style="margin:1rem 0;padding-left:1.5rem;line-height:1.7;">${items.map((it) => `<li>${it.replace(/^[-*]\s+/, "")}</li>`).join("")}</ul>`;
      }
      return `<p style="margin-bottom:1.15rem;line-height:1.75;color:#2d2a26;">${trimmed.replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");

  return html;
}

// -------------------------------------------------------------
// HTML Injection: Article Page (SSR for Googlebot & Users)
// -------------------------------------------------------------
function injectArticleMeta(html: string, article: any): string {
  const title = `${escapeHtml(article.title)} | YieldNest.online`;
  const description = escapeHtml(article.excerpt || "Independent mutual fund research on YieldNest.online.");
  const url = `https://www.yieldnest.online/article/${encodeURIComponent(article.slug)}`;
  const datePublished = new Date(article.publishedAt || article.createdAt || Date.now()).toISOString();
  const dateModified = new Date(article.updatedAt || article.createdAt || Date.now()).toISOString();
  const catSlug = CATEGORY_NAME_TO_SLUG[article.category] || "fund-comparison";
  const catUrl = `https://www.yieldnest.online/category/${catSlug}`;

  const schemaJson = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FinancialArticle",
        "@id": `${url}#article`,
        "isPartOf": {
          "@type": "WebPage",
          "@id": url,
          "url": url,
          "name": title,
        },
        "headline": article.title,
        "description": article.excerpt,
        "url": url,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": url,
        },
        "datePublished": datePublished,
        "dateModified": dateModified,
        "author": {
          "@type": "Organization",
          "name": "YieldNest Research Desk",
        },
        "publisher": {
          "@type": "Organization",
          "name": "YieldNest.online",
          "url": "https://www.yieldnest.online",
        },
        "articleSection": article.category,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.yieldnest.online/",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": article.category,
            "item": catUrl,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": article.title,
            "item": url,
          },
        ],
      },
    ],
  });

  let modified = html;
  modified = modified.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  modified = modified.replace(/<meta\s+name=["']description["'][\s\S]*?>/i, `<meta name="description" content="${description}" />`);
  modified = modified.replace(/<link\s+rel=["']canonical["'][\s\S]*?>/i, `<link rel="canonical" href="${url}" />`);
  modified = modified.replace(/<meta\s+property=["']og:title["'][\s\S]*?>/i, `<meta property="og:title" content="${title}" />`);
  modified = modified.replace(/<meta\s+property=["']og:description["'][\s\S]*?>/i, `<meta property="og:description" content="${description}" />`);
  modified = modified.replace(/<meta\s+property=["']og:url["'][\s\S]*?>/i, `<meta property="og:url" content="${url}" />`);
  modified = modified.replace(/<meta\s+property=["']og:type["'][\s\S]*?>/i, `<meta property="og:type" content="article" />`);
  modified = modified.replace(/<meta\s+name=["']twitter:title["'][\s\S]*?>/i, `<meta name="twitter:title" content="${title}" />`);
  modified = modified.replace(/<meta\s+name=["']twitter:description["'][\s\S]*?>/i, `<meta name="twitter:description" content="${description}" />`);

  const schemaScript = `\n    <script type="application/ld+json" id="server-structured-data">\n${schemaJson}\n    </script>\n  `;
  modified = modified.replace("</head>", `${schemaScript}</head>`);

  // Pre-render semantic HTML inside #root for instant indexability by Googlebot
  const renderedContent = renderMarkdownToHtml(article.content || "");
  const formattedDate = new Date(article.publishedAt || article.createdAt || Date.now()).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const ssrBody = `<div class="max-w-4xl mx-auto px-4 py-8 font-serif-editorial">
    <nav aria-label="Breadcrumb" style="font-size:0.75rem;font-family:monospace;margin-bottom:1.5rem;color:#78716c;">
      <a href="/" style="color:#44403c;text-decoration:underline;">Home</a> / <a href="${catUrl}" style="color:#44403c;text-decoration:underline;">${escapeHtml(article.category)}</a> / <span style="color:#1c1917;">${escapeHtml(article.title)}</span>
    </nav>
    <article>
      <header style="margin-bottom:2rem;border-bottom:1px solid #eae8e0;padding-bottom:1.5rem;">
        <div style="display:inline-block;padding:0.2rem 0.6rem;background:#eae8e0;color:#1c1917;border-radius:0.25rem;font-size:0.75rem;font-weight:600;margin-bottom:0.75rem;">
          ${escapeHtml(article.category)}
        </div>
        <h1 style="font-size:2.2rem;font-weight:700;line-height:1.2;color:#1a1a1a;margin-bottom:1rem;">
          ${escapeHtml(article.title)}
        </h1>
        <div style="font-size:0.8rem;font-family:monospace;color:#78716c;display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;">
          <span>By <strong>YieldNest Research Desk</strong></span>
          <span>•</span>
          <time datetime="${datePublished}">${formattedDate}</time>
          <span>•</span>
          <span>${article.readTimeMinutes || 6} min read</span>
          <span>•</span>
          <span style="color:#059669;font-weight:600;">AMFI Scheme Verified</span>
        </div>
        <p style="font-size:1.05rem;line-height:1.6;color:#57534e;margin-top:1rem;font-style:italic;">
          ${escapeHtml(article.excerpt)}
        </p>
      </header>
      <div class="article-body">
        ${renderedContent}
      </div>
      <footer style="margin-top:3rem;padding:1.5rem;background:#ffffff;border:1px solid #e5e3dc;border-radius:0.75rem;font-size:0.75rem;color:#57534e;line-height:1.6;">
        <strong style="color:#1c1917;">Statutory Disclosure:</strong> YieldNest.online is an independent quantitative investor education platform and is not SEBI or AMFI registered. Mutual fund investments are subject to market risks; read all scheme related documents carefully before investing.
      </footer>
    </article>
  </div>`;

  modified = modified.replace('<div id="root"></div>', `<div id="root">${ssrBody}</div>`);
  return modified;
}

// -------------------------------------------------------------
// HTML Injection: Category Page (SSR for Googlebot & Users)
// -------------------------------------------------------------
function injectCategoryMeta(html: string, categorySlug: string, articles: any[]): string {
  const meta = CATEGORY_META[categorySlug];
  if (!meta) return html;

  const title = `${meta.title}`;
  const description = `${meta.description}`;
  const url = `https://www.yieldnest.online/category/${categorySlug}`;
  const categoryArticles = articles.filter(
    (a) => (CATEGORY_NAME_TO_SLUG[a.category] || "").toLowerCase() === categorySlug.toLowerCase()
  );

  const schemaJson = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#collection`,
        "url": url,
        "name": title,
        "description": description,
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://www.yieldnest.online/#website",
          "name": "YieldNest.online",
          "url": "https://www.yieldnest.online",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.yieldnest.online/",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": meta.name,
            "item": url,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${url}#itemlist`,
        "name": `${meta.name} Research Articles`,
        "itemListElement": categoryArticles.map((art, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": art.title,
          "url": `https://www.yieldnest.online/article/${encodeURIComponent(art.slug)}`,
        })),
      },
    ],
  });

  let modified = html;
  modified = modified.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  modified = modified.replace(/<meta\s+name=["']description["'][\s\S]*?>/i, `<meta name="description" content="${description}" />`);
  modified = modified.replace(/<link\s+rel=["']canonical["'][\s\S]*?>/i, `<link rel="canonical" href="${url}" />`);
  modified = modified.replace(/<meta\s+property=["']og:title["'][\s\S]*?>/i, `<meta property="og:title" content="${title}" />`);
  modified = modified.replace(/<meta\s+property=["']og:description["'][\s\S]*?>/i, `<meta property="og:description" content="${description}" />`);
  modified = modified.replace(/<meta\s+property=["']og:url["'][\s\S]*?>/i, `<meta property="og:url" content="${url}" />`);
  modified = modified.replace(/<meta\s+name=["']twitter:title["'][\s\S]*?>/i, `<meta name="twitter:title" content="${title}" />`);
  modified = modified.replace(/<meta\s+name=["']twitter:description["'][\s\S]*?>/i, `<meta name="twitter:description" content="${description}" />`);

  const schemaScript = `\n    <script type="application/ld+json" id="server-structured-data">\n${schemaJson}\n    </script>\n  `;
  modified = modified.replace("</head>", `${schemaScript}</head>`);

  // Pre-render semantic HTML category listing
  const ssrBody = `<div class="max-w-5xl mx-auto px-4 py-8 font-serif-editorial">
    <nav aria-label="Breadcrumb" style="font-size:0.75rem;font-family:monospace;margin-bottom:1.5rem;color:#78716c;">
      <a href="/" style="color:#44403c;text-decoration:underline;">Home</a> / <span style="color:#1c1917;">${escapeHtml(meta.name)}</span>
    </nav>
    <header style="margin-bottom:2.5rem;border-bottom:1px solid #eae8e0;padding-bottom:1.5rem;">
      <span style="display:inline-block;padding:0.25rem 0.6rem;background:#1a1a1a;color:#ffffff;border-radius:0.25rem;font-size:0.75rem;font-weight:600;margin-bottom:0.75rem;">
        Research Category
      </span>
      <h1 style="font-size:2.2rem;font-weight:700;color:#1a1a1a;margin-bottom:0.5rem;">
        ${escapeHtml(meta.name)} Mutual Fund Research
      </h1>
      <p style="font-size:1rem;color:#57534e;line-height:1.6;max-w-2xl;">
        ${escapeHtml(meta.description)}
      </p>
    </header>
    <section>
      <h2 style="font-size:1.1rem;font-family:monospace;font-weight:600;color:#44403c;margin-bottom:1.25rem;text-transform:uppercase;letter-spacing:0.05em;">
        Published Papers (${categoryArticles.length})
      </h2>
      <div style="display:flex;flex-direction:column;gap:1.5rem;">
        ${categoryArticles
          .map(
            (art) => `<article style="padding:1.5rem;background:#fbfaf8;border:1px solid #eae8e0;border-radius:0.75rem;">
              <h3 style="font-size:1.3rem;font-weight:600;margin-bottom:0.5rem;">
                <a href="/article/${encodeURIComponent(art.slug)}" style="color:#1a1a1a;text-decoration:underline;">${escapeHtml(art.title)}</a>
              </h3>
              <p style="font-size:0.9rem;color:#57534e;line-height:1.6;margin-bottom:0.75rem;">
                ${escapeHtml(art.excerpt)}
              </p>
              <div style="font-size:0.75rem;font-family:monospace;color:#78716c;">
                <span>Published: ${new Date(art.publishedAt).toLocaleDateString()}</span> • <span>${art.readTimeMinutes || 6} min read</span>
              </div>
            </article>`
          )
          .join("\n")}
      </div>
    </section>
  </div>`;

  modified = modified.replace('<div id="root"></div>', `<div id="root">${ssrBody}</div>`);
  return modified;
}

// -------------------------------------------------------------
// HTML Injection: Homepage (SSR for Googlebot & Users)
// -------------------------------------------------------------
function injectHomepageMeta(html: string, articles: any[]): string {
  const title = "YieldNest.online – Independent Mutual Fund Research & Analytics";
  const description = "Data-driven research on Indian Mutual Funds. Unbiased fund comparisons, rolling return analyses, portfolio overlap checks, and market analytics on YieldNest.online.";
  const url = "https://www.yieldnest.online/";

  const schemaJson = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        "name": "YieldNest.online",
        "url": url,
        "description": description,
        "publisher": {
          "@type": "Organization",
          "name": "YieldNest.online",
          "url": url,
        },
        "inLanguage": "en-IN",
      },
      {
        "@type": "Organization",
        "@id": `${url}#organization`,
        "name": "YieldNest.online",
        "url": url,
        "description": "Independent Quantitative Mutual Fund Research & Analytics Publication",
      },
    ],
  });

  let modified = html;
  modified = modified.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  modified = modified.replace(/<meta\s+name=["']description["'][\s\S]*?>/i, `<meta name="description" content="${description}" />`);
  modified = modified.replace(/<link\s+rel=["']canonical["'][\s\S]*?>/i, `<link rel="canonical" href="${url}" />`);
  modified = modified.replace(/<meta\s+property=["']og:title["'][\s\S]*?>/i, `<meta property="og:title" content="${title}" />`);
  modified = modified.replace(/<meta\s+property=["']og:description["'][\s\S]*?>/i, `<meta property="og:description" content="${description}" />`);
  modified = modified.replace(/<meta\s+property=["']og:url["'][\s\S]*?>/i, `<meta property="og:url" content="${url}" />`);

  const schemaScript = `\n    <script type="application/ld+json" id="server-structured-data">\n${schemaJson}\n    </script>\n  `;
  modified = modified.replace("</head>", `${schemaScript}</head>`);

  // Pre-render semantic HTML for homepage
  const ssrBody = `<div class="max-w-5xl mx-auto px-4 py-8 font-serif-editorial">
    <header style="text-align:center;margin-bottom:3rem;padding-bottom:2rem;border-bottom:1px solid #eae8e0;">
      <h1 style="font-size:2.5rem;font-weight:700;color:#1a1a1a;margin-bottom:0.5rem;">
        YieldNest.online
      </h1>
      <p style="font-size:1.1rem;color:#57534e;max-w-2xl;margin:0 auto;line-height:1.6;">
        ${escapeHtml(description)}
      </p>
      <nav aria-label="Research Navigation" style="margin-top:1.5rem;display:flex;flex-direction:column;gap:0.75rem;align-items:center;font-size:0.8rem;font-family:monospace;">
        <div style="display:flex;justify-content:center;gap:0.5rem;flex-wrap:wrap;">
          <a href="/" style="color:#1a1a1a;padding:0.35rem 0.75rem;background:#eae8e0;border-radius:0.5rem;text-decoration:none;font-weight:600;">All Research</a>
          <a href="/category/fund-comparison" style="color:#1a1a1a;padding:0.35rem 0.75rem;background:#eae8e0;border-radius:0.5rem;text-decoration:none;">Fund Comparisons</a>
          <a href="/category/performance-analysis" style="color:#1a1a1a;padding:0.35rem 0.75rem;background:#eae8e0;border-radius:0.5rem;text-decoration:none;">Performance Analysis</a>
          <a href="/category/market-trends" style="color:#1a1a1a;padding:0.35rem 0.75rem;background:#eae8e0;border-radius:0.5rem;text-decoration:none;">Market Trends</a>
          <a href="/category/category-deep-dive" style="color:#1a1a1a;padding:0.35rem 0.75rem;background:#eae8e0;border-radius:0.5rem;text-decoration:none;">Category Deep-Dive</a>
          <a href="/category/sip-strategies" style="color:#1a1a1a;padding:0.35rem 0.75rem;background:#eae8e0;border-radius:0.5rem;text-decoration:none;">SIP Tactics</a>
        </div>
        <div style="display:flex;justify-content:center;gap:0.5rem;flex-wrap:wrap;font-size:0.75rem;">
          <a href="/hubs" style="color:#1a1a1a;padding:0.3rem 0.6rem;background:#ffffff;border:1px solid #eae8e0;border-radius:0.5rem;text-decoration:none;">Topic Hubs</a>
          <a href="/calculators" style="color:#1a1a1a;padding:0.3rem 0.6rem;background:#ffffff;border:1px solid #eae8e0;border-radius:0.5rem;text-decoration:none;">Calculators</a>
          <a href="/faq" style="color:#1a1a1a;padding:0.3rem 0.6rem;background:#ffffff;border:1px solid #eae8e0;border-radius:0.5rem;text-decoration:none;">FAQ</a>
          <a href="/glossary" style="color:#1a1a1a;padding:0.3rem 0.6rem;background:#ffffff;border:1px solid #eae8e0;border-radius:0.5rem;text-decoration:none;">Glossary</a>
          <a href="/guides" style="color:#1a1a1a;padding:0.3rem 0.6rem;background:#ffffff;border:1px solid #eae8e0;border-radius:0.5rem;text-decoration:none;">Guides</a>
          <a href="/about" style="color:#1a1a1a;padding:0.3rem 0.6rem;background:#ffffff;border:1px solid #eae8e0;border-radius:0.5rem;text-decoration:none;">About Us</a>
          <a href="/terms" style="color:#1a1a1a;padding:0.3rem 0.6rem;background:#ffffff;border:1px solid #eae8e0;border-radius:0.5rem;text-decoration:none;">Terms &amp; Conditions</a>
        </div>
      </nav>
    </header>
    <main>
      <h2 style="font-size:1.2rem;font-family:monospace;font-weight:600;margin-bottom:1.5rem;text-transform:uppercase;letter-spacing:0.05em;color:#292524;">
        Mutual Fund Research & Analysis
      </h2>
      <div style="display:flex;flex-direction:column;gap:1.5rem;">
        ${articles
          .map(
            (art) => `<article style="padding:1.5rem;background:#fbfaf8;border:1px solid #eae8e0;border-radius:0.75rem;">
              <div style="font-size:0.75rem;font-family:monospace;color:#047857;font-weight:600;margin-bottom:0.35rem;">
                ${escapeHtml(art.category)}
              </div>
              <h3 style="font-size:1.35rem;font-weight:600;margin-bottom:0.5rem;">
                <a href="/article/${encodeURIComponent(art.slug)}" style="color:#1a1a1a;text-decoration:underline;">${escapeHtml(art.title)}</a>
              </h3>
              <p style="font-size:0.95rem;color:#57534e;line-height:1.6;margin-bottom:0.75rem;">
                ${escapeHtml(art.excerpt)}
              </p>
              <div style="font-size:0.75rem;font-family:monospace;color:#78716c;">
                <span>Published: ${new Date(art.publishedAt).toLocaleDateString()}</span> • <span>${art.readTimeMinutes || 6} min read</span>
              </div>
            </article>`
          )
          .join("\n")}
      </div>
    </main>
  </div>`;

  modified = modified.replace('<div id="root"></div>', `<div id="root">${ssrBody}</div>`);
  return modified;
}

// -------------------------------------------------------------
// HTML Injection: About Us Page
// -------------------------------------------------------------
function injectAboutMeta(html: string): string {
  const title = "About Us | YieldNest – Independent Mutual Fund Research & Analytics";
  const description = "Learn about YieldNest.online: who we are, for whom this platform is built, why we exist, what we do, and how our independent AMFI-backed analytics help Indian mutual fund investors.";
  const url = "https://www.yieldnest.online/about";

  const schemaJson = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${url}#webpage`,
        "url": url,
        "name": title,
        "description": description,
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://www.yieldnest.online/#website",
          "name": "YieldNest.online",
          "url": "https://www.yieldnest.online",
        },
        "publisher": {
          "@type": "Organization",
          "name": "YieldNest.online",
          "url": "https://www.yieldnest.online",
        },
      },
    ],
  });

  let modified = html;
  modified = modified.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  modified = modified.replace(/<meta\s+name=["']description["'][\s\S]*?>/i, `<meta name="description" content="${description}" />`);
  modified = modified.replace(/<meta\s+property=["']og:title["'][\s\S]*?>/i, `<meta property="og:title" content="${title}" />`);
  modified = modified.replace(/<meta\s+property=["']og:description["'][\s\S]*?>/i, `<meta property="og:description" content="${description}" />`);
  modified = modified.replace(/<meta\s+property=["']og:url["'][\s\S]*?>/i, `<meta property="og:url" content="${url}" />`);
  modified = modified.replace(/<meta\s+name=["']twitter:title["'][\s\S]*?>/i, `<meta name="twitter:title" content="${title}" />`);
  modified = modified.replace(/<meta\s+name=["']twitter:description["'][\s\S]*?>/i, `<meta name="twitter:description" content="${description}" />`);

  const schemaScript = `\n    <script type="application/ld+json" id="server-structured-data">\n${schemaJson}\n    </script>\n  `;
  modified = modified.replace("</head>", `${schemaScript}</head>`);

  const ssrBody = `<div class="max-w-4xl mx-auto px-4 py-12 font-serif-editorial">
    <nav aria-label="Breadcrumb" style="font-size:0.75rem;font-family:monospace;margin-bottom:1.5rem;color:#78716c;">
      <a href="/" style="color:#44403c;text-decoration:underline;">Home</a> / <span style="color:#1c1917;">About Us</span>
    </nav>
    <header style="margin-bottom:2.5rem;border-bottom:1px solid #eae8e0;padding-bottom:1.5rem;">
      <h1 style="font-size:2.5rem;font-weight:700;line-height:1.2;color:#1a1a1a;margin-bottom:1rem;">About YieldNest</h1>
      <p style="font-size:1.15rem;color:#57534e;line-height:1.6;">
        Independent quantitative research, unbiased fund category comparisons, and free compounding calculators for Indian mutual fund investors.
      </p>
    </header>
    <article style="line-height:1.8;color:#292524;font-size:1rem;">
      <h2 style="font-size:1.5rem;margin-top:2rem;margin-bottom:0.75rem;">For Whom Is YieldNest Built?</h2>
      <p>YieldNest is designed for long-term retail and DIY investors in India who want institutional-grade analytical clarity without distributor spin or marketing hype. From beginners launching their first SIP to experienced wealth builders managing multi-crore portfolios, YieldNest provides objective data, rolling returns, and evidence-based guidance.</p>
      <h2 style="font-size:1.5rem;margin-top:2rem;margin-bottom:0.75rem;">Why Does YieldNest Exist?</h2>
      <p>Millions of Indian mutual fund investors remain in high-cost Regular plans, unknowingly losing 0.50% to 1.25% of their total wealth every year to distributor trail commissions. YieldNest was built to eliminate this wealth drain and provide conflict-free research backed by official AMFI and SEBI data disclosures.</p>
      <h2 style="font-size:1.5rem;margin-top:2rem;margin-bottom:0.75rem;">What We Do &amp; How We Help</h2>
      <p>We provide quantitative fund comparisons, 10-20-30 year expense ratio drag simulations, 7 client-side financial calculators, and jargon-free definitions for over 50 mutual fund terms.</p>
    </article>
  </div>`;

  modified = modified.replace('<div id="root"></div>', `<div id="root">${ssrBody}</div>`);
  return modified;
}

// -------------------------------------------------------------
// HTML Injection: Terms & Conditions Page
// -------------------------------------------------------------
function injectTermsMeta(html: string): string {
  const title = "Terms & Conditions | YieldNest.online";
  const description = "Official terms of use, legal notices, SEBI statutory disclaimers, and user agreements for YieldNest.online educational research platform.";
  const url = "https://www.yieldnest.online/terms";

  let modified = html;
  modified = modified.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  modified = modified.replace(/<meta\s+name=["']description["'][\s\S]*?>/i, `<meta name="description" content="${description}" />`);
  modified = modified.replace(/<meta\s+property=["']og:title["'][\s\S]*?>/i, `<meta property="og:title" content="${title}" />`);
  modified = modified.replace(/<meta\s+property=["']og:description["'][\s\S]*?>/i, `<meta property="og:description" content="${description}" />`);
  modified = modified.replace(/<meta\s+property=["']og:url["'][\s\S]*?>/i, `<meta property="og:url" content="${url}" />`);

  const ssrBody = `<div class="max-w-4xl mx-auto px-4 py-12 font-serif-editorial">
    <nav aria-label="Breadcrumb" style="font-size:0.75rem;font-family:monospace;margin-bottom:1.5rem;color:#78716c;">
      <a href="/" style="color:#44403c;text-decoration:underline;">Home</a> / <span style="color:#1c1917;">Terms &amp; Conditions</span>
    </nav>
    <header style="margin-bottom:2.5rem;border-bottom:1px solid #eae8e0;padding-bottom:1.5rem;">
      <h1 style="font-size:2.5rem;font-weight:700;line-height:1.2;color:#1a1a1a;margin-bottom:1rem;">Terms &amp; Conditions of Use</h1>
      <p style="font-size:1.1rem;color:#57534e;line-height:1.6;">
        YieldNest.online is an educational, analytical, and informational platform. We are not registered with SEBI as an Investment Adviser, Research Analyst, or Portfolio Manager.
      </p>
    </header>
    <article style="line-height:1.8;color:#292524;font-size:1rem;">
      <p>Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing. Past performance is strictly illustrative and does not guarantee future returns.</p>
    </article>
  </div>`;

  modified = modified.replace('<div id="root"></div>', `<div id="root">${ssrBody}</div>`);
  return modified;
}

// -------------------------------------------------------------
// HTML Injection: Clean 404 (Soft 404 Prevention for Search Console)
// -------------------------------------------------------------
function renderNotFoundHtml(html: string, attemptedUrl: string): string {
  const title = "404 - Page Not Found | YieldNest.online";
  const description = "The requested research article or category was not found on YieldNest.online.";

  let modified = html;
  modified = modified.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  modified = modified.replace(/<meta\s+name=["']description["'][\s\S]*?>/i, `<meta name="description" content="${description}" />`);
  modified = modified.replace(/<meta\s+name=["']robots["'][\s\S]*?>/i, `<meta name="robots" content="noindex, follow" />`);
  if (!modified.includes('content="noindex, follow"')) {
    modified = modified.replace("</head>", '<meta name="robots" content="noindex, follow" />\n</head>');
  }

  const ssrBody = `<div class="max-w-xl mx-auto px-4 py-16 text-center font-serif-editorial">
    <div style="font-family:monospace;font-size:3rem;font-weight:700;color:#dc2626;margin-bottom:0.5rem;">404</div>
    <h1 style="font-size:1.8rem;font-weight:700;color:#1c1917;margin-bottom:1rem;">Page Not Found</h1>
    <p style="font-size:1rem;color:#57534e;margin-bottom:1.5rem;line-height:1.6;">
      The URL <code style="background:#eae8e0;padding:0.2rem 0.4rem;border-radius:0.25rem;font-size:0.85em;">${escapeHtml(attemptedUrl)}</code> could not be found or may have been updated.
    </p>
    <div style="display:flex;justify-content:center;gap:1rem;font-size:0.85rem;font-family:monospace;">
      <a href="/" style="background:#1c1917;color:#ffffff;padding:0.5rem 1rem;border-radius:0.5rem;text-decoration:none;">Return to Homepage</a>
      <a href="/sitemap.xml" style="background:#eae8e0;color:#1c1917;padding:0.5rem 1rem;border-radius:0.5rem;text-decoration:none;">Browse Sitemap</a>
    </div>
  </div>`;

  modified = modified.replace('<div id="root"></div>', `<div id="root">${ssrBody}</div>`);
  return modified;
}

// -------------------------------------------------------------
// Routing & Server Setup
// -------------------------------------------------------------
const KNOWN_SPA_PREFIXES = [
  "/toolkit",
  "/tools",
  "/features",
  "/all-features",
  "/all-tools",
  "/calculators",
  "/calculator",
  "/calculator-suite",
  "/calculators-suite",
  "/faq",
  "/glossary",
  "/guides",
  "/guide",
  "/how-to-choose-a-mutual-fund",
  "/redemption-checklist",
  "/hubs",
  "/topics",
  "/hub",
  "/topic",
  "/about",
  "/about-us",
  "/terms",
  "/terms-and-conditions",
  "/terms-of-use",
  "/terms-of-service",
  "/admin",
  "/category",
  "/article",
];

function setupProductionRoutes() {
  const distPath = path.join(__dirname, "dist");
  const indexPath = path.join(distPath, "index.html");

  // 1. Homepage SSR
  app.get("/", async (_req, res, next) => {
    try {
      if (!fs.existsSync(indexPath)) return next();
      const articles = await getPublishedArticlesList();
      let html = fs.readFileSync(indexPath, "utf-8");
      html = injectHomepageMeta(html, articles);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(html);
    } catch (err) {
      return next(err);
    }
  });

  // 2. Category SSR
  app.get("/category/:categorySlug", async (req, res, next) => {
    try {
      if (!fs.existsSync(indexPath)) return next();
      const catSlug = req.params.categorySlug.toLowerCase();
      let html = fs.readFileSync(indexPath, "utf-8");

      if (!CATEGORY_META[catSlug]) {
        html = renderNotFoundHtml(html, req.originalUrl);
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        return res.status(404).send(html);
      }

      const articles = await getPublishedArticlesList();
      html = injectCategoryMeta(html, catSlug, articles);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(html);
    } catch (err) {
      return next(err);
    }
  });

  // 3. Article SSR
  app.get("/article/:slug", async (req, res, next) => {
    try {
      if (!fs.existsSync(indexPath)) return next();
      const slug = req.params.slug;
      const alias = LEGACY_ALIASES.find((a) => a.sourceSlug === slug);
      if (alias) {
        return res.redirect(301, `/article/${alias.targetSlug}`);
      }

      const articles = await getPublishedArticlesList();
      const article = articles.find((a) => a.slug === slug);
      let html = fs.readFileSync(indexPath, "utf-8");

      if (!article) {
        html = renderNotFoundHtml(html, req.originalUrl);
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        return res.status(404).send(html);
      }

      html = injectArticleMeta(html, article);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(html);
    } catch (err) {
      return next(err);
    }
  });

  // 4. About Us SSR
  app.get(["/about", "/about-us"], async (_req, res, next) => {
    try {
      if (!fs.existsSync(indexPath)) return next();
      let html = fs.readFileSync(indexPath, "utf-8");
      html = injectAboutMeta(html);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(html);
    } catch (err) {
      return next(err);
    }
  });

  // 5. Terms & Conditions SSR
  app.get(["/terms", "/terms-and-conditions", "/terms-of-use", "/terms-of-service"], async (_req, res, next) => {
    try {
      if (!fs.existsSync(indexPath)) return next();
      let html = fs.readFileSync(indexPath, "utf-8");
      html = injectTermsMeta(html);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(html);
    } catch (err) {
      return next(err);
    }
  });

  // 6. Investor Toolkit & Features Directory SSR
  app.get(["/toolkit", "/tools", "/features", "/all-features", "/all-tools"], async (_req, res, next) => {
    try {
      if (!fs.existsSync(indexPath)) return next();
      let html = fs.readFileSync(indexPath, "utf-8");
      html = injectToolkitDirectoryPage(html);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(html);
    } catch (err) {
      return next(err);
    }
  });

  app.use(express.static(distPath));

  app.get("*", (req, res) => {
    const isKnownRoute =
      req.path === "/" ||
      KNOWN_SPA_PREFIXES.some((prefix) => req.path === prefix || req.path.startsWith(`${prefix}/`));

    if (isKnownRoute && fs.existsSync(indexPath)) {
      return res.sendFile(indexPath);
    }

    // Real 404 for unknown routes
    let html = "";
    if (fs.existsSync(indexPath)) {
      html = fs.readFileSync(indexPath, "utf-8");
    } else {
      const notFoundFile = path.join(__dirname, "public", "404.html");
      html = fs.existsSync(notFoundFile) ? fs.readFileSync(notFoundFile, "utf-8") : "<h1>404 - Page Not Found</h1>";
    }
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(404).send(renderNotFoundHtml(html, req.originalUrl));
  });
}

async function startDevServer() {
  const { createServer: createViteServer } = await import("vite");
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });

  // 1. Homepage SSR
  app.get("/", async (req, res, next) => {
    try {
      const articles = await getPublishedArticlesList();
      const indexHtmlPath = path.join(__dirname, "index.html");
      let html = fs.readFileSync(indexHtmlPath, "utf-8");
      html = injectHomepageMeta(html, articles);
      html = await vite.transformIndexHtml(req.originalUrl, html);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(html);
    } catch (err) {
      return next(err);
    }
  });

  // 2. Category SSR
  app.get("/category/:categorySlug", async (req, res, next) => {
    try {
      const catSlug = req.params.categorySlug.toLowerCase();
      const indexHtmlPath = path.join(__dirname, "index.html");
      let html = fs.readFileSync(indexHtmlPath, "utf-8");

      if (!CATEGORY_META[catSlug]) {
        html = renderNotFoundHtml(html, req.originalUrl);
        html = await vite.transformIndexHtml(req.originalUrl, html);
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        return res.status(404).send(html);
      }

      const articles = await getPublishedArticlesList();
      html = injectCategoryMeta(html, catSlug, articles);
      html = await vite.transformIndexHtml(req.originalUrl, html);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(html);
    } catch (err) {
      return next(err);
    }
  });

  // 3. Article SSR
  app.get("/article/:slug", async (req, res, next) => {
    try {
      const slug = req.params.slug;
      const alias = LEGACY_ALIASES.find((a) => a.sourceSlug === slug);
      if (alias) {
        return res.redirect(301, `/article/${alias.targetSlug}`);
      }

      const articles = await getPublishedArticlesList();
      const article = articles.find((a) => a.slug === slug);
      const indexHtmlPath = path.join(__dirname, "index.html");
      let html = fs.readFileSync(indexHtmlPath, "utf-8");

      if (!article) {
        html = renderNotFoundHtml(html, req.originalUrl);
        html = await vite.transformIndexHtml(req.originalUrl, html);
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        return res.status(404).send(html);
      }

      html = injectArticleMeta(html, article);
      html = await vite.transformIndexHtml(req.originalUrl, html);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(html);
    } catch (err) {
      return next(err);
    }
  });

  // 4. About Us SSR
  app.get(["/about", "/about-us"], async (req, res, next) => {
    try {
      const indexHtmlPath = path.join(__dirname, "index.html");
      let html = fs.readFileSync(indexHtmlPath, "utf-8");
      html = injectAboutMeta(html);
      html = await vite.transformIndexHtml(req.originalUrl, html);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(html);
    } catch (err) {
      return next(err);
    }
  });

  // 5. Terms & Conditions SSR
  app.get(["/terms", "/terms-and-conditions", "/terms-of-use", "/terms-of-service"], async (req, res, next) => {
    try {
      const indexHtmlPath = path.join(__dirname, "index.html");
      let html = fs.readFileSync(indexHtmlPath, "utf-8");
      html = injectTermsMeta(html);
      html = await vite.transformIndexHtml(req.originalUrl, html);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(html);
    } catch (err) {
      return next(err);
    }
  });

  // 6. Investor Toolkit & Features Directory SSR
  app.get(["/toolkit", "/tools", "/features", "/all-features", "/all-tools"], async (req, res, next) => {
    try {
      const indexHtmlPath = path.join(__dirname, "index.html");
      let html = fs.readFileSync(indexHtmlPath, "utf-8");
      html = injectToolkitDirectoryPage(html);
      html = await vite.transformIndexHtml(req.originalUrl, html);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(html);
    } catch (err) {
      return next(err);
    }
  });

  // 7. Real 404 for unknown HTML routes in development (Prevents Soft 404s)
  app.use(async (req, res, next) => {
    if (req.method !== "GET") return next();
    if (
      req.path.startsWith("/@") ||
      req.path.startsWith("/src") ||
      req.path.startsWith("/node_modules") ||
      req.path.startsWith("/api") ||
      req.path.includes(".")
    ) {
      return next();
    }

    const isKnownRoute =
      req.path === "/" ||
      KNOWN_SPA_PREFIXES.some((prefix) => req.path === prefix || req.path.startsWith(`${prefix}/`));

    if (isKnownRoute) {
      return next();
    }

    try {
      const indexHtmlPath = path.join(__dirname, "index.html");
      let html = fs.readFileSync(indexHtmlPath, "utf-8");
      html = renderNotFoundHtml(html, req.originalUrl);
      html = await vite.transformIndexHtml(req.originalUrl, html);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(404).send(html);
    } catch (err) {
      return next(err);
    }
  });

  app.use(vite.middlewares);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Development server running on http://localhost:${PORT}`);
  });
}

// Only call app.listen and Vite middleware when not running on Vercel (process.env.VERCEL unset)
if (!process.env.VERCEL) {
  // Sync static sitemap and llms.txt on launch
  syncStaticSitemapAndLlms().catch((err) => console.warn("Initial sitemap sync error:", err));

  if (process.env.NODE_ENV === "production") {
    setupProductionRoutes();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Production server running on port ${PORT}`);
    });
  } else {
    startDevServer();
  }
} else {
  // On Vercel: mount production SSR and static routes, export app without calling app.listen or Vite
  setupProductionRoutes();
}

export default app;

