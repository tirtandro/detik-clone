'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { getContentTypeLabel } from '@/lib/utils';
import type { ContentType } from '@/types';

const CONTENT_TYPES_BY_CHANNEL: Record<string, ContentType[]> = {
  'artikel': ['artikel'],
  'perencanaan-pembelajaran': ['rpp', 'atp', 'modul', 'cp-tp-atp', 'asesmen'],
  'soal-latihan': ['soal', 'lks', 'simulasi', 'kisi-kisi'],
  'info-guru': ['info-pkg', 'tunjangan', 'pangkat', 'mutasi'],
  'beasiswa-kuliah': ['beasiswa-dalam', 'beasiswa-luar', 'snbt-snbp', 'info-ptn'],
  'edtech-inovasi': ['edtech-review', 'ai-tools', 'media-pembelajaran', 'sertifikasi'],
  'kebijakan': ['kebijakan-kemdikbud', 'kurikulum-merdeka', 'regulasi'],
  'tips-mengajar': ['tips-mengajar', 'classroom-management', 'diferensiasi', 'konseling', 'literasi'],
};

export function ChannelFilter({ channel }: { channel: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeType = searchParams.get('type');

  const types = CONTENT_TYPES_BY_CHANNEL[channel] || [];

  const cleanPath = pathname.split('?')[0];

  const buildHref = (type?: string) => {
    if (!type) return cleanPath;
    return `${cleanPath}?type=${type}`;
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={cleanPath}
        className={cn(
          'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
          !activeType
            ? 'bg-emerald-600 text-white'
            : 'bg-muted text-foreground hover:bg-[var(--surface-hover)]'
        )}
      >
        Semua
      </Link>
      {types.map((type) => (
        <Link
          key={type}
          href={buildHref(type)}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
            activeType === type
              ? 'bg-emerald-600 text-white'
              : 'bg-muted text-foreground hover:bg-[var(--surface-hover)]'
          )}
        >
          {getContentTypeLabel(type)}
        </Link>
      ))}
    </div>
  );
}
