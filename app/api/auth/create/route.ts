import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET() {
    noStore();
    const user = await currentUser();

    if (!user || user.id === null || !user.id) {
        throw new Error('Something went wrong!');
    }

    let dbuser = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
    });

    if (!dbuser) {
        dbuser = await prisma.user.create({
            data: {
                email: user.emailAddresses[0].emailAddress ?? '',
                firstName: user.firstName ?? 'johndoe',
                lastName: user.lastName ?? '',
                id: user.id,
                profileImage:
                    user.imageUrl ??
                    `https://avatar.vercel.sh/${user.username}`,
            },
        });
    }

    return NextResponse.redirect('https://airbnb-clone-arsalan.vercel.app');
}
