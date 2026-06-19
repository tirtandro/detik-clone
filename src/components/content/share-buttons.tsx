'use client';

import { Share2, Link as LinkIcon, MessageCircle, Twitter } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://ideguru.id/konten/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20-%20${encodedUrl}`,
      icon: MessageCircle,
      color: 'text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950',
    },
    {
      name: 'Twitter',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: Twitter,
      color: 'text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-950',
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Share2,
      color: 'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950',
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Bagikan:</span>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Bagikan ke ${link.name}`}
          className={cn(
            'rounded-lg p-2 transition-colors',
            link.color
          )}
        >
          <link.icon className="h-4 w-4" />
        </a>
      ))}
      <button
        onClick={copyToClipboard}
        aria-label="Salin tautan"
        className={cn(
          'rounded-lg p-2 transition-colors',
          copied
            ? 'text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950'
            : 'text-muted-foreground hover:bg-[var(--surface-hover)]'
        )}
      >
        {copied ? (
          <span className="text-xs font-medium">Tersalin</span>
        ) : (
          <LinkIcon className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
