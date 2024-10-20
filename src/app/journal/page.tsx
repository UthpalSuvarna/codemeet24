
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import Link from "next/link";



export default async function JournalList() {

  const session = await auth();
  const journals = await prisma.journals.findMany({
    where: {
      userId: session?.user.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className="container mx-auto p-4 pt-20 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-center">My Journals</h1>

      <div className="flex justify-end m-3 font-bold">

        <Button asChild variant="outline">
          <Link href="/journal/new" className="font-bold"> New journal</Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {journals.map((entry) => (
          <Card key={entry.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{entry.createdAt.toDateString()} {entry.createdAt.toLocaleTimeString()}</CardTitle>
              </div>
              <CardDescription>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="line-clamp-3">{entry.text}</p>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Read More
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{entry.createdAt.toString()}</DialogTitle>
                    <DialogDescription>
                      {/* {format(entry.date, "MMMM d, yyyy")} */}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <p>{entry.text}</p>
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
