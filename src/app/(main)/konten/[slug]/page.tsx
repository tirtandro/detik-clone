import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Clock, Eye, Download, User, Calendar } from 'lucide-react';
import { getContentBySlug, getRelatedContent, getTrendingContent } from '@/lib/mock-data';
import { formatDate, formatNumber, getChannelName, getContentTypeLabel } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { BookmarkButton } from '@/components/content/bookmark-button';
import { ContentCard } from '@/components/content/content-card';
import { TrendingSidebar } from '@/components/content/trending-sidebar';
import { JsonLd } from '@/components/content/json-ld';
import { Quiz, MOCK_QUIZZES } from '@/components/content/quiz';
import { ShareButtons } from '@/components/content/share-buttons';
import { PrintButton } from '@/components/content/print-button';
import { ReadingProgress } from '@/components/content/reading-progress';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = getContentBySlug(slug);
  if (!content) return { title: 'Konten Tidak Ditemukan' };
  const channelName = getChannelName(content.channel);
  return {
    title: content.seoTitle || content.title,
    description: content.seoDescription || content.excerpt,
    openGraph: {
      title: content.seoTitle || content.title,
      description: content.seoDescription || content.excerpt,
      type: 'article',
      publishedTime: content.publishedAt,
      modifiedTime: content.updatedAt || content.publishedAt,
      authors: [content.author.name],
      tags: content.tags.map((t) => t.name),
      section: channelName,
    },
    twitter: {
      card: 'summary_large_image',
      title: content.seoTitle || content.title,
      description: content.seoDescription || content.excerpt,
    },
    alternates: {
      canonical: `https://ideguru.id/konten/${content.slug}`,
    },
  };
}

export default async function ContentDetailPage({ params }: Props) {
  const { slug } = await params;
  const content = getContentBySlug(slug);
  if (!content) notFound();

  const related = getRelatedContent(content);
  const trending = getTrendingContent();
  const quizQuestions = MOCK_QUIZZES[content.id];

  return (
    <>
      <ReadingProgress />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: getChannelName(content.channel), href: `/${content.channel}` },
            { label: content.title },
          ]}
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <article className="lg:col-span-3">
            <JsonLd content={content} />
            <div className="rounded-xl border-border bg-surface p-6 sm:p-8">
              {/* Header */}
              <div className="mb-6">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                    {getContentTypeLabel(content.contentType)}
                  </Badge>
                  <Badge className="bg-muted text-foreground">
                    {getChannelName(content.channel)}
                  </Badge>
                </div>
                <h1 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                  {content.title}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <User className="h-4 w-4" aria-hidden="true" />
                    {content.author.name}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    {formatDate(content.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    {content.readTime} menit
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    {formatNumber(content.viewCount)} dibaca
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <ShareButtons title={content.title} slug={content.slug} />
                  <div className="flex items-center gap-2">
                    <PrintButton />
                    <BookmarkButton content={content} />
                  </div>
                </div>
              </div>

              {/* Body */}
              <div
                className="prose-article border-t border-border-light pt-6"
                dangerouslySetInnerHTML={{ __html: content.content }}
              />

              {/* Tags */}
              <div className="mt-8 border-t border-border-light pt-6">
                <div className="flex flex-wrap gap-2">
                  {content.tags.map((tag) => (
                    <Badge
                      key={tag.id}
                      href={`/tag/${tag.slug}`}
                      className="bg-muted text-foreground hover:bg-[var(--surface-hover)]"
                    >
                      #{tag.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {quizQuestions && (
                <div className="mt-8">
                  <Quiz questions={quizQuestions} />
                </div>
              )}

              {/* Download CTA */}
              {content.downloadUrl && (
                <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-800 dark:bg-emerald-950/30">
                  <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-semibold text-emerald-900 dark:text-emerald-200">
                        Unduh Perangkat Pembelajaran
                      </h3>
                      <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">
                        {content.fileType} &middot; {content.fileSize}
                        {content.downloadCount && ` \u00b7 ${formatNumber(content.downloadCount)} diunduh`}
                      </p>
                    </div>
                    <a
                      href={content.downloadUrl}
                      className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                      aria-label={`Unduh ${content.title}`}
                    >
                      <Download className="h-4 w-4" aria-hidden="true" />
                      Unduh Sekarang
                    </a>
                  </div>
                </div>
              )}

              {/* Author */}
              <div className="mt-8 rounded-xl border-border bg-muted p-5">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300"
                    aria-hidden="true"
                  >
                    {content.author.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{content.author.name}</p>
                    <p className="text-sm text-muted-foreground">{content.author.role}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Content */}
            {related.length > 0 && (
              <section className="mt-8" aria-label="Artikel terkait">
                <h2 className="mb-4 text-xl font-bold text-foreground">
                  Artikel Terkait
                </h2>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((item) => (
                    <ContentCard key={item.id} content={item} />
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1" aria-label="Sidebar">
            <div className="sticky top-24">
              <TrendingSidebar items={trending} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
