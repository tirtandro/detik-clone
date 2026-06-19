export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="animate-pulse">
        {/* Breadcrumb */}
        <div className="mb-6 h-4 w-64 rounded bg-slate-200 dark:bg-slate-700" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <div className="rounded-xl border-border bg-surface p-6 sm:p-8">
              <div className="mb-4 h-6 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />
              <div className="mb-4 h-10 w-full rounded bg-slate-200 dark:bg-slate-700" />
              <div className="mb-6 h-4 w-72 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-4/6 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="rounded-xl border-border bg-surface p-5">
              <div className="mb-4 h-6 w-32 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-7 w-7 rounded-lg bg-slate-200 dark:bg-slate-700" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
                      <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-700" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
