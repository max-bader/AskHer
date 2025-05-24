import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUp,
  ArrowDown,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Heart,
  Award,
  Bookmark,
} from "lucide-react";
import {
  useApp,
  Question,
  Response as ResponseType,
} from "@/contexts/AppContext";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface QuestionCardProps {
  question: Question;
  showResponseForm?: boolean;
  isExpanded?: boolean;
}

interface ResponseProps {
  response: ResponseType;
  questionId: string;
}

const Response: React.FC<ResponseProps> = ({ response, questionId }) => {
  const [hearted, setHearted] = useState(false);
  const [votes, setVotes] = useState(Math.floor(Math.random() * 10) + 1);
  const { giveHeartToResponse } = useApp();

  const handleHeart = () => {
    if (!hearted) {
      giveHeartToResponse(questionId, response.id);
      setHearted(true);
    }
  };

  const handleUpvote = () => {
    setVotes((prev) => prev + 1);
  };

  const handleDownvote = () => {
    setVotes((prev) => prev - 1);
  };

  const initial = response.isAI ? "AI" : "A";
  const timeAgo = getTimeAgo(response.createdAt);

  return (
    <div className="flex mt-4 pt-2 border-l-2 border-gray-200 pl-4 ml-6">
      <div className="flex-shrink-0 mr-3 flex flex-col items-center">
        <Avatar className="h-8 w-8 bg-orange-100 border border-gray-200">
          <AvatarFallback className="text-orange-500 text-xs font-semibold">
            {initial}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center mt-2 text-xs text-gray-500">
          <button onClick={handleUpvote} className="hover:text-orange-500">
            <ArrowUp className="h-4 w-4" />
          </button>
          <span className="my-1 font-semibold">{votes}</span>
          <button onClick={handleDownvote} className="hover:text-blue-500">
            <ArrowDown className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center text-xs text-gray-500 mb-1">
          <span className="font-medium mr-2">Anonymous</span>
          <span className="text-gray-400">· {timeAgo}</span>
        </div>

        <div className="text-sm mb-2">{response.content}</div>

        <div className="flex items-center gap-4 text-xs text-gray-500">
          <button
            className={`flex items-center gap-1 hover:text-orange-500 ${hearted ? "text-orange-500" : ""}`}
            onClick={handleHeart}
          >
            <Heart
              className={`h-3.5 w-3.5 ${hearted ? "fill-orange-500" : ""}`}
            />
            <span>{hearted ? "Appreciated" : "Appreciate"}</span>
          </button>

          <button className="flex items-center gap-1 hover:text-gray-700">
            <Award className="h-3.5 w-3.5" />
            <span>Award</span>
          </button>

          <button className="flex items-center gap-1 hover:text-gray-700">
            <MessageCircle className="h-3.5 w-3.5" />
            <span>Reply</span>
          </button>
        </div>
      </div>
    </div>
  );
};

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - new Date(date).getTime()) / 1000,
  );

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  showResponseForm = true,
  isExpanded = false,
}) => {
  const [responseContent, setResponseContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [votes, setVotes] = useState(Math.floor(Math.random() * 50) + 5);
  const { addResponse, makeQuestionPublic } = useApp();

  const handleResponseSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!responseContent.trim()) return;

    setIsSubmitting(true);

    // Add the response
    addResponse(question.id, responseContent);

    // Reset form
    setTimeout(() => {
      setIsSubmitting(false);
      setResponseContent("");
    }, 500);
  };

  const handleShareToWisdomWall = () => {
    makeQuestionPublic(question.id);
  };

  const handleUpvote = () => {
    setVotes((prev) => prev + 1);
  };

  const handleDownvote = () => {
    setVotes((prev) => prev - 1);
  };

  // Get tone badge styles
  const getToneBadge = () => {
    switch (question.tone) {
      case "advice":
        return (
          <Badge className="bg-blue-100 text-blue-800 rounded-md">
            Seeking Advice
          </Badge>
        );
      case "listen":
        return (
          <Badge className="bg-purple-100 text-purple-800 rounded-md">
            Just Listen
          </Badge>
        );
      case "encouragement":
        return (
          <Badge className="bg-green-100 text-green-800 rounded-md">
            Need Encouragement
          </Badge>
        );
      default:
        return null;
    }
  };

  const timeAgo = getTimeAgo(question.createdAt);
  const hasResponses = question.responses.length > 0;
  const canShareToWisdomWall = !question.isPublic;

  return (
    <div className="bg-white rounded-md shadow-sm mb-4 overflow-hidden">
      <div className="p-2 flex">
        {/* Vote buttons column */}
        <div className="flex flex-col items-center px-2 pt-2">
          <button
            onClick={handleUpvote}
            className="hover:bg-orange-100 hover:text-orange-500 h-6 w-6 flex items-center justify-center rounded-md"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
          <span className="text-xs font-bold py-1">{votes}</span>
          <button
            onClick={handleDownvote}
            className="hover:bg-blue-100 hover:text-blue-500 h-6 w-6 flex items-center justify-center rounded-md"
          >
            <ArrowDown className="h-5 w-5" />
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1 px-1">
          {/* Question header */}
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <Avatar className="h-5 w-5 mr-1">
              <AvatarFallback className="bg-orange-100 text-orange-500 text-xs">
                A
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">Anonymous Sister</span>
            <span className="mx-1">·</span>
            <span>{timeAgo}</span>
            <span className="mx-2">{getToneBadge()}</span>
          </div>

          {/* Question title and body */}
          <h3 className="text-lg font-medium mb-2">
            {question.content.split(".")[0]}
          </h3>

          <div className="text-sm mb-3">
            <p>{question.content}</p>
          </div>

          {/* Tags */}
          {question.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {question.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/topics?tag=${tag}`}
                  className="text-xs text-blue-600 hover:underline px-1"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center text-gray-500 text-sm border-t border-gray-100 pt-2">
            <button className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100">
              <MessageCircle className="h-4 w-4" />
              <span>{question.responses.length} Comments</span>
            </button>

            {canShareToWisdomWall && (
              <button
                className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 ml-2"
                onClick={handleShareToWisdomWall}
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            )}

            <button className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 ml-2">
              <Bookmark className="h-4 w-4" />
              <span>Save</span>
            </button>

            <button className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 ml-auto">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Responses section */}
      {(hasResponses || showResponseForm) && (
        <div className="bg-gray-50 p-3 border-t border-gray-100">
          {hasResponses && (
            <div className="mb-3">
              {question.responses.map((response) => (
                <Response
                  key={response.id}
                  response={response}
                  questionId={question.id}
                />
              ))}
            </div>
          )}

          {/* Response form */}
          {showResponseForm && (
            <form onSubmit={handleResponseSubmit} className="mt-3">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="bg-gray-200 text-gray-500 text-xs">
                    ME
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder={`Respond with ${question.tone === "advice" ? "advice" : question.tone === "listen" ? "supportive words" : "encouragement"}...`}
                    value={responseContent}
                    onChange={(e) => setResponseContent(e.target.value)}
                    className="min-h-[80px] resize-none bg-white"
                  />
                  <div className="flex justify-end mt-2">
                    <Button
                      type="submit"
                      disabled={!responseContent.trim() || isSubmitting}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      {isSubmitting ? "Sending..." : "Comment"}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
