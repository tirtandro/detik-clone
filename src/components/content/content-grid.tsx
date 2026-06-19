import type { ContentItem } from '@/types';
import { getChannelName } from '@/lib/utils';
import { ContentCard } from './content-card';

export function ContentGrid({
  items,
  channel,
  variant = 'default',
  columns = 3,
}: {
  items: ContentItem[];
  channel?: string;
  variant?: 'default' | 'compact';
  columns?: 2 | 3 | 4;
}) {
  const colClass = columns === 2 ? 'sm:grid-cols-2' : columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <section>
      {channel && (
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">
            {getChannelName(channel)}
          </h2>
          <a
            href={`/${channel}`}
            className="text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
          >
            Lihat Semua &rarr;
          </a>
        </div>
      )}
      <div className={`grid grid-cols-1 gap-5 ${colClass}`}>
        {items.map((item) => (
          <ContentCard key={item.id} content={item} variant={variant} />
        ))}
      </div>
    </section>
  );
}
