import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, slug, content, excerpt, categoryId, published, tagIds } = body

    if (!title || !slug || !content || !categoryId) {
      return NextResponse.json(
        { error: 'Judul, slug, konten, dan kategori harus diisi' },
        { status: 400 }
      )
    }

    const existingSlug = await prisma.article.findUnique({ where: { slug } })
    if (existingSlug) {
      return NextResponse.json(
        { error: 'Slug sudah digunakan' },
        { status: 400 }
      )
    }

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        categoryId,
        published,
        publishedAt: published ? new Date() : null,
        authorId: 'admin',
      },
    })

    if (tagIds && tagIds.length > 0) {
      await prisma.articleTag.createMany({
        data: tagIds.map((tagId: string) => ({
          articleId: article.id,
          tagId,
        })),
      })
    }

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: 'Gagal membuat artikel' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, slug, content, excerpt, categoryId, published, tagIds } = body

    if (!id) {
      return NextResponse.json({ error: 'ID artikel diperlukan' }, { status: 400 })
    }

    const existingArticle = await prisma.article.findFirst({
      where: { slug, NOT: { id } },
    })
    if (existingArticle) {
      return NextResponse.json({ error: 'Slug sudah digunakan' }, { status: 400 })
    }

    const article = await prisma.article.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        categoryId,
        published,
        publishedAt: published ? new Date() : null,
      },
    })

    if (tagIds) {
      await prisma.articleTag.deleteMany({ where: { articleId: id } })
      if (tagIds.length > 0) {
        await prisma.articleTag.createMany({
          data: tagIds.map((tagId: string) => ({
            articleId: id,
            tagId,
          })),
        })
      }
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json(
      { error: 'Gagal memperbarui artikel' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID artikel diperlukan' }, { status: 400 })
    }

    await prisma.article.delete({ where: { id } })
    
    return NextResponse.json({ message: 'Artikel berhasil dihapus' })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json(
      { error: 'Gagal menghapus artikel' },
      { status: 500 }
    )
  }
}