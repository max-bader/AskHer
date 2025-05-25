import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

// Predefined responses for demo purposes
// replace with actual AI responses ****
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

const HerLight = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsExpanded(true);
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/chatbot/chat", {
        message: userMessage.content,
        session_id: sessionId
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.data.response,
        sender: "ai",
        timestamp: new Date(),
      };

      setSessionId(response.data.session_id);
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5DCF7]">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-6">
          <h1 className="text-[72px] font-['DM_Sans'] font-bold text-[#856787] leading-none mb-8">
            HerLight AI Chatbot
          </h1>
          <p className="text-xl font-['DM_Sans'] text-gray-600 max-w-3xl mx-auto mb-2">
            Not ready to talk to others? That's okay.
          </p>
          <p className="text-xl font-['DM_Sans'] text-gray-600 max-w-3xl mx-auto mb-6">
            HerLight is here to listen, reflect, and help you feel a little lighter.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {!isExpanded ? (
            <div className="flex justify-center gap-2 mb-6">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="What's on your mind?"
                className="max-w-xl bg-white border-[#e3d7f4] rounded-lg h-12 font-['DM_Sans']"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="bg-[#8a7c98] hover:bg-[#796a87] text-white rounded-lg px-6 h-12 font-['DM_Sans']"
              >
                {isLoading ? "Sending..." : "Share"}
              </Button>
            </div>
          ) : (
            <div className="bg-[#f3d4f7] rounded-lg p-6 min-h-[400px] max-h-[400px] flex flex-col shadow-lg transition-all duration-300 ease-in-out">
              <div className="flex-1 overflow-y-auto mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 max-w-[80%] ${
                      message.sender === "user" ? "ml-auto" : ""
                    }`}
                  >
                    {message.sender === "user" ? (
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="font-['DM_Sans']">{message.content}</p>
                      </div>
                    ) : (
                      <div className="text-[#6c5a7c]">
                        <p className="font-['DM_Sans']">{message.content}</p>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type here..."
                  className="flex-1 bg-white border-[#e3d7f4] rounded-lg h-10 font-['DM_Sans']"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="bg-[#8a7c98] hover:bg-[#796a87] text-white rounded-lg px-6 h-10 font-['DM_Sans']"
                >
                  {isLoading ? "Sending..." : "Send"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HerLight;
