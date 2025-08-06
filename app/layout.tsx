import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { getUser, getTeamForUser } from "@/lib/db/queries";
import { SWRConfig } from "swr";

export const metadata: Metadata = {
  title: "Logicstream.io",
  authors: [{ name: "Logicstream.io Team", url: "https://logicstream.io" }],
  keywords: [
    "Web Development",
    "Next.js",
    "Postgres",
    "Stripe",
    "Logicstream",
    "Web App",
  ],
  description:
    "A modern web application built with Next.js, Drizzle ORM, and Stripe.",
  openGraph: {
    title: "Logicstream.io",
    description:
      "A modern web application built with Next.js, Drizzle ORM, and Stripe.",
    url: "https://logicstream.io",
    siteName: "Logicstream.io",
    images: [
      {
        url: "https://logicstream.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "Logicstream.io Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
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
