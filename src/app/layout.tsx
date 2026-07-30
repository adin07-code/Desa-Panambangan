import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Desa Panambangan Berkarya",
  applicationName: "Desa Panambangan",
  description: "Web Portal dan Blog Edukasi Ketahanan Pangan Desa Panambangan. Menyajikan informasi UMKM Kembang Tahu, pemetaan desa, budidaya Maggot BSF, dan tanaman TOGA.",
  keywords: ["Desa Panambangan", "Ketahanan Pangan", "UMKM Kembang Tahu", "Maggot BSF", "TOGA", "Pemetaan Desa", "KKM UMC 2026"],
  authors: [{ name: "KKM UMC 2026" }],
  openGraph: {
    title: "Desa Panambangan Berkarya",
    siteName: "Desa Panambangan",
    description: "Pusat informasi, potensi desa, dan edukasi ketahanan pangan Desa Panambangan.",
    type: "website",
    locale: "id_ID",
  },
  appleWebApp: {
    title: "Desa Panambangan",
  }
};

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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
