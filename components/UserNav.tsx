'use client';
import { MenuIcon } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

import { UserButton, useUser, SignOutButton } from '@clerk/nextjs';
import { createAirbnbHome } from '@/app/actions';

export default function UserNav() {
    const { user } = useUser();

    const createHomeWithID = createAirbnbHome.bind(null, {
        userId: user?.id as string,
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
                <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
                    <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />

                    {user ? (
                        <UserButton />
                    ) : (
                        <img
                            src={
                                'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
                            }
                            alt="User Avatar"
                            className="rounded-full h-8 w-8 hidden lg:block"
                        />
                    )}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] p-3">
                {!user ? (
                    <>
                        <DropdownMenuItem>
                            <Link className="w-full" href={'/sign-up'}>
                                Register
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link className="w-full" href={'/sign-in'}>
                                Login
                            </Link>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem>
                            <form action={createHomeWithID} className="w-full">
                                <button
                                    type="submit"
                                    className="w-full text-start"
                                >
                                    Airbnb your Home
                                </button>
                            </form>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link className="w-full" href={'/profile'}>
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link className="w-full" href={'/my-homes'}>
                                My Listings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link className="w-full" href={'/favorites'}>
                                My Favorites
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link className="w-full" href={'/reservations'}>
                                My Reservations
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <SignOutButton>Logout</SignOutButton>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
