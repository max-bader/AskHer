import React from "react";
import { WelcomePrompt } from "@/components/WelcomePrompt";
import { QuestionCard } from "@/components/QuestionCard";
import { QuestionForm } from "@/components/QuestionForm";
import { useApp } from "@/contexts/AppContext";
import { Card } from "@/components/ui/card";
import { PenSquare, TrendingUp, Clock, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { getRandomQuestionsToAnswer } = useApp();

  // Get questions for the user to answer
  const questionsToAnswer = getRandomQuestionsToAnswer(5);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <WelcomePrompt />

      {/* Create Post Card */}
      <Card className="bg-white shadow-sm p-3 flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
          A
        </div>
        <button
          onClick={() =>
            document
              .getElementById("question-form")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="flex-1 bg-gray-100 hover:bg-gray-200 transition-colors rounded-md px-4 py-2 text-gray-500 text-left"
        >
          Ask your question...
        </button>
        <Button
          size="sm"
          className="bg-orange-500 hover:bg-orange-600 text-white"
          onClick={() =>
            document
              .getElementById("question-form")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <PenSquare className="h-4 w-4" />
        </Button>
      </Card>

      {/* Content tabs */}
      <div className="bg-white shadow-sm rounded-md flex text-sm font-medium border-b border-gray-200">
        <button className="flex-1 py-3 px-4 text-orange-500 border-b-2 border-orange-500">
          For You
        </button>
        <button className="flex-1 py-3 px-4 text-gray-500 hover:bg-gray-50">
          Following
        </button>
        <button className="flex-1 py-3 px-4 text-gray-500 hover:bg-gray-50">
          Trending
        </button>
      </div>

      {/* Questions Feed */}
      <div className="space-y-4">
        {questionsToAnswer.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>

      {/* Question Form */}
      <div id="question-form" className="pt-4">
        <QuestionForm />
      </div>
    </div>
  );
};

export default Index;
