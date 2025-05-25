import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";

const AskQuestion: React.FC = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 'ef02a2e7-dd66-477e-b1ec-5413f7c58e7a',
          content: question.trim(),
          tone: 'advice'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to submit question');
      }

      const data = await response.json();
      setQuestion("");
      alert("Your question has been posted to the Wisdom Wall!");
      navigate("/");
    } catch (error) {
      console.error("Error submitting question:", error);
      alert("Failed to submit question. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5DCF7]">
      <div className="container mx-auto px-4 py-0">
        <div className="flex flex-col items-center pt-16">
          <div className="flex flex-col items-center w-full max-w-2xl">
            <div className="flex flex-row items-center w-full justify-center mb-8">
              <img src="/image2.png" alt="Bear" className="w-24 h-24 mr-6" style={{marginTop: '-32px'}} />
              <div className="flex flex-col flex-1">
                <h1 className="text-[64px] leading-[72px] font-['DM_Sans'] font-bold text-[#856787] mb-2 text-left">Ask a Question</h1>
                <p className="text-lg font-['DM_Sans'] text-[#856787] mb-2 text-left">Take a breath. You're safe here.<br />Ask what's on your mind or heart <span className="text-[#856787]">♥</span></p>
                <form onSubmit={handleSubmit} className="flex flex-row items-center w-full mt-4">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="What's weighing on you today?"
                    className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80 text-lg mr-2"
                    disabled={isSubmitting}
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting || !question.trim()}
                    className="px-6 py-3 bg-[#BFA2DB] text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold shadow-none"
                  >
                    {isSubmitting ? 'Sending...' : <span className="flex items-center">AskHer <ArrowRight className="ml-2 w-5 h-5" /></span>}
                  </Button>
                </form>
              </div>
            </div>
          </div>
          <div className="w-full max-w-2xl mt-8">
            <h2 className="text-3xl font-['DM_Sans'] text-[#856787] mb-4 text-left">Today's Light</h2>
            <div className="bg-[#F3EEEA] rounded-xl p-6 shadow-sm border-4 border-[#E5D0E6] text-left">
              <p className="text-xl mb-4">
                "How do I stop shrinking myself in rooms full of men?"
              </p>
              <div className="border-l-4 border-[#E5D0E6] p-4 mb-4">
                <p className="text-lg text-[#856787]">
                  » You've been taught to be small. But your ideas, your presence, and your voice were never meant to be quiet.
                </p>
              </div>
              <div className="flex justify-between items-center text-sm text-[#856787]">
                <div className="flex gap-2">
                  <span>Anonymous</span>
                  <span>#confidence</span>
                  <span>#career</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>❤</span>
                  <span>61 people found this comforting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion; 