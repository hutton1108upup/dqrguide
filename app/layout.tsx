import type { Metadata, Viewport } from "next";
import { Cinzel, Inter } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/content/site";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", display: "swap", weight: ["600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Dungeon Quest Reborn Wiki: Spells, Drops & Guides", template: "%s | DQR.GG" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: "games",
  openGraph: { type: "website", siteName: siteConfig.name, locale: siteConfig.locale, title: "Dungeon Quest Reborn Wiki: Spells, Drops & Guides", description: siteConfig.description },
  twitter: { card: "summary", title: "Dungeon Quest Reborn Wiki", description: siteConfig.description }
};

export const viewport: Viewport = { themeColor: "#0B1020", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${inter.variable} ${cinzel.variable}`}><body><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader /><div id="main-content">{children}</div><SiteFooter /></body></html>;
}
