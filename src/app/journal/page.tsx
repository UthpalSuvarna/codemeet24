"use client";

import { useState } from "react";
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

// Mock data for journal entries
const journalEntries = [
  {
    id: 1,
    label: "Fear",
    content:
      "Today was my first day at the new job. I was nervous but excited. The office was bigger than I expected, and everyone seemed friendly. I met my new team and got set up at my desk. There's so much to learn, but I'm looking forward to the challenge. I hope I can make a good impression and contribute to the team quickly.",
    date: new Date(2023, 5, 15),
  },
  {
    id: 2,
    label: "Fear",
    content:
      "Spent the weekend at a beautiful cabin in the mountains. The scenery was breathtaking. We hiked through dense forests and along crystal-clear streams. In the evening, we sat around the campfire, sharing stories and roasting marshmallows. It was a perfect escape from the busy city life, and I feel refreshed and ready to tackle the week ahead.",
    date: new Date(2023, 5, 18),
  },
  {
    id: 3,
    label: "Fear",
    content:
      "Tried a new pasta recipe today. It turned out better than expected. I used fresh ingredients from the farmer's market, and the flavors really came together. The homemade sauce was rich and aromatic, and the pasta was cooked to perfection. I'm proud of myself for stepping out of my culinary comfort zone and creating something delicious.",
    date: new Date(2023, 5, 20),
  },
  {
    id: 4,
    label: "Fear",
    content:
      "Looking back on the past year, I realize how much I've grown. I've faced challenges I never thought I could overcome, learned new skills, and made meaningful connections. There were tough times, but each obstacle taught me something valuable. I'm grateful for the experiences, both good and bad, that have shaped me into who I am today.",
    date: new Date(2023, 5, 22),
  },
  {
    id: 5,
    label: "Sad",
    content:
      "Had a great time watching the latest blockbuster with friends. The special effects were mind-blowing, and the plot kept us on the edge of our seats. After the movie, we went for ice cream and spent hours discussing our favorite scenes and characters. It's moments like these that remind me how lucky I am to have such wonderful friends.",
    date: new Date(2023, 5, 25),
  },
];

export default function JournalList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEntry, setSelectedEntry] = useState(null);

  const filteredEntries = journalEntries.filter(
    (entry) =>
      entry.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 pt-20">
      <h1 className="text-3xl font-bold mb-6 text-center">My Journals</h1>

      <div className="mb-4 flex justify-center items-center">
        <Input
          id="search"
          placeholder="Search by title or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEntries.map((entry) => (
          <Card key={entry.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{entry.label}</CardTitle>
              </div>
              <CardDescription>
                {format(entry.date, "MMMM d, yyyy")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="line-clamp-3">{entry.content}</p>
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
                    <DialogTitle>{entry.label}</DialogTitle>
                    <DialogDescription>
                      {format(entry.date, "MMMM d, yyyy")}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <p>{entry.content}</p>
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
