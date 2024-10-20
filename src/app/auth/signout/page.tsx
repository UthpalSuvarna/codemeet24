"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Signout() {
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            signOut({ callbackUrl: "/" });
        } else if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    return <div>Signing out...</div>;
}