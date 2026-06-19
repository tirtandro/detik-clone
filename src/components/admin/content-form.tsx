'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TipTapEditor from './tiptap-editor';
import { Loader2, Save, Send, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { slugify } from '@/lib/utils';
import { toast } from 'sonner';

type Channel = { id: string; name: string; slug: string; color: string };
type Tag = { id: string; name: string; slug: string };

export default function ContentForm({
  channels,
  tags,
  initialData,
  isEditing,
}: {
  channels: Channel[];
  tags: Tag[];
  initialData?: {
    id?: string;
    title?: string;
    slug?: string;
    excerpt?: string;
    body?: string;
    type?: string;
    status?: string;
    channelId?: string;
    tagIds?: string[];
    coverImage?: string;
    readTime?: number;
  };
  isEditing?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [body, setBody] = useState(initialData?.body || '');
  const [title, setTitle] = useState(initialData?.title || '');
  const [autoSlug, setAutoSlug] = useState(initialData?.slug || '');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!initialData?.slug);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialData?.tagIds || []);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugManuallyEdited) {
      setAutoSlug(slugify(value));
    }
  }

  function toggleTag(tagId: string) {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  }

  async function handleSubmit(status: string) {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(isEditing ? `/api/admin/konten/${initialData?.id}` : '/api/admin/konten', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug: autoSlug,
          excerpt: (document.getElementById('excerpt') as HTMLTextAreaElement)?.value || '',
          body,
          type: (document.getElementById('type') as HTMLSelectElement)?.value || 'ARTICLE',
          status,
          channelId: (document.getElementById('channelId') as HTMLSelectElement)?.value || '',
          tagIds: selectedTags,
          coverImage: (document.getElementById('coverImage') as HTMLInputElement)?.value || '',
          readTime: parseInt((document.getElementById('readTime') as HTMLInputElement)?.value || '0', 10),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Gagal menyimpan konten');
      }

      toast.success(status === 'PUBLISHED' ? 'Konten berhasil diterbitkan' : 'Draft berhasil disimpan');
      router.push('/admin/konten');
      router.refresh();
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Terjadi kesalahan';
      setError(message);
      toast.error(message);
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">
              Judul
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="block w-full rounded-lg border border-border bg-background px-4 py-2.5 text-lg font-semibold text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Judul konten..."
              required
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-foreground mb-1">
              Slug
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground shrink-0">/konten/</span>
              <input
                id="slug"
                type="text"
                value={autoSlug}
                onChange={(e) => {
                  setAutoSlug(e.target.value);
                  setSlugManuallyEdited(true);
                }}
                className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="judul-konten"
              />
            </div>
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-foreground mb-1">
              Ringkasan
            </label>
            <textarea
              id="excerpt"
              rows={3}
              defaultValue={initialData?.excerpt || ''}
              className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Ringkasan singkat konten..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Isi Konten
            </label>
            <TipTapEditor content={body} onChange={setBody} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-background p-4 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Publikasi</h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleSubmit('DRAFT')}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-surface transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Simpan Draft
              </button>
              <button
                type="button"
                onClick={() => handleSubmit('PUBLISHED')}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Terbitkan
              </button>
            </div>

            {isEditing && initialData?.status === 'PUBLISHED' && (
              <button
                type="button"
                onClick={() => handleSubmit('ARCHIVED')}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
              >
                <Trash2 className="h-4 w-4" />
                Arsipkan
              </button>
            )}
          </div>

          <div className="rounded-xl border border-border bg-background p-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Detail</h3>

            <div>
              <label htmlFor="type" className="block text-xs font-medium text-muted-foreground mb-1">
                Tipe Konten
              </label>
              <select
                id="type"
                defaultValue={initialData?.type || 'ARTICLE'}
                className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="ARTICLE">Artikel</option>
                <option value="RPP">RPP</option>
                <option value="SOAL">Soal</option>
                <option value="INFO_GURU">Info Guru</option>
                <option value="BEASISWA">Beasiswa</option>
                <option value="EDTECH">EdTech</option>
                <option value="KEBIJAKAN">Kebijakan</option>
                <option value="TIPS">Tips Mengajar</option>
                <option value="QUIZ">Kuis</option>
              </select>
            </div>

            <div>
              <label htmlFor="channelId" className="block text-xs font-medium text-muted-foreground mb-1">
                Kanal
              </label>
              <select
                id="channelId"
                defaultValue={initialData?.channelId || ''}
                className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                required
              >
                <option value="" disabled>Pilih kanal</option>
                {channels.map((ch) => (
                  <option key={ch.id} value={ch.id}>{ch.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="readTime" className="block text-xs font-medium text-muted-foreground mb-1">
                Waktu Baca (menit)
              </label>
              <input
                id="readTime"
                type="number"
                min={1}
                defaultValue={initialData?.readTime || 5}
                className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-background p-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Gambar Sampul</h3>
            <input
              id="coverImage"
              type="text"
              defaultValue={initialData?.coverImage || ''}
              className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="URL gambar sampul"
            />
            <p className="text-xs text-muted-foreground">
              Unggah gambar dari halaman{' '}
              <a href="/admin/media" className="text-primary hover:underline">Media</a>
            </p>
          </div>

          <div className="rounded-xl border border-border bg-background p-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Tag</h3>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleTag(tag.id)}
                  className={cn(
                    'rounded-full px-2.5 py-1 text-xs font-medium transition-colors',
                    selectedTags.includes(tag.id)
                      ? 'bg-emerald-600 text-white'
                      : 'bg-surface text-muted-foreground hover:text-foreground'
                  )}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
