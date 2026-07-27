"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function PageViewTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    const key = "tykgjt_visitor_id";
    let visitorId = sessionStorage.getItem(key);
    if (!visitorId) { visitorId = crypto.randomUUID(); sessionStorage.setItem(key, visitorId); }
    void fetch("/api/metrics/page-view", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ path: pathname, visitorId }), keepalive: true });
  }, [pathname]);
  return null;
}
