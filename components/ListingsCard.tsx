import { useCountries } from '@/lib/getCountries';
import Image from 'next/image';
import Link from 'next/link';
import { AddToFavoriteButton, DeleteFromFavoriteButtom } from './SubmitButtons';
import { addToFavorite, deleteFromFavorite } from '@/app/actions';

interface Props {
    imagePath: string;
    description: string;
    location: string;
    price: number;
    userId: string | undefined;
    isInFavoriteList: boolean;
    favoriteId: string;
    homeId: string;
    pathName: string;
}

export function ListingCard({
    imagePath,
    description,
    location,
    price,
    userId,
    isInFavoriteList,
    favoriteId,
    homeId,
    pathName,
}: Props) {
    const { getCountryByValue } = useCountries();
    const country = getCountryByValue(location);

    return (
        <div className="flex flex-col">
            <div className="relative h-72">
                <Image
                    src={`https://dfvtqoezdkkejzkhwvji.supabase.co/storage/v1/object/public/images/${imagePath}`}
                    alt="Image of House"
                    fill
                    className="h-full object-cover rounded-lg "
                />
                {userId && (
                    <div className="absolute top-2 right-2 z-10 cursor-pointer">
                        {isInFavoriteList ? (
                            <form action={deleteFromFavorite}>
                                <input
                                    type="hidden"
                                    name="favoriteId"
                                    value={favoriteId}
                                />
                                <input
                                    type="hidden"
                                    name="userId"
                                    value={userId}
                                />
                                <input
                                    type="hidden"
                                    name="pathName"
                                    value={pathName}
                                />
                                <DeleteFromFavoriteButtom />
                            </form>
                        ) : (
                            <form action={addToFavorite}>
                                <input
                                    type="hidden"
                                    name="homeId"
                                    value={homeId}
                                />
                                <input
                                    type="hidden"
                                    name="userId"
                                    value={userId}
                                />
                                <input
                                    type="hidden"
                                    name="pathName"
                                    value={pathName}
                                />
                                <AddToFavoriteButton />
                            </form>
                        )}
                    </div>
                )}
            </div>
            <Link href={`/home/${homeId}`} className="mt-2">
                <h3 className="font-medium text-base">
                    {country?.flag} {'  '} {country?.label} {'  '}/ {'  '}{' '}
                    {country?.region}
                </h3>
                <p className="text-muted-foreground line-clamp-2">
                    {description}
                </p>
                <p className="pt-2 text-muted-foreground">
                    <span className="font-medium text-black">${price}</span>{' '}
                    Night
                </p>
            </Link>
        </div>
    );
}
