import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    // Extremely basic “auth” placeholder:
    const authHeader = req.headers.get('x-admin-token');
    if (authHeader !== process.env.ADMIN_TOKEN) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, slug, excerpt, content } = await req.json();

    if (!title || !slug || !content) {
        return NextResponse.json(
            { error: 'Missing required fields' },
            { status: 400 },
        );
    }

    const post = await prisma.post.create({
        data: {
            title,
            slug,
            excerpt,
            content,
            published: true,
        },
    });

    return NextResponse.json(post, { status: 201 });
}