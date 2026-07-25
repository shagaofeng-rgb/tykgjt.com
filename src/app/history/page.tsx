import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = { title: "发展历程 | 添烨控股", description: "添烨控股的发展历程。" };

const history = [["2018 年", "品牌源起", "杨海明先生创立绍兴添烨商务秘书有限公司，深耕绍兴财税工商代办行业，以专业服务与务实态度，为添烨品牌奠定市场基础与行业口碑。"], ["2024 年 12 月", "集团化启航", "添烨控股集团正式组建，完成业务板块的集团化布局与资源整合，标志着企业迈入规范化、规模化发展的新阶段。"], ["2025 年至今", "深耕与拓展", "持续完善绍兴本地政企商务、财税、知识产权等全链条服务，同时拓展招投标代理、企业孵化、资质代办等多元业务。"]];

export default function HistoryPage() {
  return <><SiteHeader /><main><section className="inner-hero history-hero"><p>发展历程</p><h1>时间沉淀专业，<br/><span>前行不忘初心</span></h1><div>从单点服务到集团化布局，添烨始终以客户需求为中心，稳步前行。</div></section><section className="history-detail section"><p className="eyebrow">添烨故事</p><h2>每一步，都在为<br/>更长久的陪伴准备</h2><div className="history-detail-list">{history.map(([year, title, text]) => <article key={year}><div><b>{year}</b><span></span></div><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section><section className="quote-panel"><span>“</span><p>从服务一家企业开始，<br/>我们希望成为更多企业成长路上的可靠伙伴。</p></section><section className="center-cta light"><h2>下一段故事，<br/>期待有您的参与</h2><Link href="/contact" className="primary">与我们沟通 <span>→</span></Link></section></main><SiteFooter /></>;
}
