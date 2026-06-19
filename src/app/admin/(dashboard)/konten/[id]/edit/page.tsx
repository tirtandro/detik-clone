import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/dal';
import { notFound } from 'next/navigation';
import ContentForm from '@/components/admin/content-form';

export default async function EditContentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAuth();
  const { id } = await params;

  const [content, channels, tags] = await Promise.all([
    prisma.content.findUnique({
      where: { id },
      include: { tags: { select: { tagId: true } } },
    }),
    prisma.channel.findMany({ orderBy: { order: 'asc' } }),
    prisma.tag.findMany({ orderBy: { name: 'asc' } }),
  ]);

  if (!content) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Edit Konten</h1>
      <ContentForm
        channels={channels}
        tags={tags}
        initialData={{
          id: content.id,
          title: content.title,
          slug: content.slug,
          excerpt: content.excerpt || '',
          body: content.body || '',
          type: content.type,
          status: content.status,
          channelId: content.channelId,
          tagIds: content.tags.map((t) => t.tagId),
          coverImage: content.coverImage || '',
          readTime: content.readTime || 5,
        }}
        isEditing
      />
    </div>
  );
}
