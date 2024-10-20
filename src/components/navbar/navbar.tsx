"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
// source : https://v0.dev/t/TBh7U1yjpaw

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { data: session } = useSession();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const closeMenu = () => {
        setMenuOpen(false);
    };
    return (
        <>
            <header className=" fixed top-0 z-40 w-full ">

                <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4">
                        <Link href="#" className="flex items-center gap-2" prefetch={false}>
                            <span className="font-extrabold text-2xl">
                                WELL<span className="text-primary">NEST</span>
                            </span>

                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <nav className="hidden md:flex md:gap-4">
                            <Link
                                href="/"
                                className="rounded-md px-3 py-2 font-bold transition-colors  hover:text-primary"
                                prefetch={false}
                            >
                                Home
                            </Link>
                            <Link
                                href="/journal"
                                className="rounded-md px-3 py-2  font-bold transition-colors  hover:text-primary"
                                prefetch={false}
                            >
                                Journal
                            </Link>
                            <Link
                                href="/chat"
                                className="rounded-md px-3 py-2  font-bold transition-colors  hover:text-primary"
                                prefetch={false}
                            >
                                Chat
                            </Link>
                            <Link
                                href="/profile"
                                className="rounded-md px-3 py-2  font-bold transition-colors  hover:text-primary"
                                prefetch={false}
                            >
                                Profile
                            </Link>
                            <Link
                                href="/exercise"
                                className="rounded-md px-3 py-2  font-bold transition-colors  hover:text-primary"
                                prefetch={false}
                            >
                                Exercises
                            </Link>
                            <Link
                                href="/psychiatristlist"
                                className="rounded-md px-3 py-2  font-bold transition-colors  hover:text-primary"
                                prefetch={false}
                            >
                                Psychiatrist
                            </Link>

                            {session ? <>
                                <Button asChild variant="destructive" className="font-bold">
                                    <Link href="auth/signout">Signout</Link>
                                </Button>
                            </> : <>
                                <Button asChild variant="default" className="font-bold">
                                    <Link href="auth/signin">Sign In</Link>
                                </Button>

                            </>}
                        </nav>
                        <div className="flex items-center md:hidden">
                            <button
                                className=" text-4xl font-bold opacity-70 hover:opacity-100 duration-300"
                                onClick={toggleMenu}
                            >
                                &#9776;
                            </button>
                        </div>
                        <div
                            id="menu"
                            className={`${menuOpen ? "w-full h-screen" : "hidden"
                                } bg-background fixed top-0 left-0 z-50 flex flex-col items-center justify-center`}
                        >
                            <button
                                className="absolute top-4 right-4  text-5xl"
                                onClick={closeMenu}
                            >
                                &times;
                            </button>

                            <a
                                href="/"
                                className="py-2 text-4xl hover:text-primary"
                                onClick={closeMenu}
                            >
                                Home
                            </a>
                            <a
                                href="/journal"
                                className="py-2 text-4xl hover:text-primary"
                                onClick={closeMenu}
                            >
                                Journal
                            </a>
                            <a
                                href="/chat"
                                className="py-2 text-4xl hover:text-primary"
                                onClick={closeMenu}
                            >
                                Chat
                            </a>
                            <a
                                href="/profile"
                                className="py-2 text-4xl hover:text-primary"
                                onClick={closeMenu}
                            >
                                Profile
                            </a>
                            <a
                                href="/exercise"
                                className="py-2 text-4xl hover:text-primary"
                                onClick={closeMenu}
                            >
                                Exercise
                            </a>
                            <a
                                href="/psychiatristlist"
                                className="py-2 text-4xl hover:text-primary"
                                onClick={closeMenu}
                            >
                                Psychiatrist
                            </a>
                            {session ? <>
                                <Button asChild variant="destructive">
                                    <Link href="auth/signout">Signout</Link>
                                </Button>
                            </> : <>
                                <Button asChild variant="default">
                                    <Link href="auth/signin">Signin</Link>
                                </Button>

                            </>}
                        </div>
                    </div>
                </div>
                <div className="absolute -z-10 top-0 left-0 w-full h-[150%] bg-gradient-to-b from-background to-transparent"></div>
            </header>
        </>
    );
}