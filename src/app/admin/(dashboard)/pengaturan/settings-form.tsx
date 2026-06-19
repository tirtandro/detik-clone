'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsForm({ initialData }: { initialData: Record<string, string> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fields = [
    { key: 'site_title', label: 'Judul Situs', type: 'text', placeholder: 'ideguru' },
    { key: 'site_description', label: 'Deskripsi Situs', type: 'textarea', placeholder: 'Deskripsi...' },
    { key: 'site_logo', label: 'URL Logo', type: 'text', placeholder: '/logo.png' },
    { key: 'og_title', label: 'OG Title (default)', type: 'text' },
    { key: 'og_description', label: 'OG Description (default)', type: 'textarea' },
    { key: 'og_image', label: 'OG Image URL', type: 'text' },
    { key: 'twitter_handle', label: 'Twitter/X Handle', type: 'text', placeholder: '@ideguru' },
    { key: 'ga_id', label: 'Google Analytics ID', type: 'text', placeholder: 'G-XXXXXXXXXX' },
    { key: 'footer_text', label: 'Footer Text', type: 'text', placeholder: '© 2026 ideguru' },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData(e.target as HTMLFormElement);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => { data[key] = value.toString(); });

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Gagal menyimpan');
      toast.success('Pengaturan berhasil disimpan');
      router.refresh();
    } catch {
      toast.error('Gagal menyimpan pengaturan');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <div className="grid gap-6 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.key} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
            <label htmlFor={field.key} className="block text-sm font-medium text-foreground mb-1">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.key}
                name={field.key}
                rows={3}
                defaultValue={initialData[field.key] || ''}
                placeholder={field.placeholder}
                className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            ) : (
              <input
                id={field.key}
                name={field.key}
                type={field.type}
                defaultValue={initialData[field.key] || ''}
                placeholder={field.placeholder}
                className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            )}
          </div>
        ))}
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Simpan Pengaturan
        </button>
      </div>
    </form>
  );
}
