import { NextResponse } from "next/server";
import { adminCookieName } from "@/lib/admin-auth";

export async function POST() {
  const response = NextResponse.json({ message: "已退出登录" });
  response.cookies.set(adminCookieName(), "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}
