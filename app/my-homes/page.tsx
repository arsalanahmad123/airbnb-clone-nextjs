import { ListingCard } from '@/components/ListingsCard';
import NoItem from '@/components/NoItem';
import prisma from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

async function getData(userID: string) {
    const res = await prisma.home.findMany({
        where: {
            userId: userID,
            addedCategory: true,
            addedDescription: true,
            addedLocation: true,
        },
        select: {
            id: true,
            photo: true,
            description: true,
            country: true,
            price: true,
            Favorite: {
                where: {
                    userId: userID,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return res;
}

export default async function MyHomes() {
    const user = await currentUser();

    if (!user) return redirect('/');

    const data = await getData(user.id);

    return (
        <section className="px-5 lg:px-10 container mx-auto my-10">
            <h2 className="text-3xl font-semibold tracking-tight transition-colors">
                Your Homes
            </h2>
            {data.length === 0 ? (
                <NoItem
                    title="You don't have any homes listed"
                    description="Please list a home at airbnb so that you can see it right here"
                />
            ) : (
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 mt-8 mb-2">
                    {data.map((item) => (
                        <ListingCard
                            key={item.id}
                            imagePath={item.photo as string}
                            price={item.price as number}
                            location={item.country as string}
                            description={item.description as string}
                            homeId={item.id}
                            isInFavoriteList={
                                item.Favorite.length > 0 ? true : false
                            }
                            favoriteId={item.Favorite[0]?.id}
                            userId={user.id}
                            pathName="/my-homes"
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
