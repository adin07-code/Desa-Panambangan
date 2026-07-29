import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Ganti URL ini dengan domain Vercel Anda nantinya
  const baseUrl = 'https://desa-panambangan.vercel.app';

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Secara otomatis mesin pencari juga akan menelusuri link dari halaman /blog
  ];
}
