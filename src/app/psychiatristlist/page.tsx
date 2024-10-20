"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ExpandableCardDemo from "@/components/blocks/expandable-card-demo-grid";
import { useEffect, useState } from "react";
import { getPsychiatrist } from "@/action/get-psychiatrist";

export type Card = {
    name: string;
    city: string;
    image: string;
};

export default function PsychiatristDirectory() {
    const [psychiatrists, setPsychiatrists] = useState<Card[]>([]);
    useEffect(() => {
        async function fetchPsychiatrists() {
            const data = await getPsychiatrist();
            if (data && Array.isArray(data)) {
                const formattedData: Card[] = data.map((psychiatrist) => ({
                    name: `${psychiatrist.user.name}`,
                    city: psychiatrist.city || "Unknown",
                    image: psychiatrist.user.image || "",
                }));
                setPsychiatrists(formattedData);
            }
        }
        fetchPsychiatrists();
    }, []);
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8 text-center pt-20">Psychiatrist List</h1>
            <ExpandableCardDemo cards={psychiatrists} />
        </div>
    );
}
