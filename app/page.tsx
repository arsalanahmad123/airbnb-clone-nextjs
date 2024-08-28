import { ListingCard } from '@/components/ListingsCard';
import { MapFilterList } from '@/components/MapFilterList';
import NoItem from '@/components/NoItem';
import SkeletonCard from '@/components/SkeletonCard';

import prisma from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import { Suspense } from 'react';

async function getData({
    searchParams,
    userId,
}: {
    searchParams?: { filter?: string };
    userId: string | undefined;
}) {
    const data = await prisma.home.findMany({
        where: {
            addedCategory: true,
            addedDescription: true,
            addedLocation: true,
            categoryName: searchParams?.filter ?? undefined,
        },
        select: {
            photo: true,
            id: true,
            price: true,
            description: true,
            country: true,
            Favorite: {
                where: {
                    userId: userId ?? undefined,
                },
            },
        },
    });
    return data;
}
export default async function Home({
    searchParams,
}: {
    searchParams?: { filter?: string };
}) {
    return (
        <div className="container px-5 lg:px-10 mx-auto min-h-screen">
            <MapFilterList />
            <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
                <ShowItems searchParams={searchParams} />
            </Suspense>
        </div>
    );
}

async function ShowItems({
    searchParams,
}: {
    searchParams?: { filter?: string };
}) {
    const user = await currentUser();

    const data = await getData({
        searchParams: searchParams,
        userId: user?.id,
    });
    return (
        <>
            {data.length === 0 ? (
                <NoItem />
            ) : (
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 mt-8 mb-2">
                    {data.map((item) => (
                        <ListingCard
                            key={item.id}
                            imagePath={item.photo as string}
                            description={item.description as string}
                            location={item.country as string}
                            price={item.price as number}
                            userId={user?.id ?? undefined}
                        />
                    ))}
                </div>
            )}
        </>
    );
}

function SkeletonLoading() {
    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 mt-8 mb-2">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </div>
    );
}
