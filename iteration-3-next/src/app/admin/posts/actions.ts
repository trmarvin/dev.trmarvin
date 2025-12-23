'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deletePost(formData: FormData) {
    const id = Number(formData.get('id'));
    if (!id || Number.isNaN(id)) throw new Error('Invalid post id');

    await prisma.post.delete({ where: { id } });
    revalidatePath('/admin/posts');
    revalidatePath('/blog');
}