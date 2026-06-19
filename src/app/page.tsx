import { ContentCard } from '@/components/content/content-card';
import { ContentGrid } from '@/components/content/content-grid';
import { TrendingSidebar } from '@/components/content/trending-sidebar';
import { ChannelGrid } from '@/components/channel/channel-card';
import { getContentByChannel, getFeaturedContent, getTrendingContent } from '@/lib/mock-data';
import { CHANNELS } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featured = getFeaturedContent();
  const trending = getTrendingContent();
  const heroContent = featured[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section */}
      {heroContent && (
        <section className="mb-10">
          <ContentCard content={heroContent} variant="hero" />
        </section>
      )}

      {/* Featured + Trending Grid */}
      <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Artikel Unggulan</h2>
            <a
              href="/artikel"
              className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
            >
              Lihat Semua <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {featured.slice(1, 5).map((item) => (
              <ContentCard key={item.id} content={item} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <TrendingSidebar items={trending} />
        </div>
      </div>

      {/* Channel Grid */}
      <div className="mb-10">
        <ChannelGrid />
      </div>

      {/* Per-Channel Content Sections */}
      {CHANNELS.slice(0, 4).map((channel) => {
        const items = getContentByChannel(channel.slug).slice(0, 3);
        if (items.length === 0) return null;
        return (
          <div key={channel.slug} className="mb-10">
            <ContentGrid items={items} channel={channel.slug} columns={3} />
          </div>
        );
      })}
    </div>
  );
}
