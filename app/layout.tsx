import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DEFAULT_DESCRIPTION, JsonLd, SITE_NAME, SITE_URL } from "./seo";
import "./globals.css";
import "./product.css";
import "./paddle-readiness.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Complisera", template: "%s | Complisera" },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  category: "business",
  referrer: "origin-when-cross-origin",
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}><JsonLd data={[organization, website]}/>{children}</body></html>;
}
