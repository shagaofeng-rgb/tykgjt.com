import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer>
      <Link href="/" className="brand footer-brand">
        <span className="brand-mark brand-logo">
          <Image src="/images/tianye-logo-clear.png" alt="添烨控股集团标志" fill sizes="52px" quality={100} />
        </span>
        <span>
          <b>添烨控股集团</b>
          <i>全生命周期企业服务</i>
        </span>
      </Link>
      <p>全生命周期企业服务专家</p>
      <div className="footer-nav">
        <Link href="/services">服务体系</Link>
        <Link href="/news">新闻动态</Link>
        <Link href="/about">关于添烨</Link>
        <Link href="/history">发展历程</Link>
        <Link href="/contact">联系我们</Link>
      </div>
      <small>© {new Date().getFullYear()} 绍兴添烨控股集团有限公司 · 版权所有</small>
    </footer>
  );
}
