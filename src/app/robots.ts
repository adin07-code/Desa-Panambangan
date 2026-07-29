import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    // Sesuaikan domain.vercel.app ini dengan nama domain asli dari Vercel Anda nantinya,
    // misalnya: https://desa-panambangan.vercel.app/sitemap.xml
    sitemap: 'https://desa-panambangan.vercel.app/sitemap.xml',
  };
}
