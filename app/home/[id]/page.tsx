import { CategoryShowcase } from '@/components/CategoryShowcase';
import { HomeMap } from '@/components/HomeMap';
import { SelectCalendar } from '@/components/SelectCalendar';
import { Separator } from '@/components/ui/separator';
import prisma from '@/lib/db';
import { useCountries } from '@/lib/getCountries';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { createReservation } from '@/app/actions';
import { ReservationSubmitButton } from '@/components/SubmitButtons';

async function getData(homeID: string) {
    const res = await prisma.home.findUnique({
        where: {
            id: homeID,
        },
        select: {
            photo: true,
            guests: true,
            bathrooms: true,
            bedrooms: true,
            country: true,
            description: true,
            title: true,
            categoryName: true,
            price: true,
            createdAt: true,
            User: {
                select: {
                    profileImage: true,
                    firstName: true,
                },
            },
            Reservation: {
                where: {
                    homeId: homeID,
                },
            },
        },
    });
    return res;
}

export default async function Home({ params }: { params: { id: string } }) {
    const data = await getData(params.id);
    const { getCountryByValue } = useCountries();
    const country = getCountryByValue(data?.country as string);
    const user = await currentUser();
    return (
        <div className="w-[75%] mx-auto mt-10 mb-12">
            <h2 className="font-medium text-2xl mb-5">{data?.title}</h2>
            <div className="relative h-[550px]">
                <Image
                    alt="Image of home"
                    src={`https://dfvtqoezdkkejzkhwvji.supabase.co/storage/v1/object/public/images/${data?.photo}`}
                    fill
                    className="rounded-lg h-full w-full object-cover"
                />
            </div>
            <div className="flex justify-between gap-x-24 mt-8">
                <div className="w-2/3">
                    <h3 className="text-xl font-medium">
                        {country?.flag} {country?.label} / {country?.region}
                    </h3>
                    <div className="flex gap-x-2 text-muted-foreground">
                        <p>{data?.guests} Guests</p>*
                        <p>{data?.bedrooms} Bedrooms</p>*{' '}
                        <p>{data?.bathrooms} Baths</p>
                    </div>
                    <div className="flex items-center mt-6 relative">
                        <img
                            src={
                                data?.User?.profileImage ??
                                'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
                            }
                            alt="User Image"
                            className="h-11 w-11 rounded-full object-cover"
                        />
                        <div className="flex flex-col ml-4">
                            <h3 className="font-medium">
                                Hosted by {data?.User?.firstName}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Host since 2000
                            </p>
                        </div>
                    </div>
                    <Separator className="my-7" />
                    <CategoryShowcase
                        categoryName={data?.categoryName as string}
                    />
                    <Separator className="my-7" />
                    <p className="text-muted-foreground">{data?.description}</p>
                    <Separator className="my-7" />
                    <HomeMap locationValue={country?.value as string} />
                </div>
                <form action={createReservation}>
                    <input type="hidden" name="homeId" value={params.id} />
                    <input type="hidden" name="userId" value={user?.id} />
                    <SelectCalendar reservation={data?.Reservation} />
                    {user?.id ? (
                        <ReservationSubmitButton />
                    ) : (
                        <Button className="ml-3 w-2/3" asChild>
                            <Link href={'/sign-in'}>Make a reservation</Link>
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
}
