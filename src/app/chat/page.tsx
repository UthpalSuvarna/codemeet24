"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const aiResponses = [
  "I understand that you're feeling this way. Can you tell me more about what's been going on?",
  "It sounds like you're going through a difficult time. Remember, it's okay to feel this way.",
  "I'm here to listen. Have you considered talking to a professional about these feelings?",
  "Let's try to break this down. What do you think is the main cause of your current state?",
  "It's brave of you to share your feelings. How can I support you right now?",
];

export default function MentalHealthCompanion() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim()) {
      const newMessage: Message = { role: "user", content: input.trim() };
      setMessages((prev) => [...prev, newMessage]);
      setInput("");

      setTimeout(() => {
        const aiResponse =
          aiResponses[Math.floor(Math.random() * aiResponses.length)];
        const aiMessage: Message = { role: "assistant", content: aiResponse };
        setMessages((prev) => [...prev, aiMessage]);
      }, 1000);
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
    <div className="flex flex-col w-screen h-screen bg-background text-foreground">
      <header className="bg-popover shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          Mental Health Companion
        </h1>
      </header>

      <ScrollArea className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`flex items-start max-w-[80%] ${
                message.role === "user" ? "flex-row-reverse" : ""
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
                className={`rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {message.content}
              </div>
            </div>
          </div>
        ))}
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
          <Button type="submit" size="icon" className="h-10 w-10"> {/* Increased button size */}
            <Send className="h-6 w-6" /> {/* Adjusted icon size */}
            <span className="sr-only">Send</span>
          </Button>
        </form>
        <p className="text-xs text-center mt-2 text-muted-foreground">
          Mental Health Companion is here to support you, but it's not a
          substitute for professional help.
        </p>
      </footer>
    </div>
  );
}
