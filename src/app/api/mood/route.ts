import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Get the current date (without time)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Check if a mood entry already exists for today
        const existingMood = await prisma.mood.findFirst({
            where: {
                userId: data.sessionId,
                createdAt: {
                    gte: today,
                    lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Next day
                },
            },
        });

        if (existingMood) {
            return NextResponse.json({ error: "A mood entry already exists for today" }, { status: 400 });
        }

        const rep = await prisma.mood.create({
            data: {
                mood: data.mood,
                userId: data.sessionId,
            },
        });

        return NextResponse.json({
            message: "updated",
        });
    } catch (error) {
        console.error("Error creating mood:", error);
        return NextResponse.json({ error: "Failed to create mood" }, { status: 500 });
    }
}
