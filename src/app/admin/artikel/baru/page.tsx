import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { ArticleForm } from './ArticleForm'

export default async function AdminNewArticlePage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' },
  })
  const tags = await prisma.tag.findMany({
    orderBy: { name: 'asc' },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tulis Artikel Baru</h1>
      <ArticleForm categories={categories} tags={tags} />
    </div>
  )
}