import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CHANNELS } from '@/lib/constants';
import { getContentByChannel, getTrendingContent } from '@/lib/mock-data';
import { getChannelName } from '@/lib/utils';
import { ChannelFilter } from '@/components/channel/channel-filter';
import { ContentCard } from '@/components/content/content-card';
import { TrendingSidebar } from '@/components/content/trending-sidebar';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ type?: string; page?: string }>;
}

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const channel = CHANNELS.find((c) => c.slug === slug);
  if (!channel) return { title: 'Kanal Tidak Ditemukan' };
  return {
    title: channel.name,
    description: channel.description,
    openGraph: {
      title: channel.name,
      description: channel.description,
    },
    alternates: {
      canonical: `https://ideguru.id${channel.href}`,
    },
  };
}

export default async function ChannelPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { type, page } = await searchParams;

  const channel = CHANNELS.find((c) => c.slug === slug);
  if (!channel) notFound();

  const currentPage = parseInt(page || '1', 10);
  const perPage = 12;

  let items = getContentByChannel(slug);
  if (type) {
    items = items.filter((item) => item.contentType === type);
  }

  const totalPages = Math.ceil(items.length / perPage);
  const paginatedItems = items.slice((currentPage - 1) * perPage, currentPage * perPage);
  const trending = getTrendingContent();

  const paginateHref = (p: number) => {
    const params = new URLSearchParams();
    if (type) params.set('type', type);
    if (p > 1) params.set('page', String(p));
    const qs = params.toString();
    return `/${slug}${qs ? `?${qs}` : ''}`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ label: channel.name }]}
      />

      {/* Channel Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">{channel.name}</h1>
        <p className="mt-2 text-muted-foreground">{channel.description}</p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <ChannelFilter channel={slug} />
      </div>

      {/* Content + Sidebar */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <section className="lg:col-span-3" aria-label="Daftar konten">
          {paginatedItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {paginatedItems.map((item) => (
                <ContentCard key={item.id} content={item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg font-medium text-muted-foreground">
                Belum ada konten untuk filter ini
              </p>
              <a
                href={`/${slug}`}
                className="mt-4 text-sm font-medium text-emerald-600 hover:text-emerald-500"
              >
                Reset filter
              </a>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav aria-label="Navigasi halaman" className="mt-8 flex items-center justify-center gap-2">
              {currentPage > 1 && (
                <a
                  href={paginateHref(currentPage - 1)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-[var(--surface-hover)] dark:border-slate-600"
                >
                  Sebelumnya
                </a>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <a
                  key={p}
                  href={paginateHref(p)}
                  aria-current={p === currentPage ? 'page' : undefined}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    p === currentPage
                      ? 'bg-emerald-600 text-white'
                      : 'border border-slate-300 text-foreground hover:bg-[var(--surface-hover)] dark:border-slate-600'
                  }`}
                >
                  {p}
                </a>
              ))}
              {currentPage < totalPages && (
                <a
                  href={paginateHref(currentPage + 1)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-[var(--surface-hover)] dark:border-slate-600"
                >
                  Selanjutnya
                </a>
              )}
            </nav>
          )}
        </section>

        {/* Sidebar */}
        <aside className="lg:col-span-1" aria-label="Sidebar">
          <TrendingSidebar items={trending} />
        </aside>
      </div>
    </div>
  );
}
