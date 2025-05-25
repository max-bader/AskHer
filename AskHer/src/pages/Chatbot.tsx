import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

// Predefined responses for demo purposes
const aiResponses = [
  "That sounds really heavy, would it help if I offered a gentle reframe?",
  "I can see how challenging that might feel. What's one small thing you could celebrate about yourself today?",
  "It's okay to feel that way. Remember that you're not defined by any single moment or experience.",
  "That's a lot to carry. Would it help to break this down into smaller pieces?",
  "I'm here to listen. Sometimes just expressing these feelings can help make them feel a little lighter.",
  "Your feelings are valid. Many women experience similar struggles. You're not alone in this.",
  "I notice you're being quite hard on yourself. How would you respond to a friend who shared this with you?",
  "Thank you for sharing that with me. Is there something specific about this situation that feels most difficult?",
  "I'm sorry you're going through this. What's one tiny step that might help you feel more grounded right now?",
  "Sometimes we need to remember that we're all works in progress. What would be a gentler way to think about this?",
];

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "What's been on your mind lately?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="text-center py-10">
        <h1 className="text-6xl font-serif text-[#6c5a7c] mb-4">
          HerLight AI Chatbot
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-2">
          Not ready to talk to others? That's okay.
        </p>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          HerLight is here to listen, reflect, and help you feel a little
          lighter.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-[#f6ecff] rounded-lg p-8 min-h-[500px] flex flex-col">
          <div className="flex-1 overflow-y-auto mb-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-6 max-w-[80%] ${
                  message.sender === "user" ? "ml-auto" : ""
                }`}
              >
                {message.sender === "user" ? (
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p>{message.content}</p>
                  </div>
                ) : (
                  <div className="text-[#6c5a7c]">
                    <p>{message.content}</p>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-end gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type here..."
              className="flex-1 bg-white border-[#e3d7f4] rounded-md h-12"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button
              onClick={handleSendMessage}
              className="bg-[#8a7c98] hover:bg-[#796a87] text-white rounded-md px-6"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
