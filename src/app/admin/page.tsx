import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/dal';
import { FileText, Users, Eye, Mail, Download, Bookmark } from 'lucide-react';

async function getStats() {
  const [totalContent, totalUsers, totalNewsletter, totalViews, totalDownloads, totalBookmarks] =
    await Promise.all([
      prisma.content.count(),
      prisma.user.count(),
      prisma.newsletterSubscriber.count(),
      prisma.content.aggregate({ _sum: { viewCount: true } }),
      prisma.content.aggregate({ _sum: { downloadCount: true } }),
      prisma.bookmark.count(),
    ]);

  return {
    totalContent,
    totalUsers,
    totalNewsletter,
    totalViews: totalViews._sum.viewCount || 0,
    totalDownloads: totalDownloads._sum.downloadCount || 0,
    totalBookmarks,
  };
}

async function getRecentContent() {
  return prisma.content.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      channel: { select: { name: true, color: true } },
      author: { select: { name: true } },
    },
  });
}

export default async function AdminDashboard() {
  await requireAuth();
  const stats = await getStats();
  const recentContent = await getRecentContent();

  const cards = [
    { label: 'Total Konten', value: stats.totalContent, icon: FileText, color: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950' },
    { label: 'Total Pengguna', value: stats.totalUsers, icon: Users, color: 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950' },
    { label: 'Total Tayangan', value: stats.totalViews, icon: Eye, color: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950' },
    { label: 'Newsletter', value: stats.totalNewsletter, icon: Mail, color: 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950' },
    { label: 'Unduhan', value: stats.totalDownloads, icon: Download, color: 'text-cyan-600 bg-cyan-50 dark:text-cyan-400 dark:bg-cyan-950' },
    { label: 'Bookmark', value: stats.totalBookmarks, icon: Bookmark, color: 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Ringkasan platform ideguru</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-xl border border-border bg-background p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-2.5 ${card.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{card.value.toLocaleString('id-ID')}</p>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-border bg-background shadow-sm">
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-semibold text-foreground">Konten Terbaru</h2>
        </div>
        <div className="divide-y divide-border">
          {recentContent.length === 0 && (
            <p className="px-5 py-8 text-center text-sm text-muted-foreground">
              Belum ada konten. Buat konten pertama Anda.
            </p>
          )}
          {recentContent.map((item) => (
            <div key={item.id} className="flex items-center justify-between px-5 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  {item.author.name} &middot; {item.channel.name}
                </p>
              </div>
              <span className="ml-4 shrink-0 text-xs text-muted-foreground">
                {item.viewCount} tayangan
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
