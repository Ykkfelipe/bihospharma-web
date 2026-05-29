import "./globals.css";

import { DM_Sans } from "next/font/google";
import SiteChrome from "./components/SiteChrome";
import { OrganizationJsonLd } from "./components/JsonLd";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bihospharma.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bihospharma IPS",
    template: "%s | Bihospharma",
  },
  description:
    "Soluciones integrales en salud. Consulta externa, medicina laboral, psicología y programas de atención en Yopal y Bogotá.",
  icons: {
    icon: "/bihos-logo.ico",
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Bihospharma IPS",
    url: siteUrl,
    images: [{ url: "/images/Banner-2026.png", width: 1200, height: 630, alt: "Bihospharma IPS" }],
  },
  twitter: {
    card: "summary_large_image" as const,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={dmSans.variable}>
      <body className="flex min-h-screen flex-col overflow-x-hidden bg-white font-sans text-gray-800 antialiased">
        <OrganizationJsonLd />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
