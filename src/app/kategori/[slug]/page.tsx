import { prisma } from '@/lib/prisma'
import { ArticleCard } from '@/components/ArticleCard'
import { notFound } from 'next/navigation'

interface KategoriPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await prisma.category.findMany()
  return categories.map((cat) => ({ slug: cat.slug }))
}

export default async function KategoriPage({ params }: KategoriPageProps) {
  const { slug } = await params
  const category = await prisma.category.findUnique({
    where: { slug },
  })

  if (!category) {
    notFound()
  }

  const articles = await prisma.article.findMany({
    where: { published: true, categoryId: category.id },
    include: {
      category: true,
      author: { select: { name: true } },
    },
    orderBy: { publishedAt: 'desc' },
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
        {category.description && (
          <p className="text-gray-600 mt-1">{category.description}</p>
        )}
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Belum ada artikel di kategori ini</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}