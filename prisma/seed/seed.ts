import { PrismaClient } from '../../src/generated/prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const prisma = new PrismaClient({
  adapter: new PrismaLibSql({
    url: 'file:./dev.db',
  }),
})

async function main() {
  console.log('Seeding database...')

  const existingAdmin = await prisma.user.findUnique({ where: { email: 'admin@detik.com' } })
  if (existingAdmin) {
    console.log('Database already seeded. Skipping...')
    return
  }

  const admin = await prisma.user.create({
    data: {
      name: 'Admin Detik',
      email: 'admin@detik.com',
      password: 'admin123',
      role: 'ADMIN',
    },
  })

  const editor = await prisma.user.create({
    data: {
      name: 'Editor Detik',
      email: 'editor@detik.com',
      password: 'editor123',
      role: 'EDITOR',
    },
  })

  await prisma.user.create({
    data: {
      name: 'User Biasa',
      email: 'user@detik.com',
      password: 'user123',
      role: 'USER',
    },
  })

  const categoryData = [
    { name: 'Nasional', slug: 'nasional', description: 'Berita nasional Indonesia', order: 1 },
    { name: 'Internasional', slug: 'internasional', description: 'Berita internasional', order: 2 },
    { name: 'Ekonomi', slug: 'ekonomi', description: 'Berita ekonomi dan bisnis', order: 3 },
    { name: 'Tekno', slug: 'tekno', description: 'Berita teknologi', order: 4 },
    { name: 'Olahraga', slug: 'olahraga', description: 'Berita olahraga', order: 5 },
    { name: 'Hiburan', slug: 'hiburan', description: 'Berita hiburan', order: 6 },
    { name: 'Health', slug: 'health', description: 'Berita kesehatan', order: 7 },
    { name: 'Travel', slug: 'travel', description: 'Berita perjalanan', order: 8 },
  ]

  const categories = await Promise.all(
    categoryData.map((cat) =>
      prisma.category.create({ data: cat })
    )
  )

  const tagData = [
    { name: 'Politik', slug: 'politik' },
    { name: 'Ekonomi', slug: 'ekonomi' },
    { name: 'Teknologi', slug: 'teknologi' },
    { name: 'Kesehatan', slug: 'kesehatan' },
    { name: 'Olahraga', slug: 'olahraga' },
    { name: 'Hiburan', slug: 'hiburan' },
    { name: 'Pendidikan', slug: 'pendidikan' },
    { name: 'Lingkungan', slug: 'lingkungan' },
    { name: 'Hukum', slug: 'hukum' },
    { name: 'Budaya', slug: 'budaya' },
  ]

  const tags = await Promise.all(
    tagData.map((tag) => prisma.tag.create({ data: tag }))
  )

  const articleTemplates = [
    {
      title: 'Presiden Resmikan Proyek Infrastruktur Baru di Jawa Tengah',
      slug: 'presiden-resmikan-proyek-infrastruktur-baru-di-jawa-tengah',
      excerpt: 'Presiden meresmikan proyek infrastruktur senilai Rp 10 triliun yang diharapkan dapat mendorong pertumbuhan ekonomi di wilayah Jawa Tengah.',
      content: 'Presiden Republik Indonesia hari ini meresmikan proyek infrastruktur baru di Jawa Tengah. Proyek yang menelan biaya hingga Rp 10 triliun ini meliputi pembangunan jalan tol, jembatan, dan fasilitas publik lainnya.\n\nDalam sambutannya, Presiden menyatakan bahwa proyek ini merupakan bagian dari program pembangunan nasional yang bertujuan untuk meningkatkan konektivitas antar daerah dan mendorong pertumbuhan ekonomi.\n\n"Mudah-mudahan dengan adanya proyek ini, perekonomian di Jawa Tengah dan sekitarnya dapat semakin berkembang," ujar Presiden.\n\nProyek ini ditargetkan selesai dalam waktu dua tahun dan akan menyerap ribuan tenaga kerja lokal.',
      categoryIdx: 0,
      published: true,
      publishedAt: new Date('2026-06-18'),
      views: 1500,
      authorId: admin.id,
      tagIndices: [0, 8],
    },
    {
      title: 'Pasar Saham Asia Menguat Dipicu Data Ekonomi AS',
      slug: 'pasar-saham-asia-menguat-dipicu-data-ekonomi-as',
      excerpt: 'Bursa saham Asia bergerak menguat setelah rilis data ekonomi Amerika Serikat yang lebih baik dari perkiraan.',
      content: 'Pasar saham Asia mengalami penguatan pada perdagangan hari ini, dipicu oleh rilis data ekonomi Amerika Serikat yang menunjukkan pertumbuhan lebih baik dari perkiraan.\n\nIndeks Nikkei Jepang naik 1,5%, diikuti oleh Kospi Korea Selatan yang menguat 1,2%. Sementara itu, indeks Shanghai Composite juga mencatatkan kenaikan tipis.\n\nPara analis memperkirakan sentimen positif ini akan berlanjut dalam beberapa hari ke depan seiring dengan optimisme pemulihan ekonomi global.',
      categoryIdx: 2,
      published: true,
      publishedAt: new Date('2026-06-17'),
      views: 1200,
      authorId: editor.id,
      tagIndices: [2, 0],
    },
    {
      title: 'Startup Indonesia Raih Pendanaan Seri B Senilai Rp 500 Miliar',
      slug: 'startup-indonesia-raih-pendanaan-seri-b-senilai-rp-500-miliar',
      excerpt: 'Startup teknologi Indonesia berhasil mengamankan pendanaan Seri B yang dipimpin oleh investor global.',
      content: 'Startup teknologi asal Indonesia, TechInnovate, hari ini mengumumkan keberhasilan meraih pendanaan Seri B senilai Rp 500 miliar. Putaran pendanaan ini dipimpin oleh Global Ventures Capital.\n\nDana segar ini akan digunakan untuk memperluas jangkauan pasar, mengembangkan produk baru, dan merekrut talenta-talenta terbaik di bidang teknologi.\n\nCEO TechInnovate menyatakan bahwa pendanaan ini akan membantu perusahaan mencapai visinya untuk menjadi platform teknologi terdepan di Asia Tenggara.',
      categoryIdx: 3,
      published: true,
      publishedAt: new Date('2026-06-16'),
      views: 980,
      authorId: admin.id,
      tagIndices: [2],
    },
    {
      title: 'Timnas Indonesia Siap Berlaga di Kualifikasi Piala Dunia',
      slug: 'timnas-indonesia-siap-berlaga-di-kualifikasi-piala-dunia',
      excerpt: 'Tim Nasional Indonesia mempersiapkan diri untuk menghadapi pertandingan kualifikasi Piala Dunia melawan lawan tangguh.',
      content: 'Tim Nasional Indonesia terus mempersiapkan diri menghadapi pertandingan kualifikasi Piala Dunia yang akan digelar dalam waktu dekat. Pelatih Timnas menyatakan bahwa para pemain dalam kondisi fit dan siap bertanding.\n\n"Kami sudah melakukan persiapan maksimal untuk pertandingan ini. Para pemain menunjukkan semangat dan determinasi yang tinggi," ujar pelatih.\n\nPertandingan akan digelar di Stadion Utama Gelora Bung Karno dan diharapkan dapat disaksikan oleh puluhan ribu suporter.',
      categoryIdx: 4,
      published: true,
      publishedAt: new Date('2026-06-15'),
      views: 2100,
      authorId: editor.id,
      tagIndices: [4],
    },
    {
      title: 'Festival Film Internasional Digelar di Jakarta',
      slug: 'festival-film-internasional-digelar-di-jakarta',
      excerpt: 'Jakarta menjadi tuan rumah festival film internasional yang menampilkan karya-karya dari berbagai negara.',
      content: 'Jakarta International Film Festival resmi digelar hari ini di berbagai venue di ibu kota. Festival ini menampilkan lebih dari 100 film dari 30 negara.\n\nAcara pembukaan dimeriahkan oleh para sineas ternama tanah air dan mancanegara. Festival ini akan berlangsung selama dua minggu dan menampilkan berbagai genre film.\n\n"Masyarakat Jakarta dapat menikmati film-film berkualitas dari seluruh dunia," kata ketua penyelenggara festival.',
      categoryIdx: 5,
      published: true,
      publishedAt: new Date('2026-06-14'),
      views: 750,
      authorId: admin.id,
      tagIndices: [5, 9],
    },
    {
      title: 'Tips Menjaga Kesehatan Mental di Era Digital',
      slug: 'tips-menjaga-kesehatan-mental-di-era-digital',
      excerpt: 'Pakar kesehatan berbagi tips untuk menjaga kesehatan mental di tengah derasnya arus informasi digital.',
      content: 'Di era digital seperti sekarang, menjaga kesehatan mental menjadi semakin penting. Pakar kesehatan membagikan beberapa tips untuk tetap sehat secara mental.\n\nPertama, batasi waktu penggunaan media sosial. Kedua, lakukan aktivitas fisik secara teratur. Ketiga, jaga pola tidur yang sehat. Keempat, luangkan waktu untuk berinteraksi langsung dengan orang-orang terdekat.\n\n"Mengelola stres di era digital membutuhkan kesadaran dan disiplin diri," ujar psikolog klinis.',
      categoryIdx: 6,
      published: true,
      publishedAt: new Date('2026-06-13'),
      views: 1800,
      authorId: editor.id,
      tagIndices: [3],
    },
    {
      title: '5 Destinasi Wisata Alam Tersembunyi di Indonesia Timur',
      slug: '5-destinasi-wisata-alam-tersembunyi-di-indonesia-timur',
      excerpt: 'Jelajahi keindahan alam Indonesia Timur yang masih tersembunyi dan jarang dikunjungi wisatawan.',
      content: 'Indonesia Timur menyimpan banyak destinasi wisata alam yang masih tersembunyi dan belum banyak dikenal. Berikut 5 destinasi yang wajib dikunjungi:\n\n1. Pantai Pink di Flores\n2. Danau Tiga Warna di Kelimutu\n3. Raja Ampat di Papua Barat\n4. Taman Nasional Komodo\n5. Kepulauan Banda di Maluku\n\nDestinasi-destinasi ini menawarkan keindahan alam yang luar biasa dengan suasana yang masih alami.',
      categoryIdx: 7,
      published: true,
      publishedAt: new Date('2026-06-12'),
      views: 3200,
      authorId: admin.id,
      tagIndices: [9],
    },
    {
      title: 'Inovasi Teknologi Ramah Lingkungan untuk Masa Depan',
      slug: 'inovasi-teknologi-ramah-lingkungan-untuk-masa-depan',
      excerpt: 'Berbagai inovasi teknologi ramah lingkungan dikembangkan untuk mengatasi perubahan iklim.',
      content: 'Perubahan iklim menjadi tantangan global yang membutuhkan solusi inovatif. Berbagai perusahaan teknologi berlomba mengembangkan solusi ramah lingkungan.\n\nMulai dari panel surya yang lebih efisien, baterai ramah lingkungan, hingga sistem pertanian vertikal. Semua inovasi ini diharapkan dapat membantu mengurangi dampak perubahan iklim.\n\n"Teknologi ramah lingkungan bukan lagi pilihan, melainkan kebutuhan," ujar pakar lingkungan.',
      categoryIdx: 3,
      published: true,
      publishedAt: new Date('2026-06-11'),
      views: 650,
      authorId: editor.id,
      tagIndices: [2, 7],
    },
    {
      title: 'Pemerintah Luncurkan Program Beasiswa Baru untuk Mahasiswa',
      slug: 'pemerintah-luncurkan-program-beasiswa-baru-untuk-mahasiswa',
      excerpt: 'Program beasiswa baru dari pemerintah akan mendukung ribuan mahasiswa Indonesia untuk melanjutkan pendidikan.',
      content: 'Pemerintah melalui Kementerian Pendidikan meluncurkan program beasiswa baru yang ditujukan bagi mahasiswa berprestasi dari keluarga kurang mampu.\n\nProgram ini akan memberikan bantuan biaya pendidikan dan biaya hidup selama masa studi. Ribuan mahasiswa dari seluruh Indonesia diharapkan dapat merasakan manfaat dari program ini.\n\nPendaftaran program beasiswa akan dibuka mulai bulan depan dan dapat diakses melalui portal resmi.',
      categoryIdx: 0,
      published: true,
      publishedAt: new Date('2026-06-10'),
      views: 890,
      authorId: admin.id,
      tagIndices: [6],
    },
    {
      title: 'Hasil Penelitian: Konsumsi Kopi Bermanfaat untuk Kesehatan Jantung',
      slug: 'hasil-penelitian-konsumsi-kopi-bermanfaat-untuk-kesehatan-jantung',
      excerpt: 'Studi terbaru menunjukkan bahwa konsumsi kopi dalam jumlah moderat dapat menurunkan risiko penyakit jantung.',
      content: 'Sebuah studi terbaru yang diterbitkan dalam jurnal kesehatan terkemuka menunjukkan bahwa konsumsi kopi secara moderat dapat memberikan manfaat bagi kesehatan jantung.\n\nPenelitian yang melibatkan lebih dari 100.000 partisipan ini menemukan bahwa mereka yang mengonsumsi 2-3 cangkir kopi per hari memiliki risiko penyakit jantung yang lebih rendah.\n\n"Kopi mengandung antioksidan yang baik untuk tubuh," jelas peneliti utama.',
      categoryIdx: 6,
      published: true,
      publishedAt: new Date('2026-06-09'),
      views: 1450,
      authorId: editor.id,
      tagIndices: [3],
    },
  ]

  for (const template of articleTemplates) {
    const article = await prisma.article.create({
      data: {
        title: template.title,
        slug: template.slug,
        excerpt: template.excerpt,
        content: template.content,
        categoryId: categories[template.categoryIdx].id,
        published: template.published,
        publishedAt: template.publishedAt,
        views: template.views,
        authorId: template.authorId,
      },
    })

    if (template.tagIndices.length > 0) {
      await prisma.articleTag.createMany({
        data: template.tagIndices.map((tagIdx) => ({
          articleId: article.id,
          tagId: tags[tagIdx].id,
        })),
      })
    }
  }

  const sampleComments = [
    { content: 'Berita yang sangat informatif. Terima kasih!', articleIdx: 0, userId: admin.id },
    { content: 'Semoga proyek ini berjalan lancar dan bermanfaat bagi masyarakat.', articleIdx: 0, userId: editor.id },
    { content: 'Kabar baik untuk perekonomian Indonesia.', articleIdx: 2, userId: admin.id },
    { content: 'Selamat bertanding Timnas! Indonesia bisa!', articleIdx: 3, userId: editor.id },
    { content: 'Tips yang sangat berguna, akan segera saya praktikkan.', articleIdx: 5, userId: admin.id },
  ]

  for (const comment of sampleComments) {
    const article = await prisma.article.findFirst({
      where: { title: articleTemplates[comment.articleIdx].title },
    })
    if (article) {
      await prisma.comment.create({
        data: {
          content: comment.content,
          userId: comment.userId,
          articleId: article.id,
        },
      })
    }
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
