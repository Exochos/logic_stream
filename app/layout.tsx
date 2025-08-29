import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { getUser, getTeamForUser } from "@/lib/db/queries";
import { SWRConfig } from "swr";
import Script from "next/script";
import companyinfo from "@/lib/companyInfo.json";
import GAInitializer from "@/components/GAInitializer";

export const metadata: Metadata = {
  title: companyinfo.titleShort || companyinfo.title,
  description: companyinfo.description,
  keywords: companyinfo.keywords,
  authors: [{ name: companyinfo.author }],
  creator: companyinfo.author,
  openGraph: {
    title: companyinfo.title,
    description: companyinfo.description,
    url: companyinfo.siteUrl,
    images: [companyinfo.ogImage],
  },
  icons: {
    icon: companyinfo.favicon,
    shortcut: companyinfo.favicon,
    apple: companyinfo.favicon,
  },
};

export const viewport: Viewport = {
  maximumScale: 5,
};

const manrope = Manrope({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`bg-black dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}>
      <body className="min-h-[100dvh] bg-black dark:bg-gray-950 text-black dark:text-white">
        <GAInitializer />
        <SWRConfig
          value={{
            fallback: {
              "/api/user": getUser(),
              "/api/team": getTeamForUser(),
            },
          }}
        >
          {children}
        </SWRConfig>
      </body>
    </html>
  );
}
