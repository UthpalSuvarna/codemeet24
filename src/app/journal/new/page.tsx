"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Edit, Mic, MicOff } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface Note {
    id: number;
    date: string;
    content: string;
}

export default function NoteTakingApp() {
    const { data: session } = useSession();
    const [notes, setNotes] = useState<Note[]>([]);
    const [content, setContent] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
        if (
            (typeof window !== "undefined" && "SpeechRecognition" in window) ||
            "webkitSpeechRecognition" in window
        ) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;

            recognitionRef.current.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map((result) => result[0])
                    .map((result) => result.transcript)
                    .join("");

                setContent((prevContent) => prevContent + " " + transcript);
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/journal/create", {
                method: "POST",
                body: JSON.stringify({
                    content,
                    sessionId: session?.user.id,
                }),
            });

            if (response.ok) {
                toast.success("Your journal entry has been saved.");
                setContent(""); // Clear the content
            } else {
                throw new Error("Failed to save journal entry");
            }
        } catch (error) {
            toast.error("Failed to save journal entry. Please try again.");
        }
    };

    const addNote = () => {
        if (content.trim()) {
            if (editingId !== null) {
                setNotes(notes.map((note) => (note.id === editingId ? { ...note, content } : note)));
                setEditingId(null);
            } else {
                const currentDate = new Date().toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                });
                setNotes([...notes, { id: Date.now(), date: currentDate, content }]);
            }
            setContent("");
        }
    };

    const editNote = (id: number) => {
        const noteToEdit = notes.find((note) => note.id === id);
        if (noteToEdit) {
            setContent(noteToEdit.content);
            setEditingId(id);
        }
    };

    const deleteNote = (id: number) => {
        setNotes(notes.filter((note) => note.id !== id));
    };

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
        }
        setIsListening(!isListening);
    };

    return (
        <div className="container mx-auto pt-14 mt-5 max-w-7xl">
            <Card className="mb-6">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            {editingId !== null ? "Edit Note" : "How are you feeling today"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2">
                            <Textarea
                                placeholder="Note Content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={4}
                                required
                                className="flex-grow"
                            />
                            <Button
                                type="button"
                                size="icon"
                                variant={isListening ? "destructive" : "secondary"}
                                onClick={toggleListening}
                                className="h-10 w-10"
                            >
                                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                                <span className="sr-only">
                                    {isListening ? "Stop Listening" : "Start Listening"}
                                </span>
                            </Button>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">{editingId !== null ? "Update Note" : "Add Note"}</Button>
                    </CardFooter>
                </form>
            </Card>
            <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="space-y-4">
                    {notes.map((note) => (
                        <Card key={note.id}>
                            <CardHeader>
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {note.date}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{note.content}</p>
                            </CardContent>
                            <CardFooter className="justify-end space-x-2">
                                <Button variant="outline" size="icon" onClick={() => editNote(note.id)}>
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" onClick={() => deleteNote(note.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
