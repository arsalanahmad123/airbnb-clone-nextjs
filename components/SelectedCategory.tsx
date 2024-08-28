'use client';

import { categoryItems } from '@/lib/categoryitems';
import { Card, CardHeader } from './ui/card';
import Image from 'next/image';
import { useState } from 'react';

export default function SelectedCategory() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );

    return (
        <div className="grid grid-cols-4 gap-8 mt-10 w-3/5 mx-auto mb-36">
            <input
                type="hidden"
                name="categoryName"
                value={
                    selectedCategory ? (selectedCategory as string) : undefined
                }
            />
            {categoryItems.map((item) => (
                <div key={item.id} className="cursor-pointer">
                    <Card
                        className={
                            selectedCategory === item.name
                                ? 'border-primary border-2'
                                : ''
                        }
                        onClick={() => setSelectedCategory(item.name)}
                    >
                        <CardHeader>
                            <Image
                                src={item.imageUrl}
                                alt={item.name}
                                height={32}
                                width={32}
                                className="w-8 h-8"
                            />
                            <h3 className="font-medium">{item.name}</h3>
                        </CardHeader>
                    </Card>
                </div>
            ))}
        </div>
    );
}
