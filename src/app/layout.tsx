import type { Metadata } from "next";
import "./globals.css";
import "./logo.css";
import "./news.css";
import "./admin.css";
import { PageViewTracker } from "@/components/PageViewTracker";

export const metadata: Metadata = {
  title: "绍兴添烨控股集团有限公司 | 一站式企业服务",
  description: "立足绍兴，面向中小微企业提供工商商事、财税、知识产权及企业增值服务。",
  icons: {
    icon: [{ url: "/icon.png?v=2", type: "image/png", sizes: "1024x1024" }],
    shortcut: ["/icon.png?v=2"],
    apple: [{ url: "/apple-icon.png?v=2", type: "image/png", sizes: "1024x1024" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><PageViewTracker />{children}</body></html>;
}
