import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Heart, Search, Filter } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const TopicExplorer = () => {
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
    <div className="container mx-auto px-4 py-6">
      <div className="text-center py-10">
        <h1 className="text-6xl font-serif text-[#6c5a7c] mb-4">
          Explore Topics
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse the collective wisdom of our community by topic
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search the wall"
              className="pl-10 bg-[#f9f5ff] border-[#e3d7f4]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Filter className="h-4 w-4 text-[#6c5a7c]" />
              <span className="text-sm font-medium text-[#6c5a7c]">
                Tags | Filters
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedTags.includes(tag)
                      ? "bg-[#6c5a7c] hover:bg-[#5d4c6d]"
                      : "border-[#e3d7f4] text-[#6c5a7c] hover:bg-[#f9f5ff]"
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {filteredQuestions.length > 0 ? (
          <div className="space-y-6">
            {filteredQuestions.map((question) => (
              <div
                key={question.id}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="text-sm text-gray-500 mb-2">Someone said:</div>
                <p className="text-lg mb-3">"{question.content}"</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {question.tags.map((tag) => (
                    <span key={tag} className="text-xs text-[#6c5a7c]">
                      #{tag}
                    </span>
                  ))}
                </div>

                {question.responses.length > 0 && (
                  <div className="border-l-4 border-[#e3d7f4] pl-4 py-2 my-4 bg-[#fcf9ff]">
                    <p className="text-gray-700">
                      » {question.responses[0].content}
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
                  <div>
                    {question.tags.map((tag, i) => (
                      <span key={i}>
                        {i > 0 && " "}#{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-red-500 mr-1" />
                    <span>
                      {Math.floor(Math.random() * 80) + 10} people found this
                      comforting
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-gray-500">
              {searchQuery || selectedTags.length > 0
                ? "No questions match your search filters"
                : "No questions have been shared to the Wisdom Wall yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicExplorer;
