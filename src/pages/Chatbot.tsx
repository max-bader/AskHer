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
import { Heart, SendHorizontal, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

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
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-serif text-[#6c5a7c] mb-4">
          Wisdom Companion
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A growing garden of anonymous support and reflection. Explore advice,
          comfort, and <span className="text-pink-500">real</span> conversation
          with our AI companion.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#6c5a7c] text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search the wall"
                  className="pl-10 bg-[#f9f5ff] border-[#e3d7f4]"
                />
              </div>

              <div className="space-y-2 text-sm">
                <button className="w-full text-left py-1.5 px-2 rounded hover:bg-[#f9f5ff] text-[#6c5a7c]">
                  ComfortHer
                </button>
                <button className="w-full text-left py-1.5 px-2 rounded hover:bg-[#f9f5ff] text-[#6c5a7c]">
                  #relationships
                </button>
                <button className="w-full text-left py-1.5 px-2 rounded hover:bg-[#f9f5ff] text-[#6c5a7c]">
                  #impostersyndrome
                </button>
                <button className="w-full text-left py-1.5 px-2 rounded hover:bg-[#f9f5ff] text-[#6c5a7c]">
                  #worklife
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-3/4">
          <Card className="bg-white shadow-sm border-0 h-[600px] flex flex-col">
            <CardHeader className="bg-gradient-to-r from-[#f0e6fa] to-[#f9ecff] rounded-t-lg pb-3">
              <CardTitle className="text-[#6c5a7c]">
                AI Support Companion
              </CardTitle>
              <CardDescription>
                I'm here to listen, support, and provide a safe space for you
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-4 bg-[#fcf9ff]">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === "user" ? "justify-end" : ""}`}
                  >
                    {message.sender === "ai" && (
                      <Avatar className="h-8 w-8 bg-[#f0e6fa]">
                        <AvatarFallback className="text-[#6c5a7c] text-xs">
                          AI
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`rounded-lg p-3 max-w-[80%] shadow-sm ${
                        message.sender === "user"
                          ? "bg-[#f0e6fa] text-[#6c5a7c]"
                          : "bg-white border border-[#e3d7f4] text-gray-800"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>

                    {message.sender === "user" && (
                      <Avatar className="h-8 w-8 bg-[#e3d7f4]">
                        <AvatarFallback className="text-[#6c5a7c] text-xs">
                          Me
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 bg-[#f0e6fa]">
                      <AvatarFallback className="text-[#6c5a7c] text-xs">
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-white rounded-lg p-3 border border-[#e3d7f4] w-16">
                      <div className="flex gap-1">
                        <div
                          className="w-2 h-2 rounded-full bg-[#6c5a7c] animate-bounce opacity-70"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-[#6c5a7c] animate-bounce opacity-70"
                          style={{ animationDelay: "200ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-[#6c5a7c] animate-bounce opacity-70"
                          style={{ animationDelay: "400ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="border-t border-[#e3d7f4] p-4 bg-white">
              <div className="flex w-full gap-2">
                <Textarea
                  placeholder="Type your message..."
                  className="flex-1 min-h-[60px] resize-none border-[#e3d7f4] focus:border-[#6c5a7c]"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-[#6c5a7c] hover:bg-[#5d4c6d] text-white"
                  disabled={!inputMessage.trim() || isTyping}
                >
                  <SendHorizontal className="h-5 w-5" />
                </Button>
              </div>

              <div className="w-full flex justify-between mt-3 text-xs text-gray-500">
                <p>Your conversations are private and anonymous</p>
                <button className="flex items-center gap-1 hover:text-[#6c5a7c]">
                  <Heart className="h-3 w-3" /> Send a heart
                </button>
              </div>
            </CardFooter>
          </Card>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white shadow-sm border-0">
                <CardContent className="p-4">
                  <div className="text-xs text-gray-500 mb-2">
                    Someone said:
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    "{aiResponses[i + 2].substring(0, 70)}..."
                  </p>
                  <div className="flex justify-between text-xs">
                    <button className="text-gray-500 hover:text-[#6c5a7c] flex items-center gap-1">
                      <span>[Send a heart]</span>
                    </button>
                    <span className="text-gray-400">2 days ago</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
