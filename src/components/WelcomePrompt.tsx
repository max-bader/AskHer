import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApp } from "@/contexts/AppContext";

const wellbeingPrompts = [
  "How are you feeling today?",
  "What's on your mind that you'd like to share?",
  "Is there something you're struggling with right now?",
  "What would you like support with today?",
  "What's one challenge you're facing this week?",
];

export const WelcomePrompt: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = React.useState<string>(
    wellbeingPrompts[Math.floor(Math.random() * wellbeingPrompts.length)],
  );
  const [mood, setMood] = React.useState<string>("neutral");
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
    <Card className="w-full bg-white shadow-md border-pink-100">
      <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-t-lg">
        <CardTitle className="text-xl text-pink-900">
          Welcome to AskHer
        </CardTitle>
        <CardDescription>
          A safe space for women to seek support and share wisdom
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-pink-800">
            {selectedPrompt}
          </h3>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="mood-selector"
              className="text-sm text-muted-foreground"
            >
              How are you feeling?
            </label>
            <Select value={mood} onValueChange={setMood}>
              <SelectTrigger id="mood-selector" className="w-full">
                <SelectValue placeholder="Select your mood" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="great">Great 😊</SelectItem>
                <SelectItem value="good">Good 🙂</SelectItem>
                <SelectItem value="neutral">Neutral 😐</SelectItem>
                <SelectItem value="down">A bit down 😔</SelectItem>
                <SelectItem value="struggling">Struggling 😢</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
            <p className="text-sm text-pink-800">
              {mood === "great" &&
                "That's wonderful to hear! Would you like to share some positivity with others today?"}
              {mood === "good" &&
                "Glad you're doing well! How about sharing some insights with someone who might need it?"}
              {mood === "neutral" &&
                "Sometimes neutral days are just what we need. Is there anything you'd like to ask or share?"}
              {mood === "down" &&
                "It's okay to not feel your best. This is a safe space to share what's on your mind."}
              {mood === "struggling" &&
                "I'm sorry you're having a hard time. Many women here understand and are ready to listen."}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleAskQuestion}
          className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
        >
          Ask a Question
        </Button>
        <Button
          variant="outline"
          onClick={handleBrowseTopics}
          className="w-full sm:w-auto border-pink-200 hover:bg-pink-50"
        >
          Browse Topics
        </Button>
      </CardFooter>
    </Card>
  );
};
