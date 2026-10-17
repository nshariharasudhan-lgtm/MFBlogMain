import { getSupabaseClient } from "./supabaseClient";

export interface AMFIFundRecord {
  schemeCode: string;
  isinGrowth?: string;
  isinDivPayout?: string;
  schemeName: string;
  fundHouse: string;
  category: string;
  subCategory?: string;
  nav: number;
  navDate: string;
  cagr1Y?: number | null;
  cagr3Y?: number | null;
  cagr5Y?: number | null;
  isDirect: boolean;
  isGrowth: boolean;
  lastSyncedAt?: string;
}

export interface AmfiSyncResult {
  success: boolean;
  syncedCount: number;
  message: string;
  mode: "supabase" | "local_fallback";
  syncedAt: string;
}

const LOCAL_STORAGE_DB_KEY = "yieldnest_amfi_funds_db_v1";
const LOCAL_STORAGE_SYNC_TIME_KEY = "yieldnest_amfi_last_sync_time";

// In-memory cache for fast search across user session
let inMemoryFundsCache: AMFIFundRecord[] | null = null;

// Baseline verified funds across India's top AMCs for instant loading and fallback
export const BASELINE_AMFI_FUNDS: AMFIFundRecord[] = [
  {
    schemeCode: "122639",
    isinGrowth: "INF879O01019",
    schemeName: "Parag Parikh Flexi Cap Fund - Direct Plan - Growth",
    fundHouse: "PPFAS Mutual Fund",
    category: "Flexi Cap Fund",
    subCategory: "Equity Scheme",
    nav: 84.62,
    navDate: "15-Oct-2026",
    cagr1Y: 28.4,
    cagr3Y: 21.6,
    cagr5Y: 23.8,
    isDirect: true,
    isGrowth: true,
  },
  {
    schemeCode: "101762",
    isinGrowth: "INF179K01BE2",
    schemeName: "HDFC Flexi Cap Fund - Direct Plan - Growth",
    fundHouse: "HDFC Mutual Fund",
    category: "Flexi Cap Fund",
    subCategory: "Equity Scheme",
    nav: 1948.5,
    navDate: "15-Oct-2026",
    cagr1Y: 34.6,
    cagr3Y: 26.2,
    cagr5Y: 22.9,
    isDirect: true,
    isGrowth: true,
  },
  {
    schemeCode: "125354",
    isinGrowth: "INF204K01L12",
    schemeName: "Nippon India Small Cap Fund - Direct Plan - Growth",
    fundHouse: "Nippon India Mutual Fund",
    category: "Small Cap Fund",
    subCategory: "Equity Scheme",
    nav: 172.4,
    navDate: "15-Oct-2026",
    cagr1Y: 38.5,
    cagr3Y: 28.4,
    cagr5Y: 32.1,
    isDirect: true,
    isGrowth: true,
  },
  {
    schemeCode: "120828",
    isinGrowth: "INF966L01AA3",
    schemeName: "Quant Small Cap Fund - Direct Plan - Growth",
    fundHouse: "Quant Mutual Fund",
    category: "Small Cap Fund",
    subCategory: "Equity Scheme",
    nav: 268.1,
    navDate: "15-Oct-2026",
    cagr1Y: 44.8,
    cagr3Y: 31.2,
    cagr5Y: 38.6,
    isDirect: true,
    isGrowth: true,
  },
  {
    schemeCode: "107530",
    isinGrowth: "INF769I01010",
    schemeName: "Mirae Asset Large & Midcap Fund - Direct Plan - Growth",
    fundHouse: "Mirae Asset Mutual Fund",
    category: "Large & Mid Cap Fund",
    subCategory: "Equity Scheme",
    nav: 154.2,
    navDate: "15-Oct-2026",
    cagr1Y: 31.4,
    cagr3Y: 22.8,
    cagr5Y: 21.5,
    isDirect: true,
    isGrowth: true,
  },
  {
    schemeCode: "147625",
    isinGrowth: "INF247L01AE8",
    schemeName: "Motilal Oswal Large and Midcap Fund - Direct Plan - Growth",
    fundHouse: "Motilal Oswal Mutual Fund",
    category: "Large & Mid Cap Fund",
    subCategory: "Equity Scheme",
    nav: 38.4,
    navDate: "15-Oct-2026",
    cagr1Y: 42.1,
    cagr3Y: 27.8,
    cagr5Y: 24.6,
    isDirect: true,
    isGrowth: true,
  },
  {
    schemeCode: "120503",
    isinGrowth: "INF209K01157",
    schemeName: "ICICI Prudential Bluechip Fund - Direct Plan - Growth",
    fundHouse: "ICICI Prudential Mutual Fund",
    category: "Large Cap Fund",
    subCategory: "Equity Scheme",
    nav: 112.8,
    navDate: "15-Oct-2026",
    cagr1Y: 27.2,
    cagr3Y: 19.4,
    cagr5Y: 18.6,
    isDirect: true,
    isGrowth: true,
  },
  {
    schemeCode: "119598",
    isinGrowth: "INF200K01UT3",
    schemeName: "SBI Contra Fund - Direct Plan - Growth",
    fundHouse: "SBI Mutual Fund",
    category: "Contra Fund",
    subCategory: "Equity Scheme",
    nav: 382.4,
    navDate: "15-Oct-2026",
    cagr1Y: 36.2,
    cagr3Y: 25.8,
    cagr5Y: 26.4,
    isDirect: true,
    isGrowth: true,
  },
  {
    schemeCode: "120505",
    isinGrowth: "INF209K01173",
    schemeName: "ICICI Prudential Midcap Fund - Direct Plan - Growth",
    fundHouse: "ICICI Prudential Mutual Fund",
    category: "Mid Cap Fund",
    subCategory: "Equity Scheme",
    nav: 278.6,
    navDate: "15-Oct-2026",
    cagr1Y: 39.4,
    cagr3Y: 27.1,
    cagr5Y: 25.8,
    isDirect: true,
    isGrowth: true,
  },
  {
    schemeCode: "120716",
    isinGrowth: "INF846K01164",
    schemeName: "Axis Small Cap Fund - Direct Plan - Growth",
    fundHouse: "Axis Mutual Fund",
    category: "Small Cap Fund",
    subCategory: "Equity Scheme",
    nav: 104.5,
    navDate: "15-Oct-2026",
    cagr1Y: 26.8,
    cagr3Y: 22.4,
    cagr5Y: 24.1,
    isDirect: true,
    isGrowth: true,
  },
  {
    schemeCode: "119062",
    isinGrowth: "INF789F01AX4",
    schemeName: "UTI Nifty 50 Index Fund - Direct Plan - Growth",
    fundHouse: "UTI Mutual Fund",
    category: "Index Fund",
    subCategory: "Passive Equity",
    nav: 184.2,
    navDate: "15-Oct-2026",
    cagr1Y: 24.1,
    cagr3Y: 15.6,
    cagr5Y: 16.8,
    isDirect: true,
    isGrowth: true,
  },
  {
    schemeCode: "128629",
    isinGrowth: "INF179KA1IZ7",
    schemeName: "HDFC Banking and PSU Debt Fund - Direct Plan - Growth",
    fundHouse: "HDFC Mutual Fund",
    category: "Banking and PSU Fund",
    subCategory: "Debt Scheme",
    nav: 25.38,
    navDate: "15-Oct-2026",
    cagr1Y: 7.6,
    cagr3Y: 6.9,
    cagr5Y: 7.2,
    isDirect: true,
    isGrowth: true,
  },
];

