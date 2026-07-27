import Link from "next/link";
import { NewsPublisher } from "@/components/admin/NewsPublisher";
import { getNewsArticles } from "@/lib/news";

export default async function AdminNewsPage() {
  const articles = await getNewsArticles();
  return <><header className="admin-page-header"><div><span>新闻管理</span><h1>发布官网新闻动态</h1><p>发布后将即时同步至官网「新闻动态」栏目。</p></div><Link className="admin-header-action" href="/news" target="_blank">查看官网 <b>↗</b></Link></header>
    <section className="admin-content-grid"><article className="admin-panel admin-panel-editor"><div className="admin-panel-heading"><div><span>新建内容</span><h2>撰写新闻</h2></div></div><NewsPublisher /></article>
      <article className="admin-panel admin-panel-list"><div className="admin-panel-heading"><div><span>已发布</span><h2>新闻列表</h2></div><b>{articles.length} 篇</b></div><div className="admin-published-list">{articles.length ? articles.map((article) => <Link href={`/news/${article.slug}`} target="_blank" key={article.id}><span>{article.imageUrl ? "图" : "文"}</span><div><b>{article.title}</b><small>{new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(article.publishedAt))} · {article.authorId}</small></div><em>↗</em></Link>) : <p className="admin-empty-text">暂时没有新闻内容。</p>}</div></article></section>
  </>;
}
