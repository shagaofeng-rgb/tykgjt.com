import { NewsPublisher } from "@/components/admin/NewsPublisher";

export default function AdminContentPage() {
  return <><header className="admin-page-header"><div><span>内容上传</span><h1>上传图文素材</h1><p>可上传 PNG、JPG、WebP 图片，并在新闻正文中作为封面使用。</p></div></header><section className="admin-panel admin-content-upload"><div className="admin-panel-heading"><div><span>图文素材</span><h2>内容发布工具</h2></div></div><p className="admin-note">图片上传后会自动生成可访问链接。若当前要发布新闻，可直接在下方填写标题和正文，一次完成内容与封面上传。</p><NewsPublisher /></section></>;
}
