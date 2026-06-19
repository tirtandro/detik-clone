import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/dal';
import ContentForm from '@/components/admin/content-form';

export default async function CreateContentPage() {
  await requireAuth();

  const [channels, tags] = await Promise.all([
    prisma.channel.findMany({ orderBy: { order: 'asc' } }),
    prisma.tag.findMany({ orderBy: { name: 'asc' } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Buat Konten Baru</h1>
      <ContentForm channels={channels} tags={tags} />
    </div>
  );
}
