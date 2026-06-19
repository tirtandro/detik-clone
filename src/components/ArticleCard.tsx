'use client'

import Link from 'next/link'
import { formatDateShort, truncate } from '@/lib/utils'

interface ArticleCardProps {
  article: {
    id: string
    title: string
    slug: string
    excerpt?: string | null
    image?: string | null
    publishedAt?: Date | string | null
    category?: { name: string; slug: string }
    author?: { name?: string | null }
  }
  variant?: 'default' | 'compact' | 'hero'
}

export function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  if (variant === 'hero') {
    return (
      <Link href={`/artikel/${article.slug}`} className="group relative block overflow-hidden rounded-lg">
        <div className="aspect-[16/9] bg-gray-200">
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-medium rounded">
              {article.category?.name || 'Berita'}
            </span>
            {article.publishedAt && (
              <span className="text-white/80 text-xs">{formatDateShort(article.publishedAt)}</span>
            )}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2">
            {article.title}
          </h2>
          {article.author?.name && (
            <p className="text-sm text-gray-300 mt-2">{article.author.name}</p>
          )}
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link href={`/artikel/${article.slug}`} className="group flex items-start space-x-3 py-3 border-b border-gray-100 last:border-0">
        <div className="w-20 h-20 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{formatDateShort(article.publishedAt || new Date())}</p>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/artikel/${article.slug}`} className="group block">
      <div className="aspect-[16/10] bg-gray-200 rounded-lg overflow-hidden mb-3">
        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
          <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      <div className="flex items-center space-x-2 mb-1">
        <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-medium rounded">{article.category?.name || 'Berita'}</span>
        {article.publishedAt && <span className="text-xs text-gray-500">{formatDateShort(article.publishedAt)}</span>}
      </div>
      <h3 className="text-base font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
        {article.title}
      </h3>
      {article.excerpt && (
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{truncate(article.excerpt, 120)}</p>
      )}
    </Link>
  )
}