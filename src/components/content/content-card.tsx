import Link from 'next/link';
import { Clock, Eye, Download } from 'lucide-react';
import type { ContentItem } from '@/types';
import { cn, formatRelativeTime, formatNumber, getContentTypeLabel } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export function ContentCard({
  content,
  variant = 'default',
  className,
}: {
  content: ContentItem;
  variant?: 'default' | 'compact' | 'horizontal' | 'hero';
  className?: string;
}) {
  if (variant === 'hero') {
    return (
      <Link href={`/konten/${content.slug}`} className={cn('group block', className)}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800">
          <div className="relative z-10 p-8 sm:p-12">
            <Badge className="mb-4 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30">
              {getContentTypeLabel(content.contentType)}
            </Badge>
            <h2 className="mb-3 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
              {content.title}
            </h2>
            <p className="mb-4 line-clamp-2 text-base text-emerald-100">
              {content.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-emerald-200">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {formatRelativeTime(content.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {formatNumber(content.viewCount)} dibaca
              </span>
              {content.downloadCount && (
                <span className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  {formatNumber(content.downloadCount)} diunduh
                </span>
              )}
              <span>{content.author.name}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link href={`/konten/${content.slug}`} className={cn('group block', className)}>
        <div className="flex items-start gap-4 border-b border-border-light pb-4 last:border-0">
          <div className="flex-1">
            <h3 className="text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
              {content.title}
            </h3>
            <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
              <span>{formatRelativeTime(content.publishedAt)}</span>
              <span>{content.readTime} menit</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={`/konten/${content.slug}`} className={cn('group block', className)}>
        <Card className="p-4">
          <Badge className={cn('mb-2', 'bg-muted text-foreground')}>
            {getContentTypeLabel(content.contentType)}
          </Badge>
          <h3 className="text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
            {content.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
            {content.excerpt}
          </p>
          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            <span>{formatRelativeTime(content.publishedAt)}</span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {formatNumber(content.viewCount)}
            </span>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/konten/${content.slug}`} className={cn('group block', className)}>
      <Card>
        <div className="p-5">
          <Badge className={cn('mb-3', 'bg-muted text-foreground')}>
            {getContentTypeLabel(content.contentType)}
          </Badge>
          <h3 className="text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
            {content.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {content.excerpt}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {formatRelativeTime(content.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              {formatNumber(content.viewCount)}
            </span>
            {content.downloadCount && (
              <span className="flex items-center gap-1">
                <Download className="h-3.5 w-3.5" />
                {formatNumber(content.downloadCount)}
              </span>
            )}
            <span>{content.readTime} menit</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
