export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="animate-pulse">
        <div className="mb-6 h-4 w-48 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="mb-8 h-10 w-96 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="mb-8 h-8 w-full rounded bg-slate-200 dark:bg-slate-700" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border-border bg-surface p-5"
            >
              <div className="mb-3 h-5 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
              <div className="mb-2 h-5 w-full rounded bg-slate-200 dark:bg-slate-700" />
              <div className="mb-4 h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
