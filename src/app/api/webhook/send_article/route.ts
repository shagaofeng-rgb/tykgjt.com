import { createHash, timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import {
  configuredNewsClassId,
  NewsStorageUnavailableError,
  publishNewsArticle,
} from "@/lib/news";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type IncomingArticle = {
  sign?: unknown;
  class_id?: unknown;
  title?: unknown;
  content?: unknown;
  author_id?: unknown;
  image_url?: unknown;
};

function result(code: 0 | 1, msg: string) {
  return NextResponse.json({ code, msg }, { status: 200 });
}

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function signaturesMatch(input: string, secret: string) {
  const inputHash = createHash("sha256").update(input).digest();
  const secretHash = createHash("sha256").update(secret).digest();
  return timingSafeEqual(inputHash, secretHash);
}

function validImageUrl(value: string) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

async function getPayload(request: Request): Promise<IncomingArticle> {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return (await request.json()) as IncomingArticle;
  }

  const formData = await request.formData();
  return Object.fromEntries(formData.entries()) as IncomingArticle;
}

export async function POST(request: Request) {
  let payload: IncomingArticle;

  try {
    payload = await getPayload(request);
  } catch {
    return result(0, "请求参数格式错误，请使用 application/x-www-form-urlencoded");
  }

  const secret = process.env.NEWS_WEBHOOK_SECRET?.trim();
  if (!secret) return result(0, "发布接口尚未完成安全配置，请联系技术人员");

  const sign = asText(payload.sign);
  if (!sign || !signaturesMatch(sign, secret)) return result(0, "秘钥错误");

  const title = asText(payload.title);
  const content = asText(payload.content);
  const requiredClassId = configuredNewsClassId();
  const classId = asText(payload.class_id) || requiredClassId;
  const authorId = asText(payload.author_id) || process.env.NEWS_DEFAULT_AUTHOR_ID?.trim() || "1";
  const imageUrl = asText(payload.image_url);

  if (!title) return result(0, "文章标题不能为空");
  if (!content) return result(0, "文章内容不能为空");
  if (classId !== requiredClassId) return result(0, `栏目 ID 不正确，请使用 ${requiredClassId}`);
  if (!validImageUrl(imageUrl)) return result(0, "封面图地址必须是 http 或 https 地址");

  try {
    await publishNewsArticle({
      classId,
      title: title.slice(0, 200),
      content,
      authorId,
      imageUrl: imageUrl || null,
    });
    revalidatePath("/news");
    return result(1, "发布成功");
  } catch (error) {
    if (error instanceof NewsStorageUnavailableError) {
      return result(0, "文章存储未配置，请联系技术人员");
    }
    console.error("新闻发布失败", error);
    return result(0, "发布失败，请稍后重试");
  }
}
