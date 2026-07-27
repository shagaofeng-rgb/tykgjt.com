import Link from "next/link";
import { getNewsArticles } from "@/lib/news";
import { getVisitStats } from "@/lib/site-metrics";

export default async function AdminDashboardPage() {
  const [articles, stats] = await Promise.all([getNewsArticles(), getVisitStats()]);
  return <><header className="admin-page-header"><div><span>运营概览</span><h1>欢迎回来，管理网站内容</h1><p>新闻发布、素材上传与网站访问情况都集中在这里。</p></div><Link className="admin-header-action" href="/admin/news">发布新闻 <b>→</b></Link></header>
    <section className="admin-stat-grid">
      <article><i>▤</i><span>已发布新闻</span><b>{articles.length}</b><small>官网新闻中心同步展示</small></article>
      <article><i>◌</i><span>今日浏览量</span><b>{stats.todayPageViews}</b><small>从本次后台上线起统计</small></article>
      <article><i>⌁</i><span>近 30 日浏览</span><b>{stats.thirtyDayPageViews}</b><small>累计页面访问次数</small></article>
      <article><i>◎</i><span>近 30 日访客</span><b>{stats.thirtyDayVisitors}</b><small>按浏览器会话去重</small></article>
    </section>
    <section className="admin-dashboard-grid"><article className="admin-panel"><div className="admin-panel-heading"><div><span>最近发布</span><h2>新闻动态</h2></div><Link href="/admin/news">管理新闻</Link></div>{articles.length ? <div className="admin-news-mini">{articles.slice(0, 5).map((article) => <div key={article.id}><b>{article.title}</b><span>{new Intl.DateTimeFormat("zh-CN", { month: "2-digit", day: "2-digit" }).format(new Date(article.publishedAt))}</span></div>)}</div> : <p className="admin-empty-text">还没有发布新闻，先创建第一条动态吧。</p>}</article>
      <article className="admin-panel"><div className="admin-panel-heading"><div><span>访问概览</span><h2>热门页面</h2></div><Link href="/admin/analytics">查看数据</Link></div>{stats.routes.length ? <div className="admin-route-list">{stats.routes.slice(0, 5).map((route) => <div key={route.path}><span>{route.path}</span><b>{route.pageViews} 次</b></div>)}</div> : <p className="admin-empty-text">数据正在开始累计，请稍后查看访问趋势。</p>}</article></section>
  </>;
}
