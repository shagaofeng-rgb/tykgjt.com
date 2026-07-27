import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { adminCookieName, verifyAdminSession } from "@/lib/admin-auth";
import { configuredNewsClassId, publishNewsArticle } from "@/lib/news";

function sessionFromRequest(request: Request) {
  const cookie = request.headers.get("cookie")?.split(";").map((item) => item.trim()).find((item) => item.startsWith(`${adminCookieName()}=`));
  return verifyAdminSession(cookie?.slice(adminCookieName().length + 1));
}

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!sessionFromRequest(request)) return NextResponse.json({ message: "登录已过期，请重新登录" }, { status: 401 });
  try {
    const body = await request.json() as Record<string, unknown>;
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const content = typeof body.content === "string" ? body.content.trim() : "";
    const authorId = typeof body.authorId === "string" ? body.authorId.trim() : "";
    const imageUrl = typeof body.imageUrl === "string" && body.imageUrl.trim() ? body.imageUrl.trim() : null;
    if (!title || !content || !authorId) return NextResponse.json({ message: "请完整填写新闻标题、正文和发布人" }, { status: 400 });
    if (title.length > 100 || content.length > 20000 || authorId.length > 40) return NextResponse.json({ message: "内容长度超过允许范围" }, { status: 400 });
    const article = await publishNewsArticle({ classId: configuredNewsClassId(), title, content, authorId, imageUrl });
    revalidatePath("/news"); revalidatePath(`/news/${article.slug}`); revalidatePath("/admin"); revalidatePath("/admin/news");
    return NextResponse.json({ message: "新闻发布成功", article });
  } catch { return NextResponse.json({ message: "发布失败，请检查后台存储配置" }, { status: 500 }); }
}
