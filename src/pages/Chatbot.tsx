import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SendHorizontal } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

// Predefined responses for demo purposes
const aiResponses = [
  "It's completely normal to feel that way. Many women experience similar challenges.",
  "I hear you. It takes courage to share these feelings. Would it help to break down this situation into smaller, more manageable parts?",
  "You're not alone in this experience. Have you considered talking to someone you trust about how you're feeling?",
  "That sounds difficult. Remember that it's okay to prioritize your own wellbeing sometimes.",
  "I'm here to listen without judgment. Would sharing more details help you process these emotions?",
  "Your feelings are valid. Many women in our community have faced similar situations and found ways forward.",
  "It's brave of you to express this. What small step might help you feel more in control of the situation?",
  "Thank you for sharing that with me. Is there a particular aspect of this situation that's most concerning to you?",
  "I'm sorry you're going through this. Would it help to explore some coping strategies together?",
  "You've shown resilience just by reaching out. Let's think about what support might be most helpful right now.",
];

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm here to listen and support you. What's on your mind today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-pink-900">
          AI Support Companion
        </h1>
        <p className="text-muted-foreground">
          A safe space to explore your thoughts and feelings
        </p>
      </div>

      <Card className="flex flex-col h-[70vh]">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-t-lg">
          <CardTitle className="text-lg text-pink-900">
            AskHer Companion
          </CardTitle>
          <CardDescription>
            I'm here to listen, support, and provide a safe space for you
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "justify-end" : ""}`}
              >
                {message.sender === "ai" && (
                  <Avatar className="h-8 w-8 bg-pink-100">
                    <AvatarFallback className="text-pink-500 text-xs">
                      AI
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`rounded-lg p-3 max-w-[80%] ${
                    message.sender === "user"
                      ? "bg-pink-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>

                {message.sender === "user" && (
                  <Avatar className="h-8 w-8 bg-purple-100">
                    <AvatarFallback className="text-purple-500 text-xs">
                      Me
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 bg-pink-100">
                  <AvatarFallback className="text-pink-500 text-xs">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 rounded-lg p-3 w-16">
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "200ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "400ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="border-t border-pink-100 p-4">
          <div className="flex w-full gap-2">
            <Textarea
              placeholder="Type your message..."
              className="flex-1 min-h-[60px] resize-none"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              disabled={!inputMessage.trim() || isTyping}
            >
              <SendHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Chatbot;
