import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContentByTag, getTagBySlug } from '@/lib/mock-data';
import { ContentCard } from '@/components/content/content-card';
import { ChevronRight } from 'lucide-react';

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const tagData = getTagBySlug(tag);
  if (!tagData) return { title: 'Tag Tidak Ditemukan' };
  return {
    title: `#${tagData.name} - ideguru`,
    description: `Kumpulan konten tentang ${tagData.name} di ideguru`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const tagData = getTagBySlug(tag);
  if (!tagData) notFound();

  const items = getContentByTag(tag);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">
          Beranda
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">#{tagData.name}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          #{tagData.name}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {tagData.count} konten dengan tag ini
        </p>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <ContentCard key={item.id} content={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg font-medium text-muted-foreground">
            Belum ada konten dengan tag ini
          </p>
          <Link
            href="/"
            className="mt-4 text-sm font-medium text-emerald-600 hover:text-emerald-500"
          >
            Kembali ke Beranda
          </Link>
        </div>
      )}
    </div>
  );
}
