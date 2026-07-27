"use client";

import { FormEvent, useState } from "react";

export function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage(""); setSaving(true);
    try {
      const response = await fetch("/api/admin/password", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ currentPassword, nextPassword }) });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message || "密码修改失败");
      setCurrentPassword(""); setNextPassword(""); setMessage("密码已更新，下次请使用新密码登录。");
    } catch (reason) { setMessage(reason instanceof Error ? reason.message : "密码修改失败"); }
    finally { setSaving(false); }
  }
  const type = visible ? "text" : "password";
  return <form className="admin-password-form" onSubmit={submit}>
    <label>当前密码<input type={type} autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} required /></label>
    <label>新密码<span className="admin-password-field"><input type={type} autoComplete="new-password" value={nextPassword} onChange={(event) => setNextPassword(event.target.value)} minLength={10} placeholder="至少 10 位，建议混合字母、数字和符号" required /><button type="button" onClick={() => setVisible((value) => !value)} aria-label={visible ? "隐藏密码" : "显示密码"}>{visible ? "◉" : "◎"}</button></span></label>
    {message ? <p className={message.includes("失败") ? "admin-form-error" : "admin-form-success"} role="status">{message}</p> : null}
    <button type="submit" className="admin-primary-button" disabled={saving}>{saving ? "保存中…" : "更新密码"}</button>
  </form>;
}
