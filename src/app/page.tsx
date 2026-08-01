import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "绍兴添烨控股集团有限公司 | 一站式企业服务",
  description: "立足绍兴，面向中小微企业提供工商商事、财税、知识产权及企业增值服务。",
};

const serviceCards = [
  ["工商商事", "企业设立与日常维护", "/images/service-business-registration.png", "企"],
  ["财税服务", "规范、高效的财税支持", "/images/service-finance.png", "财"],
  ["知识产权", "守护品牌与创新成果", "/images/service-ip.png", "知"],
  ["企业增值", "连接项目与经营机遇", "/images/tianye-office-team.png", "策"],
];

const stages = [
  ["初创启航", "帮企业把注册、代理记账等基础事项办得清楚、稳妥。", "启"],
  ["规范运营", "通过财税服务，让企业经营账目更清晰、有序。", "稳"],
  ["品牌成长", "围绕商标、版权与专利，逐步建立保护意识。", "护"],
  ["持续发展", "把握项目、资质与经营提升的长期机会。", "远"],
];

export default function Home() {
  return <><SiteHeader /><main>
    <section className="home-hero" aria-labelledby="home-title">
      <Image src="/images/tianye-hero-banner.png" alt="添烨专业顾问在现代商务环境中协作" fill priority sizes="100vw" />
      <div className="home-hero-shade"></div>
      <div className="home-hero-content"><p className="home-eyebrow">绍兴本土企业服务集团</p><h1 id="home-title">让企业的每一次<br/><span>向前，都更从容</span></h1><p>从初创到成长，添烨以专业、务实的服务，陪伴绍兴中小微企业把每一步走稳。</p><div><Link href="/contact" className="primary">获取专属方案 <span>→</span></Link><Link href="/about" className="home-plain-link">认识添烨 <span>↓</span></Link></div></div>
      <div className="home-hero-note"><i></i><p>全生命周期<br/>企业服务</p><span>绍兴 · 添烨控股</span></div>
    </section>

    <section className="home-intro"><div className="home-intro-media"><div className="home-intro-main"><Image src="/images/tianye-office-team.png" alt="添烨团队在现代办公空间协作" fill sizes="(max-width: 900px) 100vw, 50vw" /></div><div className="home-intro-tag">专业服务<br/>本土陪伴</div><div className="home-intro-small"><Image src="/images/tianye-service-consulting.png" alt="顾问与企业客户沟通" fill sizes="220px" /></div></div><div className="home-intro-copy"><p className="home-kicker">添烨是谁</p><h2>一家懂企业日常，<br/>也懂<span>长期成长</span>的<br/>本土服务集团</h2><p>绍兴添烨控股集团有限公司，专注于为中小微企业提供全生命周期托管服务。我们不只处理一件事项，更希望在企业不同阶段提供可以落地的支持。</p><div className="home-facts"><div><b>2018</b><span>品牌始创</span></div><div><b>2024.12</b><span>集团启航</span></div><div><b>绍兴</b><span>本土深耕</span></div></div><Link href="/about" className="arrow-link">了解企业故事 <span>→</span></Link></div></section>

    <section className="home-lifecycle"><div className="home-lifecycle-head"><div><p className="home-kicker">企业成长地图</p><h2>不同阶段，<br/>需要不同的<span>专业支持</span></h2></div><p>以企业实际经营需要为中心，把复杂的事务拆解成更有节奏、更可执行的服务路径。</p></div><div className="home-stage-grid">{stages.map(([title, text, symbol], index) => <article key={title}><div className="home-stage-number">0{index + 1}</div><div className="home-stage-symbol">{symbol}</div><h3>{title}</h3><p>{text}</p><span></span></article>)}</div><div className="home-lifecycle-photo"><Image src="/images/service-business-registration.png" alt="添烨顾问为企业客户提供服务建议" fill sizes="100vw" /><div><b>把复杂留给我们，</b><p>让经营回到更重要的事情上。</p></div></div></section>

    <section className="home-services"><div className="home-services-head"><p className="home-kicker">核心服务</p><h2>在关键时刻，<br/>提供恰到好处的支持</h2><Link href="/services" className="line-button">进入服务体系 <span>→</span></Link></div><div className="home-service-grid">{serviceCards.map(([title, text, image, symbol]) => <Link href="/services" className="home-service-card" key={title}><Image src={image} alt={`${title}服务场景`} fill sizes="(max-width: 600px) 100vw, 25vw" /><div className="home-service-cover"></div><div className="home-service-card-top"><span>{symbol}</span><small>服务支持</small></div><div className="home-service-card-bottom"><h3>{title}</h3><p>{text}</p><b>了解服务 →</b></div></Link>)}</div></section>

    <section className="home-trust"><div className="home-trust-image"><Image src="/images/tianye-office-team.png" alt="添烨团队在现代办公空间协作" fill sizes="(max-width: 900px) 100vw, 55vw" /></div><div className="home-trust-copy"><p className="home-kicker">我们的坚持</p><h2>专业，不止是<br/>办成一件事</h2><p>从沟通需求到推进服务，我们重视清晰、规范与及时响应，让企业在每一次合作中感到安心。</p><div className="home-trust-items"><div><b>本</b><span><strong>深耕本土</strong>了解绍兴企业的真实需求</span></div><div><b>全</b><span><strong>全程陪伴</strong>衔接企业不同阶段的事项</span></div><div><b>诚</b><span><strong>务实诚信</strong>用清晰沟通回应每次托付</span></div></div></div></section>

    <section className="home-contact"><div className="home-contact-symbol home-contact-logo"><Image src="/images/tianye-logo-clear.png" alt="添烨控股标志" fill sizes="108px" quality={100} /></div><div><p className="home-eyebrow">从一次沟通开始</p><h2>您认真经营，<br/>我们认真陪伴</h2><p>无论您正在筹备创业，还是想让企业经营更有条理，欢迎和添烨聊一聊。</p></div><div className="home-contact-action"><a href="tel:17805858733">178 0585 8733</a><span>工作日 9:00 - 18:00</span><Link href="/contact" className="primary">预约专业顾问 <span>→</span></Link></div></section>
  </main><SiteFooter /></>;
}
