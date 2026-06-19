import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/dal';
import Link from 'next/link';
import { Plus, FileText, Eye, Calendar } from 'lucide-react';

export default async function ContentListPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; channel?: string; status?: string; page?: string }>;
}) {
  await requireAuth();
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || '1', 10));
  const limit = 20;
  const channelSlug = params.channel;
  const status = params.status;
  const search = params.q;

  const where: Record<string, unknown> = {};
  if (channelSlug) where.channel = { slug: channelSlug };
  if (status) where.status = status;
  if (search) where.title = { contains: search, mode: 'insensitive' };

  const [contents, total, channels] = await Promise.all([
    prisma.content.findMany({
      where,
      include: {
        channel: { select: { name: true, slug: true, color: true } },
        author: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.content.count({ where }),
    prisma.channel.findMany({ orderBy: { order: 'asc' } }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Konten</h1>
          <p className="text-sm text-muted-foreground">{total} konten</p>
        </div>
        <Link
          href="/admin/konten/buat"
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Buat Konten
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link
          href="/admin/konten"
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            !channelSlug && !status ? 'bg-emerald-600 text-white' : 'bg-surface text-muted-foreground hover:text-foreground'
          }`}
        >
          Semua
        </Link>
        {channels.map((ch) => (
          <Link
            key={ch.slug}
            href={`/admin/konten?channel=${ch.slug}`}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              channelSlug === ch.slug ? 'bg-emerald-600 text-white' : 'bg-surface text-muted-foreground hover:text-foreground'
            }`}
          >
            {ch.name}
          </Link>
        ))}
        <Link
          href="/admin/konten?status=DRAFT"
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            status === 'DRAFT' ? 'bg-emerald-600 text-white' : 'bg-surface text-muted-foreground hover:text-foreground'
          }`}
        >
          Draft
        </Link>
        <Link
          href="/admin/konten?status=PUBLISHED"
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            status === 'PUBLISHED' ? 'bg-emerald-600 text-white' : 'bg-surface text-muted-foreground hover:text-foreground'
          }`}
        >
          Terbit
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-background">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted text-left">
            <tr>
              <th className="px-4 py-3 font-medium text-muted-foreground">Judul</th>
              <th className="px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Kanal</th>
              <th className="px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Status</th>
              <th className="px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Penulis</th>
              <th className="px-4 py-3 font-medium text-muted-foreground text-right">
                <Eye className="h-4 w-4 inline" />
              </th>
              <th className="px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">
                <Calendar className="h-4 w-4 inline" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {contents.map((item) => (
              <tr key={item.id} className="hover:bg-surface/50 transition-colors">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/konten/${item.id}/edit`}
                    className="font-medium text-foreground hover:text-emerald-600 transition-colors"
                  >
                    {item.title}
                  </Link>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{item.type}</span>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span
                    className="inline-block rounded-full px-2 py-0.5 text-xs font-medium"
                    style={{ backgroundColor: item.channel.color + '15', color: item.channel.color }}
                  >
                    {item.channel.name}
                  </span>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                    item.status === 'PUBLISHED'
                      ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400'
                      : item.status === 'DRAFT'
                      ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400'
                      : 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {item.status === 'PUBLISHED' ? 'Terbit' : item.status === 'DRAFT' ? 'Draft' : 'Arsip'}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                  {item.author.name}
                </td>
                <td className="px-4 py-3 text-right text-muted-foreground">
                  {item.viewCount}
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                  {item.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
              </tr>
            ))}
            {contents.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                  <FileText className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  Belum ada konten
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/admin/konten?page=${p}${channelSlug ? `&channel=${channelSlug}` : ''}${status ? `&status=${status}` : ''}`}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors ${
                p === page
                  ? 'bg-emerald-600 text-white'
                  : 'text-muted-foreground hover:bg-surface hover:text-foreground'
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
