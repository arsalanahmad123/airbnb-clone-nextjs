import { createCategory } from '@/app/actions';
import CreationBottomBar from '@/components/CreationBottomBar';
import SelectedCategory from '@/components/SelectedCategory';

export default function Structure({ params }: { params: { id: string } }) {
    return (
        <>
            <div className="w-3/5 mx-auto">
                <h2 className="text-3xl font-semibold tracking-tight transition-colors">
                    Which of these describe your Home!
                </h2>
            </div>
            <form action={createCategory}>
                <input type="hidden" name="homeId" value={params.id} />
                <SelectedCategory />
                <CreationBottomBar />
            </form>
        </>
    );
}
