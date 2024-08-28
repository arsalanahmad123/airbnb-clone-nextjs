import { useCountries } from '@/lib/getCountries';
import Image from 'next/image';
import Link from 'next/link';
import { AddToFavoriteButton } from './SubmitButtons';

interface Props {
    imagePath: string;
    description: string;
    location: string;
    price: number;
    userId: string | undefined;
}

export function ListingCard({
    imagePath,
    description,
    location,
    price,
    userId,
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
                        <AddToFavoriteButton />
                    </div>
                )}
            </div>
            <Link href={'/'} className="mt-2">
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
