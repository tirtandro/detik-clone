import { Suspense } from 'react';
import type { Metadata } from 'next';
import SearchPageClient from './client';

export const metadata: Metadata = {
  title: 'Cari - ideguru',
  description: 'Cari artikel, RPP, soal, dan konten pendidikan di ideguru',
};

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">Memuat...</p>
        </div>
      </div>
    }>
      <SearchPageClient />
    </Suspense>
  );
}
