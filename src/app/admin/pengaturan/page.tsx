import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/dal';
import SettingsForm from './settings-form';

export default async function SettingsPage() {
  await requireAuth();
  const settings = await prisma.siteSetting.findMany();
  const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pengaturan</h1>
        <p className="text-sm text-muted-foreground">Konfigurasi platform ideguru</p>
      </div>
      <SettingsForm initialData={settingsMap} />
    </div>
  );
}
