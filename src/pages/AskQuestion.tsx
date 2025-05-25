import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
      // TODO: Implement API call to save question
      console.log("Question submitted:", question);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to home
      navigate("/");
    } catch (error) {
      console.error("Error submitting question:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5DCF7]">
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-8 mb-12">
            <img
              src="/image2.png"
              alt="Decorative illustration"
              className="w-32 h-32 object-contain"
            />
            <h1 className="text-7xl font-['DM_Sans'] font-bold text-[#856787]">
              Ask a Question
            </h1>
          </div>
          
          <div className="text-center space-y-2 mb-12">
            <p className="text-2xl text-[#856787] font-['DM_Sans']">
              Take a breath. You're safe here.
            </p>
            <p className="text-2xl text-[#856787] font-['DM_Sans']">
              Ask what's on your mind or heart <span className="text-[#856787]">❤</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What's weighing on you today?"
                className="flex-1 px-4 py-3 rounded-lg border-4 border-[#E5D0E6] bg-white font-['DM_Sans'] text-lg focus:outline-none focus:border-[#856787] shadow-sm"
              />
              <Button
                type="submit"
                disabled={!question.trim() || isSubmitting}
                className="bg-[#856787] hover:bg-[#6d566e] text-white px-6 py-2 rounded-lg font-['DM_Sans'] flex items-center gap-2"
              >
                AskHer
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </form>

          <div className="mt-16">
            <h2 className="text-4xl font-['DM_Sans'] text-[#856787] mb-8">
              Today's Light
            </h2>
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