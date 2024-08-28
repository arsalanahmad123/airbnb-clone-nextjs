'use client';
import { categoryItems } from '@/lib/categoryitems';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
export function MapFilterList() {
    const searchParams = useSearchParams();
    const search = searchParams.get('filter');
    const pathname = usePathname();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        },
        [searchParams]
    );

    return (
        <div className="flex w-full gap-x-10 mt-5 min-h-16 overflow-x-scroll no-scrollbar">
            {categoryItems.map((item) => (
                <Link
                    href={
                        pathname + '?' + createQueryString('filter', item.name)
                    }
                    key={item.id}
                    className={cn(
                        search === item.name
                            ? 'border-b-2 border-black pb-2 flex-shrink-0'
                            : 'opacity-70 flex-shrink-0 hover:border-b-2 border-gray-300 hover:opacity-100',
                        'flex flex-col gap-y-3 items-center'
                    )}
                >
                    <div className="relative w-6 h-6">
                        <Image
                            src={item.imageUrl}
                            alt="category image"
                            width={24}
                            height={24}
                        />
                    </div>
                    <p className="text-xs font-medium">{item.title}</p>
                </Link>
            ))}
        </div>
    );
}
