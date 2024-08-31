'use client';
import { categoryItems } from '@/lib/categoryitems';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

export function MapFilterList() {
    const searchParams = useSearchParams();
    const search = searchParams.get('filter');
    const pathname = usePathname();

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const scrollX = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 500;

            if (direction === 'left') {
                scrollContainerRef.current.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth',
                });
            } else {
                scrollContainerRef.current.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth',
                });
            }
        }
    };

    const updateScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } =
                scrollContainerRef.current;
            setIsAtStart(scrollLeft === 0);
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
        }
    };

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.addEventListener(
                'scroll',
                updateScrollButtons
            );
            updateScrollButtons();

            return () =>
                scrollContainerRef.current?.removeEventListener(
                    'scroll',
                    updateScrollButtons
                );
        }
    }, []);

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        },
        [searchParams]
    );

    return (
        <div className="relative w-full">
            {/* Scrollable Container */}
            <div
                ref={scrollContainerRef}
                className="flex w-full gap-x-10 mt-5 min-h-16 overflow-x-scroll no-scrollbar whitespace-nowrap"
            >
                {categoryItems.map((item) => (
                    <Link
                        href={
                            pathname +
                            '?' +
                            createQueryString('filter', item.name)
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

            {/* Scroll Left Button */}
            {!isAtStart && (
                <button
                    className="absolute top-1 left-0 p-2 rounded-full bg-white border shadow-lg z-50"
                    onClick={() => scrollX('left')}
                >
                    <ArrowLeft />
                </button>
            )}

            {/* Scroll Right Button */}
            {!isAtEnd && (
                <button
                    className="absolute top-1 right-0 p-2 rounded-full bg-white border shadow-lg z-50"
                    onClick={() => scrollX('right')}
                >
                    <ArrowRight />
                </button>
            )}
        </div>
    );
}
