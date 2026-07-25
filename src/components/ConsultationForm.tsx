"use client";

import { FormEvent, useState } from "react";

export function ConsultationForm() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  return <form className="quick-form contact-form" onSubmit={submit}>
    <p>预约专业顾问</p>
    {sent ? <div className="success"><b>提交成功</b><span>我们将在工作时间尽快与您联系。</span><button type="button" onClick={() => setSent(false)}>再次提交</button></div> : <>
      <label>您的称呼<input required name="name" placeholder="请输入姓名" /></label>
      <label>联系电话<input required name="phone" type="tel" placeholder="请输入手机号码" /></label>
      <label>公司名称<input name="company" placeholder="请输入公司名称（选填）" /></label>
      <label>服务需求<select name="service" defaultValue=""><option value="" disabled>请选择您需要的服务</option><option>工商商事服务</option><option>财税服务</option><option>知识产权服务</option><option>企业增值服务</option></select></label>
      <label>需求说明<textarea name="message" rows={4} placeholder="请简单描述您的需求（选填）" /></label>
      <button className="primary" type="submit">提交咨询 <span>→</span></button>
    </>}
  </form>;
}
