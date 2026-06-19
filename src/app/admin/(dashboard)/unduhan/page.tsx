import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/dal';
import { Download } from 'lucide-react';

export default async function DownloadsPage() {
  await requireAuth();
  const downloads = await prisma.download.findMany({
    orderBy: { downloadedAt: 'desc' },
    include: {
      content: { select: { title: true } },
      user: { select: { name: true } },
    },
    take: 50,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Unduhan</h1>
        <p className="text-sm text-muted-foreground">Riwayat unduhan file</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-background">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted text-left">
            <tr>
              <th className="px-4 py-3 font-medium text-muted-foreground">File</th>
              <th className="px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Konten</th>
              <th className="px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Pengguna</th>
              <th className="px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Tipe</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Tanggal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {downloads.map((d) => (
              <tr key={d.id} className="hover:bg-surface/50 transition-colors">
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2 font-medium text-foreground">
                    <Download className="h-3.5 w-3.5 text-muted-foreground" />
                    {d.filename}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{d.content.title}</td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{d.user?.name || '—'}</td>
                <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{d.mimeType}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {d.downloadedAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                </td>
              </tr>
            ))}
            {downloads.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                  Belum ada unduhan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
