import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toonation KPI",
  description: "투네이션 JIRA와 연동하여 KPI를 만들어줍니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={""}>{children}</body>
    </html>
  );
}
