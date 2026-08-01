import { NextResponse } from 'next/server';

// In-memory counter for temporary view tracking
const views: Record<string, number> = {
  'jahe-merah': 23,
  'maggot-bsf': 15
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'Slug is required' }, { status: 400 });

  return NextResponse.json({ views: views[slug] || 0 });
}

export async function POST(request: Request) {
  try {
    const { slug } = await request.json();
    if (!slug) return NextResponse.json({ error: 'Slug is required' }, { status: 400 });

    views[slug] = (views[slug] || 0) + 1;
    return NextResponse.json({ views: views[slug] });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}