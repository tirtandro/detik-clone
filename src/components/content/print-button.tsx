'use client';

import { Printer } from 'lucide-react';

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-700"
      aria-label="Cetak halaman"
    >
      <Printer className="h-4 w-4" />
      Cetak
    </button>
  );
}
