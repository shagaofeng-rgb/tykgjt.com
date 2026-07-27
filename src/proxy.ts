import { NextResponse, type NextRequest } from "next/server";

// 外部发布平台的自定义 Webhook 配置只接收“域名”，
// 验证及发布请求会直接 POST 到网站根路径。将该请求转发到实际接口，
// 同时保留原始的 application/x-www-form-urlencoded 请求体。
export function proxy(request: NextRequest) {
  if (request.method === "POST" && request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/api/webhook/send_article", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
