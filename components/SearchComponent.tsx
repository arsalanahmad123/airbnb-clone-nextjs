'use client';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { Search } from 'lucide-react';
import { useState } from 'react';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectValue,
} from './ui/select';
import { useCountries } from '@/lib/getCountries';
import { HomeMap } from './HomeMap';
import { Button } from './ui/button';
import { SubmitButtons } from './SubmitButtons';
import { Card, CardHeader } from './ui/card';
import Counter from './Counter';

export default function SearchComponent() {
    const [step, setStep] = useState(1);
    const { getAllCountries } = useCountries();
    const [locationValue, setLocationValue] = useState('');

    function SubmitButton() {
        if (step === 1) {
            return (
                <Button onClick={() => setStep(step + 1)} type="button">
                    Next
                </Button>
            );
        } else if (step === 2) {
            return <SubmitButtons />;
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="rounded-full py-2 px-5 border flex items-center cursor-pointer">
                    <div className="flex h-full divide-x font-medium">
                        <p className="px-4">Anywhere</p>
                        <p className="px-4">Any Week</p>
                        <p className="px-4">Add Guests</p>
                    </div>
                    <Search className="h-8 w-8 rounded-full bg-primary text-white p-1" />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form action="" className="flex flex-col gap-4">
                    <input type="hidden" name="country" value={locationValue} />
                    {step === 1 ? (
                        <>
                            <DialogHeader>
                                <DialogTitle>Select a Country</DialogTitle>
                                <DialogDescription>
                                    Please choose a Country, so that we know
                                    what you are looking for!
                                </DialogDescription>
                            </DialogHeader>
                            <Select
                                required
                                onValueChange={(value) =>
                                    setLocationValue(value)
                                }
                                value={locationValue}
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
                            <HomeMap locationValue={locationValue} />
                        </>
                    ) : (
                        <>
                            <DialogHeader>
                                <DialogTitle>
                                    Select all the info you need
                                </DialogTitle>
                                <DialogDescription>
                                    Select the details for better search
                                </DialogDescription>
                            </DialogHeader>
                            <Card>
                                <CardHeader className="flex flex-col gap-y-5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <h3 className="underline font-medium">
                                                Guests
                                            </h3>
                                            <p className="text-muted-foreground text-sm">
                                                How many guests do you want?
                                            </p>
                                        </div>
                                        <Counter name="guests" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <h3 className="underline font-medium">
                                                Rooms
                                            </h3>
                                            <p className="text-muted-foreground text-sm">
                                                How many rooms do you have?
                                            </p>
                                        </div>
                                        <Counter name="rooms" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <h3 className="underline font-medium">
                                                Bathrooms
                                            </h3>
                                            <p className="text-muted-foreground text-sm">
                                                How many bathrooms do you have?
                                            </p>
                                        </div>
                                        <Counter name="bathrooms" />
                                    </div>
                                </CardHeader>
                            </Card>
                        </>
                    )}
                    <DialogFooter>
                        <SubmitButton />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
