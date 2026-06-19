import { MOCK_CONTENT } from '@/lib/mock-data';
import { SITE_CONFIG, CHANNELS } from '@/lib/constants';
import { formatDate, getChannelName } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = SITE_CONFIG.url;

  const items = MOCK_CONTENT.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}</title>
    <link>${baseUrl}</link>
    <description>${SITE_CONFIG.description}</description>
    <language>id</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items
      .slice(0, 50)
      .map(
        (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${baseUrl}/konten/${item.slug}</link>
      <guid isPermaLink="true">${baseUrl}/konten/${item.slug}</guid>
      <description><![CDATA[${item.excerpt}]]></description>
      <content:encoded><![CDATA[${item.excerpt}]]></content:encoded>
      <pubDate>${new Date(item.publishedAt).toUTCString()}</pubDate>
      <category>${getChannelName(item.channel)}</category>
      <author>${item.author.name}</author>
      ${item.tags.map((tag) => `<category>${tag.name}</category>`).join('')}
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
