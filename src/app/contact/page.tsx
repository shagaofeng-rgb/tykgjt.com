import type { Metadata } from "next";
import Image from "next/image";
import { ConsultationForm } from "@/components/ConsultationForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = { title: "联系我们 | 添烨控股", description: "联系绍兴添烨控股集团有限公司，获取企业服务咨询。" };

export default function ContactPage() {
  return <><SiteHeader /><main><section className="inner-hero contact-hero"><p>联系我们</p><h1>每一次沟通，<br/><span>都是合作的开始</span></h1><div>欢迎致电或留言，我们将认真了解您的企业需求。</div></section><section className="contact-page section"><div className="contact-info"><p className="eyebrow">添烨控股集团总部</p><h2>期待您的来访<br/>与来电咨询</h2><dl><div><dt>服务地址</dt><dd>绍兴市越城区迪荡街道龙湖大厦 23 楼<br/>（平江路 17 号）</dd></div><div><dt>服务热线</dt><dd><a href="tel:17805858733">178 0585 8733</a></dd></div><div><dt>服务时间</dt><dd>工作日 9:00 - 18:00</dd></div></dl><div className="map-placeholder"><Image src="/images/tianye-contact-building.png" alt="添烨控股集团所在商务楼宇" fill sizes="(max-width: 900px) 100vw, 45vw" /><div><span>绍兴 · 迪荡核心商务区</span><b>添烨控股集团总部</b></div></div></div><ConsultationForm /></section></main><SiteFooter /></>;
}
