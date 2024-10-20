import SignIn from "@/app/auth/signin/page";
import Signout from "@/app/auth/signout/page";
import { auth } from "@/auth"
import Link from "next/link";
import { Button } from "../ui/button";

export default async function Navbar() {
    const session = await auth();
    return (
        <div className="w-full flex justify-center items-center absolute">
            <div className="bg-background container flex justify-between items-center px-5 md:my-5 my-4">
                <a href="/" className="font-bold text-2xl md:text-3xl">Well<span className="text-primary">Nest</span></a>
                <div className="flex md:gap-5 gap-2">
                    {
                        session ? (
                            <div>
                                <Button asChild variant="destructive" className="font-bold">
                                    <Link href="auth/signout" className="">Sign Out</Link>
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Button asChild variant="default" className="font-bold">
                                    <Link href="auth/signin" >Sign In</Link>
                                </Button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}