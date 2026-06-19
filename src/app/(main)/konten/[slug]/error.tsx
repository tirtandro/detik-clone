'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950/30">
        <span className="text-4xl text-red-400">!</span>
      </div>
      <h1 className="text-2xl font-bold text-foreground">
        Gagal Memuat Konten
      </h1>
      <p className="mt-3 text-muted-foreground">
        Gagal memuat konten. Silakan coba lagi.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
      >
        Coba Lagi
      </button>
    </div>
  );
}
