"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navigation = [
  { href: "/admin", label: "控制台", icon: "▦" },
  { href: "/admin/news", label: "新闻管理", icon: "▤" },
  { href: "/admin/content", label: "内容上传", icon: "↑" },
  { href: "/admin/analytics", label: "访问数据", icon: "◌" },
  { href: "/admin/settings", label: "账户设置", icon: "⚙" },
] as const;

type AdminShellProps = { children: React.ReactNode; email: string };

export function AdminShell({ children, email }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function logout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-brand" aria-label="添烨控股后台首页">
          <span>添</span><b>添烨控股<br /><small>运营管理后台</small></b>
        </Link>
        <nav className="admin-nav" aria-label="后台导航">
          {navigation.map((item) => {
            const active = item.href === "/admin" ? pathname === item.href : pathname.startsWith(item.href);
            return <Link className={active ? "is-active" : ""} href={item.href} key={item.href}><i aria-hidden="true">{item.icon}</i>{item.label}</Link>;
          })}
        </nav>
        <div className="admin-user">
          <span>{email.slice(0, 1).toUpperCase()}</span>
          <div><b>管理员</b><small>{email}</small></div>
          <button type="button" onClick={logout} disabled={loggingOut}>{loggingOut ? "退出中" : "退出"}</button>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
