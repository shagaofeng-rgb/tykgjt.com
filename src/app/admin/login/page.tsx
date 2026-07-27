import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { getAdminSession } from "@/lib/admin-session";

export const metadata: Metadata = { title: "运营管理后台 | 添烨控股" };
export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");
  return <main className="admin-login-page">
    <section className="admin-login-intro"><Link href="/" className="admin-login-brand"><span>添</span>添烨控股</Link><div><p>企业服务 · 专业运营</p><h1>让每一条动态<br />都被妥善管理</h1><i>TYKGJT MANAGEMENT</i></div><small>绍兴添烨控股集团有限公司</small></section>
    <section className="admin-login-panel"><div className="admin-login-card"><span className="admin-kicker">ADMIN PORTAL</span><h2>登录管理后台</h2><p>请使用管理员邮箱与密码安全登录。</p><LoginForm /></div></section>
  </main>;
}
