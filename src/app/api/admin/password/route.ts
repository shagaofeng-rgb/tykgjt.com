import { NextResponse } from "next/server";
import { adminCookieName, changeAdminPassword, verifyAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = verifyAdminSession(request.headers.get("cookie")?.split(";").map((item) => item.trim()).find((item) => item.startsWith(`${adminCookieName()}=`))?.slice(adminCookieName().length + 1));
  if (!session) return NextResponse.json({ message: "登录已过期，请重新登录" }, { status: 401 });
  try {
    const body = await request.json() as { currentPassword?: unknown; nextPassword?: unknown };
    const currentPassword = typeof body.currentPassword === "string" ? body.currentPassword : "";
    const nextPassword = typeof body.nextPassword === "string" ? body.nextPassword : "";
    if (nextPassword.length < 10) return NextResponse.json({ message: "新密码至少需要 10 位" }, { status: 400 });
    if (currentPassword === nextPassword) return NextResponse.json({ message: "新密码不能与当前密码相同" }, { status: 400 });
    if (!(await changeAdminPassword(session.email, currentPassword, nextPassword))) return NextResponse.json({ message: "当前密码不正确或账户尚未初始化" }, { status: 400 });
    return NextResponse.json({ message: "密码已更新" });
  } catch { return NextResponse.json({ message: "密码修改失败，请稍后重试" }, { status: 500 }); }
}
