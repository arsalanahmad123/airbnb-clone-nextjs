import { Button } from '@/components/ui/button';
import { MapFilterList } from '@/components/MapFilterList';
export default function Home() {
    return (
        <div className="container px-5 lg:px-10 mx-auto">
            <MapFilterList />
        </div>
    );
}
