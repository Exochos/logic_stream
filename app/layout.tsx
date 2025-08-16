import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { getUser, getTeamForUser } from "@/lib/db/queries";
import { SWRConfig } from "swr";
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
  maximumScale: 1,
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
      className={`bg-grey dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
    >
      <body className="min-h-[100dvh] bg-gray-50">
        <SWRConfig
          value={{
            fallback: {
              // We do NOT await here
              // Only components that read this data will suspend
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
