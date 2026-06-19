'use client';

import { Bookmark } from 'lucide-react';
import { useBookmarks } from '@/components/layout/bookmark-context';
import type { ContentItem } from '@/types';
import { cn } from '@/lib/utils';

export function BookmarkButton({ content }: { content: ContentItem }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const saved = isBookmarked(content.id);

  return (
    <button
      onClick={() => toggleBookmark(content)}
      className={cn(
        'inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
        saved
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
          : 'border-slate-300 text-foreground hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-700'
      )}
      aria-label={saved ? 'Hapus dari tersimpan' : 'Simpan konten'}
    >
      <Bookmark className={cn('h-4 w-4', saved && 'fill-current')} />
      {saved ? 'Tersimpan' : 'Simpan'}
    </button>
  );
}
