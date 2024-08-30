import Link from 'next/link';
import Image from 'next/image';
import UserNav from './UserNav';
import SearchComponent from './SearchComponent';

export default function Navbar() {
    return (
        <nav className="border-b w-full">
            <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
                <Link href={'/'}>
                    <Image
                        src={'/airbnb-desktop.png'}
                        alt="desktop logo"
                        width={132}
                        height={100}
                        className="hidden lg:block"
                    />
                    <Image
                        src={'/airbnb-mobile.webp'}
                        alt="mobile logo"
                        width={50}
                        height={50}
                        className="block lg:hidden"
                    />
                </Link>
                <SearchComponent />
                <UserNav />
            </div>
        </nav>
    );
}
