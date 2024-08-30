import SkeletonCard from '@/components/SkeletonCard';

export default function Loading() {
    return (
        <section className="px-5 lg:px-10 container mx-auto mt-10">
            <h2 className="text-3xl font-semibold tracking-tight transition-colors">
                Your Reservations
            </h2>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-8">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>
        </section>
    );
}
