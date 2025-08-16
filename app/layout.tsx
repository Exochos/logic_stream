import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { getUser, getTeamForUser } from "@/lib/db/queries";
import { SWRConfig } from "swr";
import Script from "next/script";
import logicstream from "@/lib/logicstream.json";

export const metadata: Metadata = {
  title: logicstream.titleShort || logicstream.title,
  description: logicstream.description,
  keywords: logicstream.keywords,
  authors: [{ name: logicstream.author }],
  creator: logicstream.author,
  openGraph: {
    title: logicstream.title,
    description: logicstream.description,
    url: logicstream.siteUrl,
    images: [logicstream.ogImage],
  },
  icons: {
    icon: logicstream.favicon,
    shortcut: logicstream.favicon,
    apple: logicstream.favicon,
  },
};

export const viewport: Viewport = {
  maximumScale: 5,
};

const manrope = Manrope({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`bg-gray-50 dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
    >
      <head>
        {/* Load gtag.js first, after hydration */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y483K4ZEBE"
          strategy="afterInteractive"
        />
        {/* Then define dataLayer and init gtag */}
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y483K4ZEBE');
          `}
        </Script>
      </head>
      <body className="min-h-[100dvh]">
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
