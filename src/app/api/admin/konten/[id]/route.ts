import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { title, slug, excerpt, body: contentBody, type, status, channelId, tagIds, coverImage, readTime } = body;

  if (!title || !slug || !channelId) {
    return NextResponse.json({ error: 'Judul, slug, dan kanal wajib diisi' }, { status: 400 });
  }

  try {
    // Disconnect existing tags, then reconnect
    await prisma.contentTag.deleteMany({ where: { contentId: id } });

    const content = await prisma.content.update({
      where: { id },
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
        tags: {
          create: (tagIds || []).map((tagId: string) => ({ tagId })),
        },
      },
    });

    return NextResponse.json(content);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Gagal memperbarui konten';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  const content = await prisma.content.findUnique({
    where: { id },
    include: {
      channel: true,
      author: { select: { id: true, name: true } },
      tags: { include: { tag: true } },
    },
  });

  if (!content) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(content);
}
