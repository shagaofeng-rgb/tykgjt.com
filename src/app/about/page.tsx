import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = { title: "关于添烨 | 添烨控股", description: "了解绍兴添烨控股集团有限公司。" };

export default function AboutPage() {
  return <><SiteHeader /><main><section className="inner-hero about-hero"><p>关于添烨</p><h1>从绍兴出发，<br/><span>陪企业走得更远</span></h1><div>立足本土，理解企业日常；以专业、务实、诚信的服务，陪伴中小微企业稳健成长。</div></section><section className="about-long section"><div className="section-kicker">公司简介</div><div className="about-long-grid"><h2>从一项服务开始，<br/>到一段<span>长久陪伴</span></h2><div><p className="lead">绍兴添烨控股集团有限公司，专注于为中小微企业提供从初创到成熟的全生命周期企业服务。</p><p>集团于 2024 年 12 月成立，由杨海明先生统筹，整合旗下绍兴添烨商务秘书有限公司等优质实体，形成更具协同性的服务矩阵。</p><p>我们深耕绍兴本地市场，理解企业在设立、经营、规范与成长阶段的真实需要，努力让每一次服务都更清楚、更有回应。</p></div></div></section><section className="about-image"><Image src="/images/tianye-office-team.png" alt="添烨团队在现代办公空间中协作" fill sizes="100vw" /><div className="about-image-note"><span>绍兴 · 迪荡核心商务区</span><b>专业团队，服务企业每一步</b></div></section><section className="values"><div><p className="eyebrow light">我们的服务理念</p><h2>专业 · 务实 · 诚信</h2><p>不夸大承诺，不回避问题。用清晰的沟通、规范的流程和及时的回应，珍视每一次托付。</p></div><div className="value-cards"><article><b>使命</b><p>以专业能力护航企业发展的每一步。</p></article><article><b>愿景</b><p>成为绍兴中小微企业值得信赖的长期伙伴。</p></article><article><b>坚持</b><p>从真实需求出发，提供可落地的服务方案。</p></article></div></section><section className="facts-wide about-facts section"><div><p>品牌源起</p><b>2018 年</b><span>从本地企业服务起步</span></div><div><p>集团化启航</p><b>2024 年 12 月</b><span>整合资源，协同服务</span></div><div><p>注册资本</p><b>350 万元</b><span>稳健经营，规范发展</span></div><div><p>集团总部</p><b>迪荡龙湖大厦</b><span>绍兴核心商务区</span></div></section><section className="center-cta about-cta"><p>期待与更多认真经营的企业同行</p><h2>让每一次向前，<br/>都有专业陪伴</h2><Link href="/contact" className="primary">联系添烨 <span>→</span></Link></section></main><SiteFooter /></>;
}
