import React from "react";
import { WelcomePrompt } from "@/components/WelcomePrompt";
import { QuestionForm } from "@/components/QuestionForm";
import { QuestionCard } from "@/components/QuestionCard";
import { useApp } from "@/contexts/AppContext";

const Index = () => {
  const { getRandomQuestionsToAnswer } = useApp();

  // Get 3 random questions for the user to answer
  const questionsToAnswer = getRandomQuestionsToAnswer(3);

  return (
    <div className="flex flex-col gap-8">
      <WelcomePrompt />

      <QuestionForm />

      {questionsToAnswer.length > 0 && (
        <div className="space-y-4">
          <div className="border-b border-pink-100 pb-2">
            <h2 className="text-xl font-semibold text-pink-900">
              Support Others
            </h2>
            <p className="text-sm text-muted-foreground">
              Help other sisters by responding to their questions
            </p>
          </div>

          <div className="space-y-6">
            {questionsToAnswer.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
