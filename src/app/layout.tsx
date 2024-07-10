import type { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Header } from "@/components/header/header";
import { SideMenu } from "@/components/side-menu/side-menu";
import theme from "@/styles/theme";
import "./globals.css";
import { AlertProvider } from "@/components/alert/alertProvider";

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
      <body className={"main"}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <AlertProvider>
              <Header />
              <section id="MainContainer" className={"mainContainer"}>
                <SideMenu />
                <section id="MainContentSection" className={"mainContentSection"}>
                  {children}
                </section>
              </section>
            </AlertProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
