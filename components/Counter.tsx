'use client';
import { Minus, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

export default function Counter({ name }: { name: string }) {
    const [amount, setAmount] = useState(0);

    function increment() {
        setAmount((amount) => amount + 1);
    }

    function decrement() {
        if (amount > 0) {
            setAmount((amount) => amount - 1);
        }
    }

    return (
        <div className="flex items-center gap-x-4">
            <input type="hidden" name={name} value={amount} />
            <Button
                variant={'outline'}
                size={'icon'}
                type="button"
                onClick={decrement}
            >
                <Minus className="w-4 h-4 text-primary" />
            </Button>
            <p className="font-medium text-lg">{amount}</p>
            <Button
                variant={'outline'}
                size={'icon'}
                type="button"
                onClick={increment}
            >
                <Plus className="w-4 h-4 text-primary" />
            </Button>
        </div>
    );
}
