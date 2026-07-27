import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { adminCookieName, verifyAdminSession } from "@/lib/admin-auth";

function isAuthorized(request: Request) {
  const cookie = request.headers.get("cookie")?.split(";").map((item) => item.trim()).find((item) => item.startsWith(`${adminCookieName()}=`));
  return Boolean(verifyAdminSession(cookie?.slice(adminCookieName().length + 1)));
}

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ message: "登录已过期，请重新登录" }, { status: 401 });
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) return NextResponse.json({ message: "请选择图片文件" }, { status: 400 });
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) return NextResponse.json({ message: "仅支持 PNG、JPG、WebP 图片" }, { status: 400 });
    if (file.size > 5 * 1024 * 1024) return NextResponse.json({ message: "图片不能超过 5MB" }, { status: 400 });
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) return NextResponse.json({ message: "图片存储尚未配置" }, { status: 503 });
    const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const blob = await put(`news/images/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${extension}`, file, { access: "public", addRandomSuffix: false, contentType: file.type, token });
    return NextResponse.json({ url: blob.url });
  } catch { return NextResponse.json({ message: "图片上传失败，请稍后重试" }, { status: 500 }); }
}
