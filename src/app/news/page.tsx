import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getNewsArticles } from "@/lib/news";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "新闻动态 | 绍兴添烨控股集团有限公司",
  description: "关注绍兴添烨控股集团有限公司的企业服务动态与最新资讯。",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

function plainText(value: string) {
  return value
    .replace(/<\s*br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default async function NewsPage() {
  const articles = await getNewsArticles();

  return (
    <>
      <SiteHeader />
      <main className="news-page">
        <section className="news-hero">
          <div className="news-hero-orb news-hero-orb-one" />
          <div className="news-hero-orb news-hero-orb-two" />
          <div className="news-hero-content">
            <span className="eyebrow">NEWS CENTER</span>
            <h1>新闻动态</h1>
            <p>记录添烨控股的每一步成长，分享企业服务领域的专业洞见。</p>
          </div>
          <div className="news-hero-mark" aria-hidden="true">
            <span>新</span>
            <span>闻</span>
          </div>
        </section>

        <section className="news-list-section" aria-label="新闻列表">
          <div className="news-section-heading">
            <div>
              <span>最新资讯</span>
              <h2>与添烨一起，关注企业发展新动向</h2>
            </div>
            <b>{articles.length ? `${articles.length} 篇资讯` : "持续更新"}</b>
          </div>

          {articles.length ? (
            <div className="news-grid">
              {articles.map((article, index) => {
                const summary = plainText(article.content);
                return (
                  <article className="news-card" key={article.id}>
                    <Link href={`/news/${article.slug}`} className="news-card-image" aria-label={`阅读：${article.title}`}>
                      {article.imageUrl ? (
                        <img src={article.imageUrl} alt="" loading="lazy" />
                      ) : (
                        <span className={`news-card-fallback news-card-fallback-${(index % 3) + 1}`}>
                          <i>添烨控股</i>
                          <b>企业服务资讯</b>
                        </span>
                      )}
                      <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                    </Link>
                    <div className="news-card-body">
                      <span>新闻动态</span>
                      <h3><Link href={`/news/${article.slug}`}>{article.title}</Link></h3>
                      <p>{summary || "点击查看新闻详情。"}</p>
                      <Link href={`/news/${article.slug}`} className="news-read-more">阅读详情 <em>→</em></Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="news-empty">
              <div className="news-empty-icon" aria-hidden="true">新</div>
              <h2>新闻内容即将发布</h2>
              <p>添烨控股将持续发布企业服务、品牌发展及行业相关资讯，敬请关注。</p>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
