"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function NewsPublisher() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState("admin");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setMessage(""); setUploading(true);
    try {
      const formData = new FormData(); formData.set("file", file);
      const response = await fetch("/api/admin/upload-image", { method: "POST", body: formData });
      const result = await response.json() as { url?: string; message?: string };
      if (!response.ok || !result.url) throw new Error(result.message || "图片上传失败");
      setImageUrl(result.url); setMessage("封面图已上传，可继续发布新闻。");
    } catch (reason) { setMessage(reason instanceof Error ? reason.message : "图片上传失败"); }
    finally { setUploading(false); event.target.value = ""; }
  }

  async function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage(""); setPublishing(true);
    try {
      const response = await fetch("/api/admin/news", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ title, content, authorId, imageUrl }) });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message || "发布失败");
      setTitle(""); setContent(""); setImageUrl(""); setMessage("新闻已发布，官网新闻中心将立即显示。"); router.refresh();
    } catch (reason) { setMessage(reason instanceof Error ? reason.message : "发布失败"); }
    finally { setPublishing(false); }
  }

  return <form className="admin-editor" onSubmit={publish}>
    <label>新闻标题<input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="例如：添烨控股推出企业服务新举措" maxLength={100} required /></label>
    <div className="admin-editor-grid">
      <label>发布人<input value={authorId} onChange={(event) => setAuthorId(event.target.value)} maxLength={40} required /></label>
      <label>封面图片
        <span className="admin-upload-line"><input value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} placeholder="粘贴图片链接或右侧上传" /><input className="admin-file-input" type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadImage} /><b>{uploading ? "上传中" : "上传图片"}</b></span>
      </label>
    </div>
    <label>正文内容<textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="请输入新闻正文。支持按段落换行，发布后将在官网新闻中心展示。" rows={12} maxLength={20000} required /></label>
    {message ? <p className={message.includes("失败") ? "admin-form-error" : "admin-form-success"} role="status">{message}</p> : null}
    <button type="submit" className="admin-primary-button" disabled={publishing || uploading}>{publishing ? "发布中…" : "发布到官网"}</button>
  </form>;
}
