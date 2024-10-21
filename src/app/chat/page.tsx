"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, User, Mic, MicOff } from "lucide-react";
import { useSession } from "next-auth/react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const chatbotAPIUrl = "https://a4b3-103-62-151-30.ngrok-free.app/ask"; // Your chatbot API endpoint

export default function MentalHealthCompanion() {
    const { data: session } = useSession();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

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

                setInput(transcript);
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

    const formatMessage = (content: string) => {
        return content
            .split("\n")
            .map((line, index) => {
                const boldRegex = /\*\*(.*?)\*\*/g;
                const formattedLine = line.replace(boldRegex, "<strong>$1</strong>");
                return `<p key=${index}>${formattedLine}</p>`;
            })
            .join("");
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (input.trim()) {
            const newMessage: Message = { role: "user", content: input.trim() };
            setMessages((prev) => [...prev, newMessage]);
            setInput("");
            setIsLoading(true);

            try {
                const response = await fetch(chatbotAPIUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        question: newMessage.content,
                        user_id: session?.user?.id,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch response from chatbot.");
                }

                const data = await response.json();
                const formattedContent = formatMessage(data.answer);
                const aiMessage: Message = { role: "assistant", content: data.answer };
                setMessages((prev) => [...prev, aiMessage]);
            } catch (error) {
                console.error("Error fetching chatbot response:", error);
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: "Sorry, something went wrong. Please try again later." },
                ]);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
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
        <div className="flex justify-center items-center">
            <div className="flex flex-col w-screen h-screen bg-background text-foreground pt-11 max-w-5xl">
                <header className="bg-popover p-4 pt-6 flex justify-center items-center">
                    <h1 className="text-xl font-semibold">Mental Health Companion</h1>
                </header>
                <ScrollArea className="flex-1 p-4 overflow-y-auto">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                                } mb-4`}
                        >
                            <div
                                className={`flex items-start max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""
                                    }`}
                            >
                                <Avatar className="mt-1 mx-2 bg-muted text-muted-foreground">
                                    {message.role === "user" ? (
                                        <AvatarImage src="/placeholder-user.jpg" alt="User" />
                                    ) : (
                                        <AvatarImage src="/placeholder-bot.jpg" alt="AI" />
                                    )}
                                    <AvatarFallback className="bg-muted text-muted-foreground">
                                        {message.role === "user" ? <User /> : <Bot />}
                                    </AvatarFallback>
                                </Avatar>
                                <div
                                    className={`rounded-lg p-3 ${message.role === "user"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-secondary text-secondary-foreground"
                                        }`}
                                    dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                                />
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start mb-4">
                            <div className="flex items-center bg-secondary text-secondary-foreground rounded-lg p-3">
                                <div className="animate-pulse">Thinking...</div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </ScrollArea>
                <footer className="bg-popover p-4">
                    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                        <Textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message here..."
                            className="flex-1 mr-2 bg-input text-foreground border border-border"
                            rows={1}
                        />
                        <Button
                            type="button"
                            size="icon"
                            variant={isListening ? "destructive" : "secondary"}
                            onClick={toggleListening}
                            className="h-10 w-10 mr-2"
                        >
                            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                            <span className="sr-only">
                                {isListening ? "Stop Listening" : "Start Listening"}
                            </span>
                        </Button>
                        <Button type="submit" size="icon" className="h-10 w-10">
                            <Send className="h-6 w-6" />
                            <span className="sr-only">Send</span>
                        </Button>
                    </form>
                    <p className="text-xs text-center mt-2 text-muted-foreground">
                        Mental Health Companion is here to support you, but it's not a substitute for
                        professional help.
                    </p>
                </footer>
            </div>
        </div>
    );
}
