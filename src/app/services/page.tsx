import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = { title: "服务体系 | 添烨控股", description: "工商商事、财税、知识产权与企业增值服务。" };

const services = [
  { no: "01", icon: "企", title: "工商商事服务", intro: "让企业从设立到经营维护，每一步都有章法。", text: "企业启航的第一步，往往关系到后续经营是否顺畅。我们协助梳理办理路径，让基础事务推进得更清楚、更稳妥。", image: "/images/service-business-registration.png", points: ["公司注册与基础登记协助", "企业信息变更与合法注销指导", "相关经营资质办理咨询", "合规、灵活的地址托管方案"] },
  { no: "02", icon: "财", title: "财税服务", intro: "让财务管理更清晰、合规、高效。", text: "围绕企业日常财务与涉税事项，建立更规范的处理节奏，为经营决策留出更多精力和空间。", image: "/images/service-finance.png", points: ["代理记账与账目规范整理", "日常纳税申报事项协助", "合规框架内的税务筹划建议", "年度汇算清缴流程支持"] },
  { no: "03", icon: "知", title: "知识产权服务", intro: "守护企业品牌、创意与技术成果。", text: "品牌、创意和技术成果都是企业长期积累的重要资产。我们协助企业逐步建立更清晰的保护路径。", image: "/images/service-ip.png", points: ["商标注册查询、规划与申请协助", "软件、文创及设计作品版权登记", "专利申请与布局方向咨询", "品牌保护意识与路径建议"] },
  { no: "04", icon: "策", title: "企业增值服务", intro: "连接项目、资源与经营提升机会。", text: "在基础服务之外，我们也关注企业长期经营中的机会与难题，提供更贴近实际的项目、资质与管理支持。", image: "/images/tianye-office-team.png", points: ["政府项目申报咨询与材料协助", "招投标相关事项与标书支持", "企业经营管理咨询", "结合需求进行本地资源对接"] },
];

export default function ServicesPage() {
  return <><SiteHeader /><main>
    <section className="inner-hero services-hero"><p>服务体系</p><h1>企业成长的每一程，<br/><span>都有专业支持</span></h1><div>从基础事务办理到长期经营协同，添烨提供可衔接的一站式企业服务。</div></section>
    <section className="services-guide"><div><p className="home-kicker">服务总览</p><h2>不让企业在复杂事务中<br/>消耗太多精力</h2><p>我们把企业经营中的常见事项，归纳为四个彼此衔接的服务方向。您可以先从当下最需要解决的问题开始。</p></div><nav aria-label="服务类别导航">{services.map(service => <a href={`#service-${service.no}`} key={service.no}><b>{service.icon}</b><span>{service.title}</span><i>↓</i></a>)}</nav></section>
    <section className="service-panels">{services.map((service, index) => <article id={`service-${service.no}`} className={index % 2 ? "service-panel reverse" : "service-panel"} key={service.no}><div className="service-panel-image"><Image src={service.image} alt={`${service.title}服务场景`} fill sizes="(max-width: 900px) 100vw, 48vw" /><div className="service-panel-badge"><span>{service.no}</span><b>{service.icon}</b></div></div><div className="service-panel-copy"><p>添烨服务 / {service.no}</p><h2>{service.title}</h2><strong>{service.intro}</strong><span className="service-panel-rule"></span><ul>{service.points.map(point => <li key={point}>{point}</li>)}</ul><Link href="/contact" className="service-panel-link">咨询这项服务 <span>→</span></Link></div></article>)}</section>
    <section className="service-process"><div><p className="home-kicker">服务如何开始</p><h2>先听需求，再定方案</h2><p>一次清晰的沟通，是专业服务的开始。</p></div><div className="service-process-steps"><article><b>01</b><i>问</i><h3>沟通需求</h3><p>了解企业现状、事项目标与时间安排。</p></article><article><b>02</b><i>析</i><h3>梳理路径</h3><p>明确服务内容、所需资料与推进节奏。</p></article><article><b>03</b><i>办</i><h3>专人跟进</h3><p>由对应顾问协同处理相关服务事项。</p></article><article><b>04</b><i>伴</i><h3>持续支持</h3><p>根据企业发展阶段提供后续服务建议。</p></article></div><Link className="primary" href="/contact">获取专属方案 <span>→</span></Link></section>
  </main><SiteFooter /></>;
}
