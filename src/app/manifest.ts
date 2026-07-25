import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "绍兴添烨控股集团有限公司",
    short_name: "添烨控股",
    description: "绍兴本土全生命周期企业服务集团。",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f3ed",
    theme_color: "#063b9b",
    lang: "zh-CN",
    icons: [
      { src: "/icon.png", sizes: "1024x1024", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "1024x1024", type: "image/png", purpose: "maskable" },
    ],
  };
}
