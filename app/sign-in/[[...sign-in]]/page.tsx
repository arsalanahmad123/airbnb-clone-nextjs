import { SignIn } from '@clerk/nextjs';

export default function SIGNIN() {
    return (
        <div className="h-screen flex justify-center items-center">
            <SignIn />
        </div>
    );
}
