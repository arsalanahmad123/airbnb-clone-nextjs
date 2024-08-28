import { File } from 'lucide-react';

export default function NoItem() {
    return (
        <div className="flex flex-col min-h-[400px] items-center justify-center rounded-md border border-dashed text-center animate-in p-8 fade-in-50 mt-10">
            <div className="flex h-20 w-20 justify-center items-center rounded-full bg-primary/10">
                <File className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-xl mt-6 font-semibold">
                Sorry no listings for this category found...
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground leading-6">
                Please check other category or create your own listing!
            </p>
        </div>
    );
}
