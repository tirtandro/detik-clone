export type ChannelSlug =
  | 'artikel'
  | 'perencanaan-pembelajaran'
  | 'soal-latihan'
  | 'info-guru'
  | 'beasiswa-kuliah'
  | 'edtech-inovasi'
  | 'kebijakan'
  | 'tips-mengajar';

export type ContentType =
  | 'artikel'
  | 'rpp'
  | 'atp'
  | 'modul'
  | 'cp-tp-atp'
  | 'asesmen'
  | 'soal'
  | 'lks'
  | 'simulasi'
  | 'kisi-kisi'
  | 'info-pkg'
  | 'tunjangan'
  | 'pangkat'
  | 'mutasi'
  | 'beasiswa-dalam'
  | 'beasiswa-luar'
  | 'snbt-snbp'
  | 'info-ptn'
  | 'edtech-review'
  | 'ai-tools'
  | 'media-pembelajaran'
  | 'sertifikasi'
  | 'kebijakan-kemdikbud'
  | 'kurikulum-merdeka'
  | 'regulasi'
  | 'tips-mengajar'
  | 'classroom-management'
  | 'diferensiasi'
  | 'konseling'
  | 'literasi';

export interface Channel {
  slug: ChannelSlug;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  contentTypes: ContentType[];
  href: string;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  bio?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface ContentItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  channel: ChannelSlug;
  contentType: ContentType;
  tags: Tag[];
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  viewCount: number;
  downloadCount?: number;
  downloadUrl?: string;
  fileSize?: string;
  fileType?: string;
  isFeatured: boolean;
  isTrending: boolean;
  seoTitle?: string;
  seoDescription?: string;
  relatedContentIds?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SearchFilters {
  query?: string;
  channel?: ChannelSlug;
  contentType?: ContentType;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
  sortBy?: 'relevance' | 'date' | 'popular' | 'trending';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResult {
  items: ContentItem[];
  total: number;
  filters: SearchFilters;
  suggestions: string[];
}

export interface UserPreferences {
  bookmarkedIds: string[];
  downloadedIds: string[];
  theme: 'light' | 'dark' | 'system';
  channels: ChannelSlug[];
  notifications: boolean;
}

export interface DownloadItem {
  id: string;
  contentId: string;
  title: string;
  fileName: string;
  fileUrl: string;
  fileSize: string;
  fileType: string;
  downloadedAt: string;
}

export interface NewsletterSubscriber {
  email: string;
  name?: string;
  channels?: ChannelSlug[];
  subscribedAt: string;
}