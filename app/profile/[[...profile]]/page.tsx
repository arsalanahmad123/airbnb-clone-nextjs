import { UserProfile } from '@clerk/nextjs';

export default function USERPROFILE() {
    return (
        <div className="h-screen flex justify-center items-center">
            <UserProfile />
        </div>
    );
}
