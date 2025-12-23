// src/app/api/admin/posts/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { title, slug, excerpt, content } = await req.json();

        if (!title || !slug) {
            return NextResponse.json(
                { error: 'Missing required fields: title, slug' },
                { status: 400 }
            );
        }

        const post = await prisma.post.create({
            data: {
                title,
                slug,
                excerpt: excerpt ?? '',
                content: content ?? '',
                published: true,
            },
        });

        return NextResponse.json({ ok: true, post }, { status: 201 });
    } catch (err: any) {
        // Slug uniqueness conflict (if you have a unique constraint)
        if (err?.code === 'P2002') {
            return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
        }
        return NextResponse.json(
            { error: err?.message ?? 'Server error' },
            { status: 500 }
        );
    }
}
