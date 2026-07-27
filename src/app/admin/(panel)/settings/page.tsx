import { PasswordForm } from "@/components/admin/PasswordForm";
import { requireAdminSession } from "@/lib/admin-session";

export default async function AdminSettingsPage() {
  const session = await requireAdminSession();
  return <><header className="admin-page-header"><div><span>账户设置</span><h1>管理员账户与安全</h1><p>密码更新后会立即生效，请妥善保存新密码。</p></div></header><section className="admin-settings-grid"><article className="admin-panel"><div className="admin-panel-heading"><div><span>登录身份</span><h2>管理员邮箱</h2></div></div><div className="admin-account-email"><i>✉</i><div><b>{session.email}</b><small>此邮箱用于后台登录</small></div></div></article><article className="admin-panel"><div className="admin-panel-heading"><div><span>安全设置</span><h2>修改登录密码</h2></div></div><PasswordForm /></article></section></>;
}
