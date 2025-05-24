import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, TrendingUp, Sparkles, Shield } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

export const WelcomePrompt: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useApp();

  const handleAskQuestion = () => {
    // Open the question form
    document
      .getElementById("question-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBrowseTopics = () => {
    navigate("/topics");
  };

  return (
    <div className="space-y-4">
      {/* Banner card */}
      <Card className="bg-white border-0 shadow-sm overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-orange-500 to-pink-500 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white font-bold text-2xl tracking-tight">
              AskHer
            </h1>
          </div>
        </div>
        <CardContent className="pt-4">
          <h2 className="text-lg font-medium mb-3">
            The Anonymous Sisterhood Support Chain
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            A safe, anonymous space where women can seek support, share wisdom,
            and build a community of mutual respect and understanding.
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              onClick={handleAskQuestion}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Ask a Question
            </Button>
            <Button
              variant="outline"
              onClick={handleBrowseTopics}
              className="border-gray-300"
            >
              Browse Topics
            </Button>
          </div>

          <div className="flex flex-wrap justify-between gap-2 text-sm border-t border-gray-100 pt-4">
            <div className="flex items-center gap-1 text-gray-600">
              <ArrowUp className="h-4 w-4 text-orange-500" />
              <span>12.8k Members</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              <span>548 Online Now</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Sparkles className="h-4 w-4 text-pink-500" />
              <span>Top Growing Community</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Safe Space</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sorting and filtering controls */}
      <div className="bg-white shadow-sm rounded-md p-2 flex items-center text-gray-600 text-sm">
        <Button variant="ghost" size="sm" className="text-orange-500">
          <Sparkles className="h-4 w-4 mr-1" />
          New
        </Button>
        <Button variant="ghost" size="sm">
          <TrendingUp className="h-4 w-4 mr-1" />
          Popular
        </Button>
        <Button variant="ghost" size="sm">
          Latest
        </Button>
      </div>
    </div>
  );
};
