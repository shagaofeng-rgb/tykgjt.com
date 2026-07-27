import { NextResponse } from "next/server";
import { adminCookieName, authenticateAdmin, createAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { email?: unknown; password?: unknown };
    const email = typeof body.email === "string" ? body.email : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (!email || !password) return NextResponse.json({ message: "请输入邮箱和密码" }, { status: 400 });
    if (!(await authenticateAdmin(email, password))) return NextResponse.json({ message: "邮箱或密码不正确" }, { status: 401 });
    const response = NextResponse.json({ message: "登录成功" });
    response.cookies.set(adminCookieName(), createAdminSession(email.trim().toLowerCase()), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 12 });
    return response;
  } catch {
    return NextResponse.json({ message: "后台服务配置异常，请联系技术人员" }, { status: 500 });
  }
}
