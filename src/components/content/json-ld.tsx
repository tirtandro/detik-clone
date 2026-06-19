import type { ContentItem } from '@/types';

export function JsonLd({ content }: { content: ContentItem }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': content.downloadUrl ? 'Article' : 'Article',
    headline: content.title,
    description: content.excerpt,
    author: {
      '@type': 'Person',
      name: content.author.name,
    },
    datePublished: content.publishedAt,
    dateModified: content.updatedAt || content.publishedAt,
    ...(content.tags.length > 0 && {
      keywords: content.tags.map((t) => t.name).join(', '),
    }),
    publisher: {
      '@type': 'Organization',
      name: 'ideguru',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://ideguru.id/konten/${content.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
