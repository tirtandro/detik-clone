import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { formatDate, formatTime } from '@/lib/utils'
import Link from 'next/link'

interface ArtikelPageProps {
  params: Promise<{ slug: string }>
}

export default async function ArtikelPage({ params }: ArtikelPageProps) {
  const { slug } = await params

  const article = await prisma.article.findUnique({
    where: { slug },
    include: {
      category: true,
      author: { select: { name: true, image: true } },
      tags: {
        include: { tag: true },
      },
      comments: {
        include: {
          user: { select: { name: true, image: true } },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!article || !article.published) {
    notFound()
  }

  await prisma.article.update({
    where: { id: article.id },
    data: { views: { increment: 1 } },
  })

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
          <Link href={`/kategori/${article.category.slug}`} className="px-2 py-0.5 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700">
            {article.category.name}
          </Link>
          <span>{formatDate(article.publishedAt || article.createdAt)}</span>
          <span>{formatTime(article.publishedAt || article.createdAt)}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
          {article.title}
        </h1>

        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-900">{article.author.name || 'Admin'}</p>
            <p className="text-xs text-gray-500">Penulis</p>
          </div>
        </div>
      </div>

      <div className="aspect-[16/9] bg-gray-200 rounded-lg mb-8 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
          <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      {article.excerpt && (
        <p className="text-lg text-gray-600 italic mb-6 border-l-4 border-red-600 pl-4">
          {article.excerpt}
        </p>
      )}

      <div className="prose max-w-none">
        {article.content.split('\n').map((paragraph, i) => (
          paragraph.trim() ? <p key={i} className="mb-4 text-gray-800 leading-relaxed">{paragraph}</p> : null
        ))}
      </div>

      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200">
          <span className="text-sm font-medium text-gray-700">Tags:</span>
          {article.tags.map(({ tag }) => (
            <span key={tag.id} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer">
              {tag.name}
            </span>
          ))}
        </div>
      )}

      <section className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Komentar ({article.comments.length})
        </h2>

        <form className="mb-8">
          <textarea
            placeholder="Tulis komentar..."
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Kirim Komentar
            </button>
          </div>
        </form>

        <div className="space-y-6">
          {article.comments.length === 0 ? (
            <p className="text-gray-500 text-sm">Belum ada komentar. Jadilah yang pertama!</p>
          ) : (
            article.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-gray-600">
                    {comment.user.name?.[0] || 'U'}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm text-gray-900">{comment.user.name || 'User'}</span>
                    <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </article>
  )
}