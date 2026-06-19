import Link from 'next/link';
import { CHANNELS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export function ChannelCard({
  slug,
  name,
  description,
  color,
  bgColor,
}: {
  slug: string;
  name: string;
  description: string;
  color: string;
  bgColor: string;
}) {
  return (
    <Link
      href={`/${slug}`}
      className={cn(
        'group rounded-xl border-border p-5 transition-all hover:shadow-lg',
        bgColor
      )}
    >
      <h3 className={cn('text-lg font-bold', color)}>{name}</h3>
      <p className="mt-2 text-sm leading-snug text-foreground">
        {description}
      </p>
      <span className="mt-3 flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
        Jelajahi <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

export function ChannelGrid() {
  return (
    <section>
      <h2 className="mb-6 text-xl font-bold text-foreground">
        Jelajahi Kanal
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CHANNELS.map((channel) => (
          <ChannelCard
            key={channel.slug}
            slug={channel.slug}
            name={channel.name}
            description={channel.description}
            color={channel.color}
            bgColor={channel.bgColor}
          />
        ))}
      </div>
    </section>
  );
}
