import { prisma } from '@/lib/prisma'
import { ArticleCard } from '@/components/ArticleCard'

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const query = q || ''

  const articles = query
    ? await prisma.article.findMany({
        where: {
          published: true,
          OR: [
            { title: { contains: query } },
            { excerpt: { contains: query } },
            { content: { contains: query } },
          ],
        },
        include: {
          category: true,
          author: { select: { name: true } },
        },
        orderBy: { publishedAt: 'desc' },
      })
    : []

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <form action="/search" method="GET" className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Cari berita..."
            className="w-full pl-12 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </form>

      {query && (
        <div className="mb-6">
          <p className="text-gray-600">
            Hasil pencarian untuk: <span className="font-semibold text-gray-900">&quot;{query}&quot;</span>
            <span className="text-gray-400 ml-2">({articles.length} hasil)</span>
          </p>
        </div>
      )}

      {!query ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Cari Berita</h2>
          <p className="text-gray-500">Masukkan kata kunci untuk mencari berita</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Tidak Ditemukan</h2>
          <p className="text-gray-500">Tidak ada hasil untuk pencarian &quot;{query}&quot;</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}