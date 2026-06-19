import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { ArticleForm } from '../baru/ArticleForm'

interface AdminEditArticlePageProps {
  params: Promise<{ id: string }>
}

export default async function AdminEditArticlePage({ params }: AdminEditArticlePageProps) {
  const { id } = await params

  const article = await prisma.article.findUnique({
    where: { id },
    include: {
      tags: { select: { tagId: true } },
    },
  })

  if (!article) {
    notFound()
  }

  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' },
  })

  const tags = await prisma.tag.findMany({
    orderBy: { name: 'asc' },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Artikel</h1>
      <ArticleForm
        categories={categories}
        tags={tags}
        initialData={{
          id: article.id,
          title: article.title,
          slug: article.slug,
          content: article.content,
          excerpt: article.excerpt,
          published: article.published,
          categoryId: article.categoryId,
          tagIds: article.tags.map((t) => t.tagId),
        }}
      />
    </div>
  )
}