"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useSession } from "next-auth/react"

const FormSchema = z.object({
    mood: z
        .string({
            required_error: "Please select your mood",
        })
        .nonempty(),
})

export function SelectForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const { data: session } = useSession();

    function onSubmit(data: z.infer<typeof FormSchema>) {
        fetch("/api/mood", {
            method: "POST",
            body: JSON.stringify({
                mood: data.mood,
                sessionId: session?.user.id
            })
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="mood"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your mood" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Happy">Happy</SelectItem>
                                    <SelectItem value="Sad">Sad</SelectItem>
                                    <SelectItem value="Fear">Fear</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-center items-center">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    )
}
