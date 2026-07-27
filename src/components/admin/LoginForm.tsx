"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/admin/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, password }) });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message || "登录失败，请稍后重试");
      router.replace("/admin");
      router.refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "登录失败，请稍后重试");
    } finally { setSubmitting(false); }
  }

  return <form className="admin-login-form" onSubmit={submit}>
    <label>登录邮箱<input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="请输入管理员邮箱" required /></label>
    <label>登录密码
      <span className="admin-password-field">
        <input type={visible ? "text" : "password"} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="请输入密码" required />
        <button type="button" onClick={() => setVisible((value) => !value)} aria-label={visible ? "隐藏密码" : "显示密码"} aria-pressed={visible}>{visible ? "◉" : "◎"}</button>
      </span>
    </label>
    {error ? <p className="admin-form-error" role="alert">{error}</p> : null}
    <button className="admin-primary-button" type="submit" disabled={submitting}>{submitting ? "登录中…" : "安全登录"}</button>
  </form>;
}
