import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getNewsArticleBySlug } from "@/lib/news";

type Props = { params: Promise<{ slug: string }> };

function formatDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

function toParagraphs(value: string) {
  return value
    .replace(/<\s*br\s*\/?>/gi, "\n")
    .replace(/<\/(?:p|div|li|h[1-6])>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .split(/\n{1,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);
  return { title: article ? `${article.title} | 添烨控股新闻动态` : "新闻动态 | 添烨控股" };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);
  if (!article) notFound();

  const paragraphs = toParagraphs(article.content);
  return (
    <>
      <SiteHeader />
      <main className="news-article-page">
        <div className="news-article-shell">
          <Link href="/news" className="news-back">← 返回新闻动态</Link>
          <header className="news-article-header">
            <span>新闻动态</span>
            <h1>{article.title}</h1>
            <p><time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time><i /> 绍兴添烨控股集团有限公司</p>
          </header>
          {article.imageUrl ? <img className="news-article-cover" src={article.imageUrl} alt="" /> : null}
          <article className="news-article-content">
            {paragraphs.length ? paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>) : <p>暂无正文内容。</p>}
          </article>
          <div className="news-article-foot">
            <span>本文来源：添烨控股新闻中心</span>
            <Link href="/contact">咨询企业服务 →</Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
