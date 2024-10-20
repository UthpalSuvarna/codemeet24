import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import z from "zod";

const registerSchema = z.object({
    username: z.string(),
    city: z.string(),
    clinicname: z.string(),
    userId: z.string(),
    aboutme: z.string()
})

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();  // Parse request body
        const data = registerSchema.parse(body);

        const result = await prisma.psychiatrist.create({
            data: {
                // username: data.username,
                city: data.city,
                clinicName: data.clinicname,
                userId: data.userId,
                aboutMe: data.aboutme
            }
        })



        return NextResponse.json({
            message: "done"
        });
    } catch (e: any) {
        return NextResponse.json({
            message: "Error" + e.message,
        });
    }
}