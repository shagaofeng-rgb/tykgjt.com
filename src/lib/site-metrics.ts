import { list, put } from "@vercel/blob";

const METRIC_PREFIX = "metrics/";

type MetricPoint = { date: string; path: string; visitorId: string };
export type VisitStats = {
  todayPageViews: number;
  thirtyDayPageViews: number;
  thirtyDayVisitors: number;
  daily: Array<{ date: string; pageViews: number; visitors: number }>;
  routes: Array<{ path: string; pageViews: number }>;
};

function getBlobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN;
}

export async function recordPageView(path: string, visitorId: string) {
  const token = getBlobToken();
  if (!token) return;
  const date = new Date().toISOString().slice(0, 10);
  const safeVisitor = visitorId.replace(/[^a-zA-Z0-9-]/g, "").slice(0, 48);
  if (!safeVisitor) return;
  await put(`${METRIC_PREFIX}${date}/${safeVisitor}-${Date.now()}-${crypto.randomUUID().slice(0, 6)}.json`, JSON.stringify({ path, visitorId: safeVisitor }), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json; charset=utf-8",
    token,
  });
}

function metricFromPath(pathname: string): MetricPoint | null {
  const match = pathname.match(/^metrics\/(\d{4}-\d{2}-\d{2})\/([A-Za-z0-9-]+)-\d+-[A-Za-z0-9-]+\.json$/);
  if (!match) return null;
  return { date: match[1], visitorId: match[2], path: "" };
}

export async function getVisitStats(): Promise<VisitStats> {
  const empty: VisitStats = { todayPageViews: 0, thirtyDayPageViews: 0, thirtyDayVisitors: 0, daily: [], routes: [] };
  const token = getBlobToken();
  if (!token) return empty;
  try {
    const { blobs } = await list({ prefix: METRIC_PREFIX, limit: 1000, token });
    const since = new Date();
    since.setUTCDate(since.getUTCDate() - 29);
    const sinceDay = since.toISOString().slice(0, 10);
    const today = new Date().toISOString().slice(0, 10);
    const filtered = blobs.map((blob) => ({ blob, metric: metricFromPath(blob.pathname) })).filter((item): item is { blob: typeof blobs[number]; metric: MetricPoint } => Boolean(item.metric && item.metric.date >= sinceDay));
    const pointValues = await Promise.all(filtered.map(async ({ blob, metric }) => {
      try {
        const response = await fetch(blob.url, { cache: "no-store" });
        const body: unknown = await response.json();
        const path = body && typeof body === "object" && typeof (body as { path?: unknown }).path === "string" ? (body as { path: string }).path : "/";
        return { ...metric, path };
      } catch { return metric; }
    }));
    const dailyMap = new Map<string, { pageViews: number; visitors: Set<string> }>();
    const routeMap = new Map<string, number>();
    const visitors = new Set<string>();
    for (const point of pointValues) {
      visitors.add(point.visitorId);
      const entry = dailyMap.get(point.date) ?? { pageViews: 0, visitors: new Set<string>() };
      entry.pageViews += 1;
      entry.visitors.add(point.visitorId);
      dailyMap.set(point.date, entry);
      routeMap.set(point.path, (routeMap.get(point.path) ?? 0) + 1);
    }
    return {
      todayPageViews: dailyMap.get(today)?.pageViews ?? 0,
      thirtyDayPageViews: pointValues.length,
      thirtyDayVisitors: visitors.size,
      daily: [...dailyMap.entries()].map(([date, item]) => ({ date, pageViews: item.pageViews, visitors: item.visitors.size })).sort((a, b) => b.date.localeCompare(a.date)),
      routes: [...routeMap.entries()].map(([path, pageViews]) => ({ path, pageViews })).sort((a, b) => b.pageViews - a.pageViews).slice(0, 8),
    };
  } catch { return empty; }
}