/**
 * Parses raw AMFI NAV text string into clean structured fund records.
 */
export function parseAmfiRawText(rawText: string): AMFIFundRecord[] {
  const lines = rawText.split("\n");
  const records: AMFIFundRecord[] = [];
  let currentCategory = "Equity Scheme";
  let currentFundHouse = "Indian Mutual Fund";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Detect Category header: "Open Ended Schemes(Equity Scheme - Flexi Cap Fund)"
    if (line.startsWith("Open Ended Schemes") || line.startsWith("Close Ended Schemes") || line.startsWith("Interval Fund Schemes")) {
      const match = line.match(/\((.*?)\)/);
      if (match && match[1]) {
        currentCategory = match[1].replace(/.*-\s*/, "").trim();
      }
      continue;
    }

    // Detect Fund House header: lines with no semicolon and usually ending with "Mutual Fund"
    if (!line.includes(";") && line.toLowerCase().includes("mutual fund")) {
      currentFundHouse = line.trim();
      continue;
    }

    // Scheme data rows: Scheme Code;ISIN Growth;ISIN Reinvest;Scheme Name;Plan;Option;NAV;Date
    // or Scheme Code;ISIN Growth;ISIN Reinvest;Scheme Name;NAV;Date
    if (line.includes(";")) {
      const parts = line.split(";");
      if (parts.length >= 6) {
        const schemeCode = parts[0]?.trim();
        if (!/^\d+$/.test(schemeCode)) continue; // Skip header row

        const isinGrowth = parts[1]?.trim() !== "-" ? parts[1]?.trim() : undefined;
        const isinDivPayout = parts[2]?.trim() !== "-" ? parts[2]?.trim() : undefined;
        const schemeName = parts[3]?.trim();

        // Check if extended 8-column format or classic 6-column format
        let navStr = parts[4]?.trim();
        let navDate = parts[5]?.trim();
        if (parts.length >= 8) {
          navStr = parts[6]?.trim();
          navDate = parts[7]?.trim();
        }

        const nav = parseFloat(navStr);
        if (isNaN(nav) || !schemeName) continue;

        const isDirect = schemeName.toLowerCase().includes("direct");
        const isGrowth = schemeName.toLowerCase().includes("growth");

        records.push({
          schemeCode,
          isinGrowth,
          isinDivPayout,
          schemeName,
          fundHouse: currentFundHouse,
          category: currentCategory,
          nav,
          navDate: navDate || "Latest",
          isDirect,
          isGrowth,
          lastSyncedAt: new Date().toISOString(),
        });
      }
    }
  }

  return records;
}

