'use client';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Heart, Loader2 } from 'lucide-react';

export function SubmitButtons() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button disabled size={'lg'}>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button>
            ) : (
                <Button type="submit" size={'lg'}>
                    Next
                </Button>
            )}
        </>
    );
}

export function AddToFavoriteButton() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button
                    variant={'outline'}
                    size={'icon'}
                    className="bg-primary-foreground"
                    disabled
                >
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                </Button>
            ) : (
                <Button
                    variant={'outline'}
                    size={'icon'}
                    className="bg-primary-foreground"
                    type="submit"
                >
                    <Heart className="w-4 h-4" />
                </Button>
            )}
        </>
    );
}

export function DeleteFromFavoriteButtom() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button
                    variant={'outline'}
                    size={'icon'}
                    className="bg-primary-foreground"
                    disabled
                >
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                </Button>
            ) : (
                <Button
                    variant={'outline'}
                    size={'icon'}
                    className="bg-primary-foreground"
                    type="submit"
                >
                    <Heart className="w-4 h-4 text-primary" fill="#E21C49" />
                </Button>
            )}
        </>
    );
}

export function ReservationSubmitButton() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button size={'icon'} className="ml-3 w-[70%]" disabled>
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />{' '}
                    Please wait ...
                </Button>
            ) : (
                <Button className="ml-3 w-2/3" type="submit">
                    Make a reservation!
                </Button>
            )}
        </>
    );
}
