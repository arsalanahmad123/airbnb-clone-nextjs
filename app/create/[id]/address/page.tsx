'use client';
import { createLocation } from '@/app/actions';
import CreationBottomBar from '@/components/CreationBottomBar';
import {
    Select,
    SelectGroup,
    SelectItem,
    SelectLabel,
} from '@/components/ui/select';
import {
    SelectTrigger,
    SelectValue,
    SelectContent,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useCountries } from '@/lib/getCountries';
import dynamic from 'next/dynamic';
import { useState } from 'react';

export default function Address({ params }: { params: { id: string } }) {
    const { getAllCountries } = useCountries();
    const [locationValue, setLocationValue] = useState('');

    const LazyMap = dynamic(() => import('@/components/Map'), {
        ssr: false,
        loading: () => <Skeleton className="h-[50vh] w-full" />,
    });

    return (
        <>
            <div className="w-3/5 mx-auto">
                <h3 className="text-3xl font-semibold tracking-tight transition-colors mb-10">
                    Where is your Home located?
                </h3>
            </div>
            <form action={createLocation}>
                <input type="hidden" name="homeId" value={params.id} />
                <input type="hidden" name="location" value={locationValue} />
                <div className="w-3/5 mx-auto mb-36">
                    <div className="mb-5">
                        <Select
                            required
                            onValueChange={(value) => setLocationValue(value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a Country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Countries</SelectLabel>
                                    {getAllCountries().map((item) => (
                                        <SelectItem
                                            key={item.value}
                                            value={item.value}
                                        >
                                            {item.flag} {item.label}
                                            {' / '}
                                            {item.region}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <LazyMap locationValue={locationValue} />
                </div>

                <CreationBottomBar />
            </form>
        </>
    );
}
