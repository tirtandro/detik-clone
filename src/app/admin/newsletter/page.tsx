import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/dal';
import { Mail, CheckCircle2, XCircle } from 'lucide-react';

export default async function NewsletterPage() {
  await requireAuth();
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { subscribedAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Newsletter</h1>
        <p className="text-sm text-muted-foreground">{subscribers.length} pelanggan</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-background">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted text-left">
            <tr>
              <th className="px-4 py-3 font-medium text-muted-foreground">Email</th>
              <th className="px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Nama</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Verifikasi</th>
              <th className="px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Tanggal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {subscribers.map((sub) => (
              <tr key={sub.id} className="hover:bg-surface/50 transition-colors">
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2 font-medium text-foreground">
                    <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                    {sub.email}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{sub.name || '—'}</td>
                <td className="px-4 py-3">
                  {sub.verified ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-yellow-500" />
                  )}
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                  {sub.subscribedAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-muted-foreground">
                  Belum ada pelanggan newsletter
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
