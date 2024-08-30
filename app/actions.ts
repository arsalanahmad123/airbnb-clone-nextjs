'use server';

import prisma from '@/lib/db';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createAirbnbHome({ userId }: { userId: string }) {
    const data = await prisma.home.findFirst({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    if (
        !data ||
        (data.addedCategory && data.addedDescription && data.addedLocation)
    ) {
        const newHome = await prisma.home.create({
            data: { userId: userId },
        });
        return redirect(`/create/${newHome.id}/structure`);
    } else if (
        !data.addedCategory &&
        !data.addedDescription &&
        !data.addedLocation
    ) {
        return redirect(`/create/${data.id}/structure`);
    } else if (data.addedCategory && !data.addedDescription) {
        return redirect(`/create/${data.id}/description`);
    } else if (
        data.addedCategory &&
        data.addedDescription &&
        !data.addedLocation
    ) {
        return redirect(`/create/${data.id}/address`);
    } else if (
        data.addedCategory &&
        data.addedDescription &&
        data.addedLocation
    ) {
        const data = await prisma.home.findFirst({
            where: {
                userId: userId,
            },
        });
        return redirect(`/create/${data?.id}/address`);
    }
}

export async function createCategory(formdata: FormData) {
    const categoryName = formdata.get('categoryName') as string;
    const homeId = formdata.get('homeId') as string;

    const data = await prisma.home.update({
        where: {
            id: homeId,
        },
        data: {
            categoryName: categoryName,
            addedCategory: true,
        },
    });
    return redirect(`/create/${data.id}/description`);
}

export async function createDescription(formdata: FormData) {
    const title = formdata.get('title') as string;
    const description = formdata.get('description') as string;
    const price = formdata.get('price');
    const imageFile = formdata.get('image') as File;
    const guests = formdata.get('guests') as string;
    const rooms = formdata.get('rooms') as string;
    const bathrooms = formdata.get('bathrooms') as string;
    const homeId = formdata.get('homeId') as string;

    const { data: imageData } = await supabase.storage
        .from('images')
        .upload(`${imageFile.name}-${new Date()}`, imageFile, {
            cacheControl: '172800',
            contentType: 'image/png',
        });

    const data = await prisma.home.update({
        where: {
            id: homeId,
        },
        data: {
            title: title,
            description: description,
            price: Number(price),
            bedrooms: rooms,
            guests: guests,
            bathrooms: bathrooms,
            photo: imageData?.path,
            addedDescription: true,
        },
    });

    return redirect(`/create/${data.id}/address`);
}

export async function createLocation(formdata: FormData) {
    const homeId = formdata.get('homeId') as string;
    const country = formdata.get('location') as string;

    const data = await prisma.home.update({
        where: {
            id: homeId,
        },
        data: {
            country: country,
            addedLocation: true,
        },
    });

    return redirect('/');
}

export async function addToFavorite(formdata: FormData) {
    const homeId = formdata.get('homeId') as string;
    const userId = formdata.get('userId') as string;
    const pathname = formdata.get('pathName') as string;

    const data = await prisma.favorite.create({
        data: {
            homeId: homeId,
            userId: userId,
        },
    });

    revalidatePath(pathname);
}

export async function deleteFromFavorite(formdata: FormData) {
    const favoriteId = formdata.get('favoriteId') as string;
    const userId = formdata.get('userId') as string;
    const pathname = formdata.get('pathName') as string;

    const data = await prisma.favorite.delete({
        where: {
            id: favoriteId,
            userId: userId,
        },
    });

    revalidatePath(pathname);
}

export async function createReservation(formdata: FormData) {
    const userId = formdata.get('userId') as string;
    const homeId = formdata.get('homeId') as string;
    const startdate = formdata.get('startDate') as string;
    const enddate = formdata.get('endDate') as string;

    const data = await prisma.reservation.create({
        data: {
            userId: userId,
            homeId: homeId,
            startDate: startdate,
            endDate: enddate,
        },
    });
    return redirect('/');
}
