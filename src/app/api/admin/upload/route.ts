import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // For now, return a placeholder URL since R2 is not configured
    // TODO: Upload to R2 when R2_ env vars are set
    return NextResponse.json({
      url: 'https://placehold.co/800x400/059669/ffffff?text=Image+Upload',
      filename: file.name,
    });
  } catch {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
