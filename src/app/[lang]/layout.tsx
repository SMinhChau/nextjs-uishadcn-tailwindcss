import type { Metadata } from "next";
import { Roboto_Serif as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import ThemeProvider from "@/components";
import Navbar from "@/components/navbar";
import { i18n } from "../../../i18n-config";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const RootLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) => {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
