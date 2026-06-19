import Link from 'next/link';
import type { ContentItem } from '@/types';
import { formatRelativeTime, formatNumber, truncate } from '@/lib/utils';
import { TrendingUp, ChevronRight } from 'lucide-react';

export function TrendingSidebar({ items }: { items: ContentItem[] }) {
  return (
    <aside className="rounded-xl border border-border bg-surface p-5">
      <div className="mb-4 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-rose-500" />
        <h2 className="text-lg font-bold text-foreground">Terpopuler</h2>
      </div>
      <div className="space-y-4">
        {items.slice(0, 5).map((item, index) => (
          <Link
            key={item.id}
            href={`/konten/${item.slug}`}
            className="group flex gap-3"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold text-muted-foreground">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                {truncate(item.title, 60)}
              </h3>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                {formatRelativeTime(item.publishedAt)} &middot;{' '}
                {formatNumber(item.viewCount)} dibaca
              </span>
            </div>
          </Link>
        ))}
      </div>
      <a
        href="/cari?sort=tren"
        className="mt-4 flex items-center justify-center gap-1 rounded-lg bg-muted py-2 text-sm font-medium text-foreground transition-colors hover:bg-[var(--surface-hover)]"
      >
        Lihat lainnya <ChevronRight className="h-4 w-4" />
      </a>
    </aside>
  );
}
