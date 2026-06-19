import type { MetadataRoute } from 'next';
import { CHANNELS } from '@/lib/constants';
import { MOCK_CONTENT } from '@/lib/mock-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ideguru.id';

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/cari`, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${baseUrl}/profil`, changeFrequency: 'monthly', priority: 0.3 },
  ];

  const channelPages: MetadataRoute.Sitemap = CHANNELS.map((channel) => ({
    url: `${baseUrl}${channel.href}`,
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  const contentPages: MetadataRoute.Sitemap = MOCK_CONTENT.map((content) => ({
    url: `${baseUrl}/konten/${content.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    lastModified: new Date(content.publishedAt),
  }));

  const tagPages: MetadataRoute.Sitemap = [...new Set(
    MOCK_CONTENT.flatMap((c) => c.tags.map((t) => t.slug))
  )].map((tagSlug) => ({
    url: `${baseUrl}/tag/${tagSlug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...channelPages, ...contentPages, ...tagPages];
}