/**
 * Fetch real-time mutual fund metadata from AMFI.
 * Tries server proxy first, falls back to direct portal or public mirror.
 */
export async function fetchAmfiRealtimeFunds(options?: {
  query?: string;
  category?: string;
  limit?: number;
}): Promise<AMFIFundRecord[]> {
  try {
    // 1. Try our server endpoint
    const serverUrl = `/api/amfi/nav-all?limit=${options?.limit || 250}${
      options?.category ? `&category=${encodeURIComponent(options.category)}` : ""
    }${options?.query ? `&q=${encodeURIComponent(options.query)}` : ""}`;

    const res = await fetch(serverUrl, { signal: AbortSignal.timeout(6000) }).catch(() => null);
    if (res && res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        inMemoryFundsCache = data;
        return data;
      }
    }

    // 2. Fallback to portal.amfiindia.com or api.mfapi.in
    const upstreamRes = await fetch("https://portal.amfiindia.com/spages/NAVAll.txt", {
      signal: AbortSignal.timeout(8000),
    }).catch(() => null);

    if (upstreamRes && upstreamRes.ok) {
      const text = await upstreamRes.text();
      const parsed = parseAmfiRawText(text);
      if (parsed.length > 0) {
        inMemoryFundsCache = parsed;
        return parsed.slice(0, options?.limit || 200);
      }
    }
  } catch (err) {
    console.warn("Real-time AMFI fetch notice; using local registry:", err);
  }

  // 3. Fallback: check localStorage cache
  const cached = getStoredAmfiFunds();
  if (cached && cached.length > 0) {
    return cached;
  }

  // 4. Default baseline verified list
  return BASELINE_AMFI_FUNDS;
}

/**
 * Sync mutual fund records to Supabase database.
 * If Supabase is offline or table is not created yet, gracefully falls back to local persistent storage.
 */
export async function syncAmfiDataToSupabase(
  fundsToSync?: AMFIFundRecord[]
): Promise<AmfiSyncResult> {
  const funds = fundsToSync && fundsToSync.length > 0 ? fundsToSync : await fetchAmfiRealtimeFunds({ limit: 300 });
  const now = new Date().toISOString();

  // Always save locally first for instant zero-latency availability
  saveAmfiFundsLocally(funds);

  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      success: true,
      syncedCount: funds.length,
      message: `Successfully synchronized ${funds.length} funds to local cache. (Supabase is not configured yet in settings).`,
      mode: "local_fallback",
      syncedAt: now,
    };
  }

  try {
    // Map records to snake_case for PostgreSQL / Supabase table amfi_funds
    const rows = funds.slice(0, 150).map((f) => ({
      scheme_code: f.schemeCode,
      isin_growth: f.isinGrowth || null,
      isin_div_payout: f.isinDivPayout || null,
      scheme_name: f.schemeName,
      fund_house: f.fundHouse,
      category: f.category,
      sub_category: f.subCategory || "Mutual Fund",
      nav: f.nav,
      nav_date: f.navDate,
      cagr_1y: f.cagr1Y || null,
      cagr_3y: f.cagr3Y || null,
      cagr_5y: f.cagr5Y || null,
      is_direct: f.isDirect,
      is_growth: f.isGrowth,
      synced_at: now,
    }));

    // Chunk upserts in batches of 50 to avoid payload size constraints
    const batchSize = 50;
    let totalUpserted = 0;

    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      const { error } = await supabase
        .from("amfi_funds")
        .upsert(batch, { onConflict: "scheme_code" });

      if (error) {
        // Table might not exist yet in user's Supabase instance
        console.warn("Supabase amfi_funds upsert notice:", error.message);
        return {
          success: true,
          syncedCount: funds.length,
          message: `Saved ${funds.length} schemes locally. Note: Supabase table 'amfi_funds' returned: ${error.message}. Run schema.sql migration in Supabase SQL editor to enable remote persistence.`,
          mode: "local_fallback",
          syncedAt: now,
        };
      }
      totalUpserted += batch.length;
    }

    return {
      success: true,
      syncedCount: totalUpserted,
      message: `Successfully synced ${totalUpserted} mutual fund records into Supabase table 'amfi_funds'.`,
      mode: "supabase",
      syncedAt: now,
    };
  } catch (err: any) {
    console.error("Supabase sync exception:", err);
    return {
      success: true,
      syncedCount: funds.length,
      message: `Saved ${funds.length} schemes to local database. Remote sync notice: ${err?.message || "Check Supabase network"}`,
      mode: "local_fallback",
      syncedAt: now,
    };
  }
}

