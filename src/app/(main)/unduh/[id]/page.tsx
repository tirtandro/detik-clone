import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Download, ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: 'Unduh - ideguru',
};

export default async function DownloadPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-4 py-16">
      <div className="w-full text-center">
        <Download className="mx-auto mb-6 h-16 w-16 text-emerald-500" />
        <h1 className="text-2xl font-bold text-foreground">
          Unduh Perangkat Pembelajaran
        </h1>
        <p className="mt-3 text-muted-foreground">
          File akan mulai diunduh secara otomatis. Jika tidak berjalan, klik tombol di bawah.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <a
            href={`/unduhan/${id}`}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
          >
            <Download className="h-4 w-4" />
            Mulai Unduh
          </a>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
