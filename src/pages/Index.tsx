import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "@/components/QuestionCard";
import { useApp } from "@/contexts/AppContext";
import { ArrowRight, Heart } from "lucide-react";

const Index = () => {
  const { getRandomQuestionsToAnswer } = useApp();

  // Get 3 random questions for the user to answer
  const questionsToAnswer = getRandomQuestionsToAnswer(3);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="text-center py-10">
        <h1 className="text-6xl font-serif text-[#6c5a7c] mb-4">Wisdom Wall</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A growing garden of anonymous support and reflection. Explore advice,
          comfort, and <span className="text-pink-500">real</span> stories left
          by others
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
          <Link
            to="/ask"
            className="bg-[#6c5a7c] text-white px-6 py-3 rounded-md hover:bg-[#5d4c6d] flex items-center"
          >
            Ask a Question <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            to="/topics"
            className="bg-white text-[#6c5a7c] border border-[#e3d7f4] px-6 py-3 rounded-md hover:bg-[#f9f5ff]"
          >
            Browse Topics
          </Link>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-serif text-[#6c5a7c] mb-6">
            Today's Light
          </h2>

          <div className="bg-white rounded-lg shadow-sm p-6">
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

        <h2 className="text-2xl font-serif text-[#6c5a7c] mb-6">
          Recent Conversations
        </h2>

        <div className="space-y-6">
          {questionsToAnswer.map((question) => (
            <div
              key={question.id}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="text-sm text-gray-500 mb-2">Someone wrote:</div>
              <p className="text-lg mb-3">"{question.content}"</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {question.tags.map((tag) => (
                  <span key={tag} className="text-xs text-[#6c5a7c]">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <button className="flex items-center gap-1 hover:text-[#6c5a7c]">
                  [ Send a heart ]
                </button>
                <button className="flex items-center gap-1 hover:text-[#6c5a7c]">
                  [ Share anonymously ]
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
