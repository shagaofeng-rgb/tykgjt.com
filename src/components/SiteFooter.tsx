import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return <footer>
    <Link href="/" className="brand footer-brand"><span className="brand-mark brand-logo"><Image src="/images/tianye-official-logo.png" alt="添烨控股标志" fill sizes="42px" /></span><span><b>添烨控股</b><i>全生命周期企业服务</i></span></Link>
    <p>全生命周期企业服务专家</p>
    <div className="footer-nav"><Link href="/services">服务体系</Link><Link href="/about">关于添烨</Link><Link href="/history">发展历程</Link><Link href="/contact">联系我们</Link></div>
    <small>© {new Date().getFullYear()} 绍兴添烨控股集团有限公司 · 版权所有</small>
  </footer>;
}
