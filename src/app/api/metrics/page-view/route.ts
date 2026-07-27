import { NextResponse } from "next/server";
import { recordPageView } from "@/lib/site-metrics";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { path?: unknown; visitorId?: unknown };
    const path = typeof body.path === "string" ? body.path : "";
    const visitorId = typeof body.visitorId === "string" ? body.visitorId : "";
    if (!path.startsWith("/") || path.length > 180 || !/^[a-zA-Z0-9/-]+$/.test(visitorId)) return new NextResponse(null, { status: 204 });
    await recordPageView(path, visitorId);
  } catch { /* analytics must never impact the visitor experience */ }
  return new NextResponse(null, { status: 204 });
}
