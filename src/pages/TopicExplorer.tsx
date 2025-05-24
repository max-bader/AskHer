import React, { useState } from "react";
import {
  Search,
  ArrowUp,
  Calendar,
  TrendingUp,
  Sparkles,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { QuestionCard } from "@/components/QuestionCard";
import { useApp } from "@/contexts/AppContext";

const TopicExplorer = () => {
  const { publicQuestions } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"popular" | "newest" | "trending">(
    "popular",
  );

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

  // Sort questions based on selected order
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortOrder === "trending") {
      return b.responses.length - a.responses.length;
    } else {
      // Default to popular (random for demo)
      return Math.random() - 0.5;
    }
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Browse Topics</h1>
        <p className="text-gray-600">
          Explore the collective wisdom of our community
        </p>
      </div>

      <div className="bg-white rounded-md shadow-sm mb-6">
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by keyword or tag..."
              className="pl-10 bg-gray-50 border-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Sort by</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant={sortOrder === "popular" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortOrder("popular")}
                className={
                  sortOrder === "popular"
                    ? "bg-orange-500 hover:bg-orange-600"
                    : ""
                }
              >
                <ArrowUp className="h-4 w-4 mr-1" />
                Popular
              </Button>
              <Button
                variant={sortOrder === "newest" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortOrder("newest")}
                className={
                  sortOrder === "newest"
                    ? "bg-orange-500 hover:bg-orange-600"
                    : ""
                }
              >
                <Calendar className="h-4 w-4 mr-1" />
                Newest
              </Button>
              <Button
                variant={sortOrder === "trending" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortOrder("trending")}
                className={
                  sortOrder === "trending"
                    ? "bg-orange-500 hover:bg-orange-600"
                    : ""
                }
              >
                <TrendingUp className="h-4 w-4 mr-1" />
                Trending
              </Button>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">Popular tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer rounded-md ${
                    selectedTags.includes(tag)
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {sortedQuestions.length > 0 ? (
        <div className="space-y-4">
          {sortedQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              showResponseForm={false}
            />
          ))}
        </div>
      ) : (
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Sparkles className="h-12 w-12 text-orange-300 mb-3" />
            <h3 className="text-lg font-medium mb-1">No results found</h3>
            <p className="text-gray-500 text-center max-w-md">
              {searchQuery || selectedTags.length > 0
                ? "Try adjusting your search filters to find what you're looking for"
                : "No questions have been shared to the Wisdom Wall yet"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TopicExplorer;
