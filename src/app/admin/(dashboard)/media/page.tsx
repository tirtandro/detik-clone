import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/dal';
import { ImageIcon } from 'lucide-react';

export default async function MediaPage() {
  await requireAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Media</h1>
        <p className="text-sm text-muted-foreground">Upload dan kelola gambar</p>
      </div>

      <div className="rounded-xl border border-dashed border-border bg-surface p-12 text-center">
        <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-sm text-muted-foreground mb-2">
          Unggah gambar ke Cloudflare R2
        </p>
        <p className="text-xs text-muted-foreground mb-6">
          (konfigurasi R2_KEY_ID dan R2_SECRET_ACCESS_KEY di .env)
        </p>
        <input
          type="file"
          accept="image/*"
          multiple
          disabled
          className="block mx-auto text-sm text-muted-foreground file:mr-4 file:rounded-lg file:border file:border-border file:bg-background file:px-4 file:py-2 file:text-sm file:text-foreground hover:file:bg-surface disabled:opacity-50"
        />
      </div>
    </div>
  );
}
