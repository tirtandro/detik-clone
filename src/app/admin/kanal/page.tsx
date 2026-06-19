import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/dal';
import { Plus, GripVertical } from 'lucide-react';

export default async function ChannelsPage() {
  await requireAuth();
  const channels = await prisma.channel.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Kanal</h1>
          <p className="text-sm text-muted-foreground">{channels.length} kanal</p>
        </div>
      </div>

      <div className="space-y-2">
        {channels.map((ch, i) => (
          <div
            key={ch.id}
            className="flex items-center gap-4 rounded-xl border border-border bg-background p-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg text-white font-bold text-sm shrink-0"
              style={{ backgroundColor: ch.color }}>
              {ch.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground">{ch.name}</p>
              <p className="text-sm text-muted-foreground truncate">
                /{ch.slug} &middot; {ch.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Urutan: {ch.order}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
