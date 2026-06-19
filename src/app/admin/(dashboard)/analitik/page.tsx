import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/dal';
import { BarChart3, Eye, Download } from 'lucide-react';

export default async function AnalyticsPage() {
  await requireAuth();

  const [totalViews, totalDownloads, latestContents] = await Promise.all([
    prisma.content.aggregate({ _sum: { viewCount: true } }),
    prisma.content.aggregate({ _sum: { downloadCount: true } }),
    prisma.content.findMany({
      orderBy: { viewCount: 'desc' },
      take: 10,
      include: { channel: { select: { name: true, color: true } } },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analitik</h1>
        <p className="text-sm text-muted-foreground">Statistik platform ideguru</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-background p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-50 p-2.5 dark:bg-emerald-950">
              <Eye className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{(totalViews._sum.viewCount || 0).toLocaleString('id-ID')}</p>
              <p className="text-sm text-muted-foreground">Total Tayangan</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-background p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2.5 dark:bg-blue-950">
              <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{(totalDownloads._sum.downloadCount || 0).toLocaleString('id-ID')}</p>
              <p className="text-sm text-muted-foreground">Total Unduhan</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-background p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-orange-50 p-2.5 dark:bg-orange-950">
              <BarChart3 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{latestContents.length}</p>
              <p className="text-sm text-muted-foreground">Konten Terpopuler</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-background">
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-semibold text-foreground">Konten Terpopuler</h2>
        </div>
        <div className="divide-y divide-border">
          {latestContents.map((item, i) => (
            <div key={item.id} className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="text-sm font-bold text-muted-foreground shrink-0 w-6">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    <span style={{ color: item.channel.color }}>{item.channel.name}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Eye className="h-3 w-3" /> {item.viewCount}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Download className="h-3 w-3" /> {item.downloadCount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
