'use client';

import Link from 'next/link';
import { Bookmark, Download, Settings, BookOpen } from 'lucide-react';
import { useBookmarks } from '@/components/layout/bookmark-context';
import { ContentCard } from '@/components/content/content-card';

export default function ProfilePage() {
  const { bookmarkedItems } = useBookmarks();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300">
          G
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Profil Saya</h1>
          <p className="text-muted-foreground">Kelola konten tersimpan dan unduhan Anda</p>
        </div>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="flex flex-col items-center gap-3 rounded-xl border-border bg-surface p-8 text-center transition-shadow hover:shadow-md">
          <Bookmark className="h-8 w-8 text-emerald-500" />
          <div>
            <p className="font-semibold text-foreground">Tersimpan</p>
            <p className="text-sm text-muted-foreground">{bookmarkedItems.length} konten</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 rounded-xl border-border bg-surface p-8 text-center transition-shadow hover:shadow-md">
          <Download className="h-8 w-8 text-emerald-500" />
          <div>
            <p className="font-semibold text-foreground">Unduhan</p>
            <p className="text-sm text-muted-foreground">0 file</p>
          </div>
        </div>
        <Link
          href="#"
          className="flex flex-col items-center gap-3 rounded-xl border-border bg-surface p-8 text-center transition-shadow hover:shadow-md"
        >
          <Settings className="h-8 w-8 text-slate-500" />
          <div>
            <p className="font-semibold text-foreground">Pengaturan</p>
            <p className="text-sm text-muted-foreground">Preferensi</p>
          </div>
        </Link>
      </div>

      {bookmarkedItems.length > 0 && (
        <section>
          <h2 className="mb-6 text-xl font-bold text-foreground">
            Konten Tersimpan
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {bookmarkedItems.map((item) => (
              <ContentCard key={item.id} content={item} variant="compact" />
            ))}
          </div>
        </section>
      )}

      {bookmarkedItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <BookOpen className="mb-4 h-16 w-16 text-slate-300 dark:text-slate-600" />
          <p className="text-lg font-medium text-muted-foreground">
            Belum ada konten tersimpan
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Klik ikon <Bookmark className="inline h-4 w-4" /> Simpan pada artikel untuk menyimpannya
          </p>
          <Link
            href="/"
            className="mt-6 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
          >
            Jelajahi Konten
          </Link>
        </div>
      )}
    </div>
  );
}
