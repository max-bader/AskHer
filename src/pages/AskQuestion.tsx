import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Heart } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const AskQuestion = () => {
  const [question, setQuestion] = useState("");
  const { addQuestion } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    // Add question with "advice" as default tone and empty tags array
    addQuestion(question, "advice", []);
    setQuestion("");
  };

  return (
    <div className="min-h-screen bg-[#F5DCF7]">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="text-center py-6">
          <h1 className="text-[72px] font-['DM_Sans'] font-bold text-[#856787] leading-none mb-8">
            Ask a Question
          </h1>
          <p className="text-xl font-['DM_Sans'] text-gray-600 mb-2">
            Take a breath. You're safe here.
          </p>
          <p className="text-xl font-['DM_Sans'] text-gray-600 mb-12">
            Ask what's on your mind or heart{" "}
            <span className="text-[#856787]">&lt;3</span>
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-2 mb-16">
            <Input
              placeholder="What's weighing on you today?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-1 bg-white border-[#e3d7f4] rounded-md text-gray-700 h-12 focus:border-[#856787] focus:ring-[#856787] font-['DM_Sans']"
            />
            <Button
              type="submit"
              disabled={!question.trim()}
              className="bg-[#856787] hover:bg-[#6c5a7c] text-white rounded-md px-4 font-['DM_Sans']"
            >
              AskHer<span className="ml-1 text-[#f3d4f7] text-xs">•</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </form>

          <div className="mt-16">
            <h2 className="text-3xl font-['DM_Sans'] text-[#856787] text-center mb-6">
              Today's Light
            </h2>

            <div className="bg-white rounded-lg shadow-sm p-6 mx-auto max-w-xl border border-[#e3d7f4]">
              <div className="text-center mb-4">
                <p className="text-lg font-medium text-gray-800 font-['DM_Sans']">
                  "How do I stop shrinking myself in rooms full of men?"
                </p>
              </div>

              <div className="border-l-4 border-[#e3d7f4] pl-4 py-2 my-4 bg-[#f3d4f7] bg-opacity-30">
                <p className="text-gray-700 font-['DM_Sans']">
                  » You've been taught to be small. But your ideas, your presence,
                  and your voice were never meant to be quiet.
                </p>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500 mt-4 font-['DM_Sans']">
                <div>Anonymous | #confidence #career</div>
                <div className="flex items-center">
                  <Heart className="h-4 w-4 text-[#856787] fill-[#856787] mr-1" />
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
