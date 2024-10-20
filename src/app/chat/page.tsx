"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, User } from "lucide-react";
import { useSession } from "next-auth/react";
interface Message {
    role: "user" | "assistant";
    content: string;
}

const chatbotAPIUrl = "https://5418-2409-40f2-304a-426b-6931-48a7-d753-e96b.ngrok-free.app/ask"; // Your chatbot API endpoint

export default function MentalHealthCompanion() {
    const { data: session } = useSession();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

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
                // Send user's message to the chatbot API via POST request
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

    // Handle pressing Enter key (without Shift)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(); // Trigger form submission
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col w-screen h-screen bg-background text-foreground pt-11 max-w-5xl ">
                <header className="bg-popover  p-4 pt-6 flex justify-center items-center">
                    <h1 className="text-xl font-semibold">Mental Health Companion</h1>
                </header>
                <ScrollArea className="flex-1 p-4 overflow-y-auto ">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}
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
                                // dangerouslySetInnerHTML={{ __html: message.content }}
                                >
                                    {message.content}
                                </div>
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
                    <form onSubmit={handleSubmit} className="flex items-center">
                        <Textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown} // Listen for Enter key
                            placeholder="Type your message here..."
                            className="flex-1 mr-2 bg-input text-foreground border border-border"
                            rows={1}
                        />
                        <Button type="submit" size="icon" className="h-10 w-10">
                            {" "}
                            {/* Increased button size */}
                            <Send className="h-6 w-6" /> {/* Adjusted icon size */}
                            <span className="sr-only">Send</span>
                        </Button>
                    </form>
                    <p className="text-xs text-center mt-2 text-muted-foreground">
                        Mental Health Companion is here to support you, but it's not a substitute for professional
                        help.
                    </p>
                </footer>

            </div>
        </div>
    );
}
