import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta',
  });
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'baru saja';
  if (diffMins < 60) return `${diffMins} menit yang lalu`;
  if (diffHours < 24) return `${diffHours} jam yang lalu`;
  if (diffDays < 7) return `${diffDays} hari yang lalu`;
  return formatDate(dateString);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}jt`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}rb`;
  return num.toString();
}

export function formatFileSize(sizeInBytes: number): string {
  if (sizeInBytes >= 1048576) return `${(sizeInBytes / 1048576).toFixed(1)} MB`;
  if (sizeInBytes >= 1024) return `${(sizeInBytes / 1024).toFixed(0)} KB`;
  return `${sizeInBytes} B`;
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

export function getChannelName(slug: string): string {
  const channelMap: Record<string, string> = {
    'artikel': 'Artikel Pendidikan',
    'perencanaan-pembelajaran': 'Perencanaan Pembelajaran & Capaian',
    'soal-latihan': 'Soal & Latihan',
    'info-guru': 'Informasi Guru',
    'beasiswa-kuliah': 'Beasiswa & Kuliah',
    'edtech-inovasi': 'EdTech & Inovasi',
    'kebijakan': 'Kebijakan Pendidikan',
    'tips-mengajar': 'Tips Mengajar',
  };
  return channelMap[slug] || slug;
}

export function getContentTypeLabel(type: string): string {
  const labelMap: Record<string, string> = {
    'artikel': 'Artikel',
    'rpp': 'RPP',
    'atp': 'ATP',
    'modul': 'Modul Ajar',
    'cp-tp-atp': 'CP/TP/ATP Mapping',
    'asesmen': 'Contoh Asesmen',
    'soal': 'Bank Soal',
    'lks': 'LKS',
    'simulasi': 'Simulasi',
    'kisi-kisi': 'Kisi-kisi',
    'info-pkg': 'Info PKG',
    'tunjangan': 'Info Tunjangan',
    'pangkat': 'Kenaikan Pangkat',
    'mutasi': 'Info Mutasi',
    'beasiswa-dalam': 'Beasiswa Dalam Negeri',
    'beasiswa-luar': 'Beasiswa Luar Negeri',
    'snbt-snbp': 'SNBP/SNBT',
    'info-ptn': 'Info PTN/PTS',
    'edtech-review': 'Review EdTech',
    'ai-tools': 'AI Tools',
    'media-pembelajaran': 'Media Pembelajaran',
    'sertifikasi': 'Sertifikasi',
    'kebijakan-kemdikbud': 'Kebijakan Kemendikdasmen',
    'kurikulum-merdeka': 'Kurikulum Merdeka',
    'regulasi': 'Regulasi',
    'tips-mengajar': 'Tips Mengajar',
    'classroom-management': 'Classroom Management',
    'diferensiasi': 'Pembelajaran Diferensiasi',
    'konseling': 'Konseling',
    'literasi': 'Literasi',
  };
  return labelMap[type] || type;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}