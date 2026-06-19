'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search, SearchX } from 'lucide-react';
import { searchContent, getTrendingContent } from '@/lib/mock-data';
import { CHANNELS } from '@/lib/constants';
import { ContentCard } from '@/components/content/content-card';
import { TrendingSidebar } from '@/components/content/trending-sidebar';
import type { ContentItem } from '@/types';

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(query);
  const [results, setResults] = useState<ContentItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (query) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setResults(searchContent(query));
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      router.push(`/cari?q=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Search Bar */}
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold text-foreground">Cari Konten</h1>
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Cari artikel, RPP, soal, beasiswa..."
              className="w-full rounded-xl border border-slate-300 bg-white py-4 pl-12 pr-4 text-base outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-400 dark:focus:ring-emerald-800"
              autoFocus
            />
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-3">
          {query ? (
            <>
              <p className="mb-6 text-sm text-muted-foreground">
                {isSearching
                  ? 'Mencari...'
                  : `Menampilkan ${results.length} hasil untuk "${query}"`}
              </p>
              {results.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {results.map((item) => (
                    <ContentCard key={item.id} content={item} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <SearchX className="mb-4 h-16 w-16 text-slate-300 dark:text-slate-600" />
                  <p className="text-lg font-medium text-muted-foreground">
                    Tidak ditemukan hasil untuk "{query}"
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Coba gunakan kata kunci lain atau jelajahi kanal di bawah
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Search className="mb-4 h-16 w-16 text-slate-300 dark:text-slate-600" />
              <p className="text-lg font-medium text-muted-foreground">
                Cari artikel, RPP, soal, beasiswa, dan lainnya
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Ketik kata kunci di atas untuk memulai pencarian
              </p>
            </div>
          )}
        </div>

        {/* Sidebar Trending */}
        <div className="lg:col-span-1">
          <TrendingSidebar items={getTrendingContent()} />
        </div>
      </div>
    </div>
  );
}
