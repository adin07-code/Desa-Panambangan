import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = {
  variable: "--font-inter",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "KKM 14 PANAMBANGAN",
  applicationName: "KKM 14 PANAMBANGAN",
  description: "Web Portal dan Sistem Informasi KKM 14 UMC Desa Panambangan.",
  keywords: ["Desa Panambangan", "Ketahanan Pangan", "UMKM Kembang Tahu", "Maggot BSF", "TOGA", "Pemetaan Desa", "KKM UMC 2026", "KKM 14"],
  authors: [{ name: "KKM UMC 2026" }],
  openGraph: {
    title: "KKM 14 PANAMBANGAN",
    siteName: "KKM 14 PANAMBANGAN",
    description: "Web Portal dan Sistem Informasi KKM 14 UMC Desa Panambangan.",
    type: "website",
    locale: "id_ID",
  },
  appleWebApp: {
    title: "KKM 14 PANAMBANGAN",
  }
};

import ScrollToTop from "@/components/ScrollToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Desa Panambangan",
              "alternateName": "Portal Desa Panambangan",
              "url": "https://desa-panambangan.vercel.app/"
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
