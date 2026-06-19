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
      <h1 className="text-2xl font-bold text-foreground">
        Gagal Memuat Halaman
      </h1>
      <button
        onClick={reset}
        className="mt-8 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
      >
        Coba Lagi
      </button>
    </div>
  );
}
