import { PrismaClient, Role, ContentType, Status } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { hash } from 'bcryptjs';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const channels = [
  { slug: 'artikel-pendidikan', name: 'Artikel Pendidikan', description: 'Artikel mendalam tentang dunia pendidikan Indonesia', icon: 'BookOpen', color: '#059669', bgColor: '#ecfdf5', order: 0 },
  { slug: 'perencanaan-pembelajaran', name: 'Perencanaan Pembelajaran', description: 'ATP, modul ajar, dan perangkat pembelajaran', icon: 'ClipboardList', color: '#7c3aed', bgColor: '#f5f3ff', order: 1 },
  { slug: 'soal-latihan', name: 'Soal & Latihan', description: 'Bank soal, try out, dan latihan interaktif', icon: 'FileQuestion', color: '#2563eb', bgColor: '#eff6ff', order: 2 },
  { slug: 'info-guru', name: 'Info Guru', description: 'Informasi terkini untuk tenaga pendidik', icon: 'Bell', color: '#dc2626', bgColor: '#fef2f2', order: 3 },
  { slug: 'beasiswa-kuliah', name: 'Beasiswa & Kuliah', description: 'Informasi beasiswa dan perkuliahan', icon: 'GraduationCap', color: '#d97706', bgColor: '#fffbeb', order: 4 },
  { slug: 'edtech-inovasi', name: 'EdTech & Inovasi', description: 'Teknologi pendidikan dan inovasi pembelajaran', icon: 'Cpu', color: '#0891b2', bgColor: '#ecfeff', order: 5 },
  { slug: 'kebijakan-pendidikan', name: 'Kebijakan Pendidikan', description: 'Kebijakan dan regulasi pendidikan terbaru', icon: 'ScrollText', color: '#4f46e5', bgColor: '#eef2ff', order: 6 },
  { slug: 'tips-mengajar', name: 'Tips Mengajar', description: 'Tips dan trik mengajar dari praktisi', icon: 'Lightbulb', color: '#ea580c', bgColor: '#fff7ed', order: 7 },
];

const tagNames = [
  'kurikulum-merdeka', 'p5', 'pmm', 'ppg', 'sertifikasi', 'asn', 'cpns',
  'pembelajaran-diferensiasi', 'asesmen', 'rapor-pendidikan', 'digitalisasi',
  'ai-pembelajaran', 'merdeka-belajar', 'ptk', 'tunjangan', 'srm',
];

async function main() {
  console.log('Seeding database...');

  for (const ch of channels) {
    await prisma.channel.upsert({
      where: { slug: ch.slug },
      update: { name: ch.name, description: ch.description, color: ch.color, bgColor: ch.bgColor, order: ch.order },
      create: ch,
    });
  }
  console.log(`  ✓ ${channels.length} channels`);

  for (const name of tagNames) {
    await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name, slug: name },
    });
  }
  console.log(`  ✓ ${tagNames.length} tags`);

  const adminPassword = await hash('admin123', 12);
  await prisma.user.upsert({
    where: { email: 'admin@ideguru.id' },
    update: {},
    create: {
      name: 'Admin ideguru',
      email: 'admin@ideguru.id',
      passwordHash: adminPassword,
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });
  console.log('  ✓ Super admin (admin@ideguru.id / admin123)');

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
