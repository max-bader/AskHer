import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { Heart } from "lucide-react";

const ComfortHer = () => {
  const { getRandomQuestionsToAnswer } = useApp();
  const questionsToAnswer = getRandomQuestionsToAnswer(3);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="text-center py-10">
        <h1 className="text-6xl font-['DM_Sans'] text-[#6c5a7c] mb-4">ComfortHer</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A safe space to share comfort and support.
          Find stories that resonate with yours and add your voice to the conversation.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex justify-center items-center gap-4">
          <div className="relative w-96">
            <Input
              placeholder="Search for topics..."
              className="pl-4 pr-10 py-2 rounded-md border-[#e3d7f4] bg-white font-['DM_Sans']"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              🔍
            </button>
          </div>
          <Button variant="outline" className="border-[#e3d7f4] bg-white font-['DM_Sans'] text-[#856787]">
            Tags | Filters
          </Button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          {questionsToAnswer.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-sm text-gray-500 mb-2">Someone wrote:</div>
              <p className="text-lg mb-3">"{post.content}"</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs text-[#6c5a7c]">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Comments Section */}
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-[#856787]">
                  <Heart className="h-4 w-4" />
                  <span>234</span>
                  <span className="mx-2">•</span>
                  <span>102 comments</span>
                </div>

                <Input
                  placeholder="Comment, comfort, or connect"
                  className="bg-[#f9f5fb] border-[#e3d7f4] font-['DM_Sans']"
                />

                <div className="space-y-3">
                  {/* Sample Comments */}
                  <div className="bg-[#f9f5fb] rounded-md p-3">
                    <p className="text-gray-700 font-['DM_Sans']">
                      I've been there. Start small - maybe prepare one point you definitely want to make in each meeting. It gets easier with practice ❤️
                    </p>
                    <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                      <span className="font-['DM_Sans']">Anonymous • 2 days ago</span>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3 text-[#856787]" />
                        <span>12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComfortHer; 