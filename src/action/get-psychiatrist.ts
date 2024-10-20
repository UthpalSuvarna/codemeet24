"use server";

import { prisma } from "@/lib/prisma";

export async function getPsychiatrist() {
    const psychiatrists = await prisma.psychiatrist.findMany({
        include: {
            user: true,
        },
    });
    return psychiatrists;
}
