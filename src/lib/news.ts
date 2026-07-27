import { list, put } from "@vercel/blob";

const NEWS_PREFIX = "news/";
const DEFAULT_CLASS_ID = "31";

export type NewsArticle = {
  id: string;
  slug: string;
  classId: string;
  title: string;
  content: string;
  authorId: string;
  imageUrl: string | null;
  publishedAt: string;
};

export type PublishNewsInput = Omit<NewsArticle, "id" | "slug" | "publishedAt">;

export class NewsStorageUnavailableError extends Error {
  constructor() {
    super("新闻存储尚未配置");
    this.name = "NewsStorageUnavailableError";
  }
}

function getBlobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN;
}

function buildSlug(title: string) {
  const normalized = title
    .trim()
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);

  return normalized || "news";
}

function isNewsArticle(value: unknown): value is NewsArticle {
  if (!value || typeof value !== "object") return false;
  const article = value as Partial<NewsArticle>;
  return (
    typeof article.id === "string" &&
    typeof article.slug === "string" &&
    typeof article.classId === "string" &&
    typeof article.title === "string" &&
    typeof article.content === "string" &&
    typeof article.authorId === "string" &&
    (typeof article.imageUrl === "string" || article.imageUrl === null) &&
    typeof article.publishedAt === "string"
  );
}

export function isNewsStorageConfigured() {
  return Boolean(getBlobToken());
}

export function configuredNewsClassId() {
  return process.env.NEWS_CLASS_ID?.trim() || DEFAULT_CLASS_ID;
}

export async function publishNewsArticle(input: PublishNewsInput) {
  const token = getBlobToken();
  if (!token) throw new NewsStorageUnavailableError();

  const publishedAt = new Date().toISOString();
  const article: NewsArticle = {
    ...input,
    id: crypto.randomUUID(),
    slug: `${Date.now()}-${buildSlug(input.title)}-${crypto.randomUUID().slice(0, 8)}`,
    publishedAt,
  };

  await put(`${NEWS_PREFIX}${article.slug}.json`, JSON.stringify(article), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json; charset=utf-8",
    token,
  });

  return article;
}

async function readArticle(url: string): Promise<NewsArticle | null> {
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) return null;
    const article: unknown = await response.json();
    return isNewsArticle(article) ? article : null;
  } catch {
    return null;
  }
}

export async function getNewsArticles() {
  const token = getBlobToken();
  if (!token) return [];

  try {
    const { blobs } = await list({ prefix: NEWS_PREFIX, limit: 1000, token });
    const articles = (await Promise.all(blobs.map((blob) => readArticle(blob.url)))).filter(
      (article): article is NewsArticle => article !== null,
    );

    return articles.sort(
      (first, second) => new Date(second.publishedAt).getTime() - new Date(first.publishedAt).getTime(),
    );
  } catch {
    return [];
  }
}

export async function getNewsArticleBySlug(slug: string) {
  const articles = await getNewsArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}
