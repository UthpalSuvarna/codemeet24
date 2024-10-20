"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, Send, Menu, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  id: number;
  title: string;
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
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<number | null>(
    null
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  const startNewConversation = () => {
    const newId = conversations.length + 1;
    setConversations((prev) => [
      ...prev,
      { id: newId, title: `Conversation ${newId}` },
    ]);
    setCurrentConversation(newId);
    setMessages([]);
  };

  return (
    <div className="flex w-screen h-screen bg-black text-white">
      <div
        className={`bg-gray-800 text-white w-64 p-4 ${
          isMenuOpen ? "block" : "hidden"
        } md:block`}
      >
        <Button
          onClick={startNewConversation}
          variant="outline"
          className="w-full mb-4 bg-transparent text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> New chat
        </Button>
        <ScrollArea className="h-[calc(100vh-8rem)] overflow-y-auto">
          {conversations.map((conv) => (
            <Button
              key={conv.id}
              variant="ghost"
              className={`w-full justify-start mb-1 flex items-center ${
                currentConversation === conv.id ? "bg-gray-700" : ""
              }`}
              onClick={() => setCurrentConversation(conv.id)}
            >
              <Avatar className="mr-2">
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              {conv.title}
            </Button>
          ))}
        </ScrollArea>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-900 shadow p-4 flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold">Mental Health Companion</h1>
          <div className="w-6" /> {/* Placeholder for symmetry */}
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
                <Avatar className="mt-1 mx-2 bg-gray-800 text-white">
                  {message.role === "user" ? (
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  ) : (
                    <AvatarImage src="/placeholder-bot.jpg" alt="AI" />
                  )}
                  <AvatarFallback className="bg-gray-700 text-white">
                    {message.role === "user" ? <User /> : <Bot />}
                  </AvatarFallback>
                </Avatar>

                <div
                  className={`rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </ScrollArea>
        <footer className="bg-gray-900 p-4">
          <form onSubmit={handleSubmit} className="flex items-center">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 mr-2 bg-gray-800 text-white border border-gray-600"
              rows={1}
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
          <p className="text-xs text-center mt-2 text-gray-500">
            Mental Health Companion is here to support you, but it's not a
            substitute for professional help.
          </p>
        </footer>
      </div>
    </div>
  );
}