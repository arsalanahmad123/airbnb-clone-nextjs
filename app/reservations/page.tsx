import prisma from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import NoItem from '@/components/NoItem';
import { ListingCard } from '@/components/ListingsCard';

async function getData(userID: string) {
    const data = await prisma.reservation.findMany({
        where: {
            userId: userID,
        },
        select: {
            Home: {
                select: {
                    id: true,
                    photo: true,
                    country: true,
                    price: true,
                    description: true,
                    Favorite: {
                        where: {
                            userId: userID,
                        },
                    },
                },
            },
        },
    });

    return data;
}

export default async function Reservations() {
    const user = await currentUser();

    if (!user) return redirect('/');
    const data = await getData(user?.id as string);

    return (
        <section className="container mx-auto px-5 lg:px-10 mt-10">
            <h2 className="text-3xl font-semibold tracking-tight transition-colors">
                Your Reservations
            </h2>
            {data.length === 0 ? (
                <NoItem
                    title="Hey you don't have any reservations"
                    description="Please add a reservation to see it right here..."
                />
            ) : (
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-8">
                    {data.map((item) => (
                        <ListingCard
                            key={item.Home?.id}
                            description={item.Home?.description as string}
                            location={item.Home?.country as string}
                            pathName="/favorites"
                            homeId={item.Home?.id as string}
                            imagePath={item.Home?.photo as string}
                            price={item.Home?.price as number}
                            userId={user.id}
                            favoriteId={item.Home?.Favorite[0]?.id as string}
                            isInFavoriteList={
                                (item.Home?.Favorite.length as number) > 0
                                    ? true
                                    : false
                            }
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
