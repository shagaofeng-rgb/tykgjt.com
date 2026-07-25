"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const items = [
  ["首页", "/"],
  ["服务体系", "/services"],
  ["关于添烨", "/about"],
  ["发展历程", "/history"],
  ["联系我们", "/contact"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="topbar">
    <Link href="/" className="brand" aria-label="添烨控股首页"><span className="brand-mark brand-logo"><Image src="/images/tianye-official-logo.png" alt="添烨控股标志" fill sizes="42px" priority /></span><span><b>添烨控股</b><i>全生命周期企业服务</i></span></Link>
    <nav className={open ? "nav open" : "nav"} aria-label="主导航">
      {items.map(([name, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{name}</Link>)}
    </nav>
    <Link href="/contact" className="outline-contact">咨询服务 <span>↗</span></Link>
    <button className="menu" onClick={() => setOpen(!open)} aria-label="展开导航" aria-expanded={open}><span></span><span></span></button>
  </header>;
}
