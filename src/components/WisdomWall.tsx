import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import { useApp, Question } from "@/contexts/AppContext";
import { QuestionCard } from "@/components/QuestionCard";

export const WisdomWall: React.FC = () => {
  const { publicQuestions } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags from public questions
  const allTags = Array.from(
    new Set(publicQuestions.flatMap((q) => q.tags)),
  ).sort();

  // Filter questions based on search query and selected tags
  const filteredQuestions = publicQuestions.filter((question) => {
    const matchesSearch = searchQuery
      ? question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : true;

    const matchesTags =
      selectedTags.length > 0
        ? selectedTags.every((tag) => question.tags.includes(tag))
        : true;

    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-md border-pink-100">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-t-lg">
          <CardTitle className="text-xl text-pink-900">Wisdom Wall</CardTitle>
          <CardDescription>
            Browse anonymous questions and shared wisdom from our community
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by keyword or tag..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Filter by tags
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedTags.includes(tag)
                        ? "bg-pink-500 hover:bg-pink-600"
                        : "border-pink-200 text-pink-700 hover:bg-pink-100"
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredQuestions.length > 0 ? (
        <div className="space-y-6">
          {filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              showResponseForm={false}
            />
          ))}
        </div>
      ) : (
        <Card className="bg-white shadow-md border-pink-100 p-6 text-center">
          <p className="text-muted-foreground">
            {searchQuery || selectedTags.length > 0
              ? "No questions match your search filters"
              : "No questions have been shared to the Wisdom Wall yet"}
          </p>
        </Card>
      )}
    </div>
  );
};
