import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/dal';
import Link from 'next/link';
import { Plus, Hash } from 'lucide-react';

export default async function TagsPage() {
  await requireAuth();
  const tags = await prisma.tag.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { contents: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tag</h1>
          <p className="text-sm text-muted-foreground">{tags.length} tag</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2"
          >
            <Hash className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{tag.name}</span>
            <span className="text-xs text-muted-foreground">({tag._count.contents})</span>
          </div>
        ))}
        {tags.length === 0 && (
          <div className="w-full py-12 text-center text-muted-foreground">
            <Hash className="mx-auto h-8 w-8 mb-2 opacity-50" />
            Belum ada tag
          </div>
        )}
      </div>
    </div>
  );
}
