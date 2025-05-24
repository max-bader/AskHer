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
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="text-center py-10">
        <h1 className="text-6xl font-serif text-[#6c5a7c] mb-4">
          Ask a Question
        </h1>
        <p className="text-xl text-gray-600 italic mb-2">
          Take a breath. You're safe here.
        </p>
        <p className="text-xl text-gray-600">
          Ask what's on your mind or heart{" "}
          <span className="text-pink-500">&lt;3</span>
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="flex gap-2 mb-16">
          <Input
            placeholder="What's weighing on you today?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 bg-white border-[#e3d7f4] rounded-md text-gray-700 h-12 focus:border-[#6c5a7c] focus:ring-[#6c5a7c]"
          />
          <Button
            type="submit"
            disabled={!question.trim()}
            className="bg-[#f9f5ff] text-[#6c5a7c] border border-[#e3d7f4] rounded-md hover:bg-[#f0e6fa] px-4"
          >
            AskHer<span className="ml-1 text-red-500 text-xs">•</span>
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </form>

        <div className="mt-16">
          <h2 className="text-2xl font-serif text-[#6c5a7c] text-center mb-6">
            Today's Light
          </h2>

          <div className="bg-white rounded-lg shadow-sm p-6 mx-auto max-w-xl">
            <div className="text-center mb-4">
              <p className="text-lg font-medium text-gray-800">
                "How do I stop shrinking myself in rooms full of men?"
              </p>
            </div>

            <div className="border-l-4 border-[#e3d7f4] pl-4 py-2 my-4 bg-[#fcf9ff]">
              <p className="text-gray-700">
                » You've been taught to be small. But your ideas, your presence,
                and your voice were never meant to be quiet.
              </p>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
              <div>Anonymous | #confidence #career</div>
              <div className="flex items-center">
                <Heart className="h-4 w-4 text-red-500 fill-red-500 mr-1" />
                <span>61 people found this comforting</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;