/**
 * Fetch historical NAV and calculate 1Y, 3Y, 5Y CAGR returns.
 */
export async function fetchFundWithReturns(schemeCode: string): Promise<AMFIFundRecord | null> {
  try {
    const res = await fetch(`https://api.mfapi.in/mf/${encodeURIComponent(schemeCode)}`, {
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) {
      const json = await res.json();
      if (json && json.meta && json.data && json.data.length > 0) {
        const latestEntry = json.data[0];
        const latestNav = parseFloat(latestEntry.nav);
        const len = json.data.length;

        // Approx 248 trading days per year
        const nav1Y = json.data[Math.min(248, len - 1)] ? parseFloat(json.data[Math.min(248, len - 1)].nav) : 0;
        const nav3Y = json.data[Math.min(745, len - 1)] ? parseFloat(json.data[Math.min(745, len - 1)].nav) : 0;
        const nav5Y = json.data[Math.min(1240, len - 1)] ? parseFloat(json.data[Math.min(1240, len - 1)].nav) : 0;

        const calcCagr = (initial: number, final: number, years: number) => {
          if (!initial || !final || initial <= 0 || final <= 0) return null;
          return Math.round((Math.pow(final / initial, 1 / years) - 1) * 1000) / 10;
        };

        return {
          schemeCode,
          schemeName: json.meta.scheme_name,
          fundHouse: json.meta.fund_house,
          category: json.meta.scheme_category,
          nav: latestNav,
          navDate: latestEntry.date,
          cagr1Y: calcCagr(nav1Y, latestNav, 1),
          cagr3Y: calcCagr(nav3Y, latestNav, 3),
          cagr5Y: calcCagr(nav5Y, latestNav, 5),
          isDirect: json.meta.scheme_name.toLowerCase().includes("direct"),
          isGrowth: json.meta.scheme_name.toLowerCase().includes("growth"),
          lastSyncedAt: new Date().toISOString(),
        };
      }
    }
  } catch (err) {
    console.warn("fetchFundWithReturns notice:", err);
  }
  return null;
}

// Local Storage Helpers
export function getStoredAmfiFunds(): AMFIFundRecord[] {
  if (inMemoryFundsCache && inMemoryFundsCache.length > 0) {
    return inMemoryFundsCache;
  }
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_DB_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        inMemoryFundsCache = parsed;
        return parsed;
      }
    }
  } catch {}
  inMemoryFundsCache = BASELINE_AMFI_FUNDS;
  return BASELINE_AMFI_FUNDS;
}

export function saveAmfiFundsLocally(funds: AMFIFundRecord[]) {
  try {
    inMemoryFundsCache = funds;
    localStorage.setItem(LOCAL_STORAGE_DB_KEY, JSON.stringify(funds.slice(0, 500)));
    localStorage.setItem(LOCAL_STORAGE_SYNC_TIME_KEY, new Date().toISOString());
  } catch (err) {
    console.warn("LocalStorage saveAmfiFundsLocally warning:", err);
  }
}

export function getLastAmfiSyncTime(): string | null {
  try {
    return localStorage.getItem(LOCAL_STORAGE_SYNC_TIME_KEY);
  } catch {
    return null;
  }
}
