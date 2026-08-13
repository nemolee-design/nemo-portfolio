import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Yi — UI/UX & Interaction Designer", description: "UI/UX 与交互设计师个人作品集" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-CN"><body>{children}</body></html>; }
