import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { title, slug, excerpt, body: contentBody, type, status, channelId, tagIds, coverImage, readTime } = body;

  if (!title || !slug || !channelId) {
    return NextResponse.json({ error: 'Judul, slug, dan kanal wajib diisi' }, { status: 400 });
  }

  try {
    const content = await prisma.content.create({
      data: {
        title,
        slug,
        excerpt,
        body: contentBody,
        type: type || 'ARTICLE',
        status: status || 'DRAFT',
        channelId,
        coverImage,
        readTime: readTime || 5,
        authorId: (session.user as { id: string }).id,
        tags: {
          create: (tagIds || []).map((tagId: string) => ({ tagId })),
        },
      },
    });

    return NextResponse.json(content);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Gagal membuat konten';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const contents = await prisma.content.findMany({
    include: {
      channel: { select: { name: true, slug: true, color: true } },
      author: { select: { name: true } },
      tags: { include: { tag: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(contents);
}
