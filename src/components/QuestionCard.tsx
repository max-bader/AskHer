import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import {
  useApp,
  Question,
  Response as ResponseType,
} from "@/contexts/AppContext";

interface QuestionCardProps {
  question: Question;
  showResponseForm?: boolean;
}

interface ResponseProps {
  response: ResponseType;
  questionId: string;
}

const Response: React.FC<ResponseProps> = ({ response, questionId }) => {
  const [hearted, setHearted] = useState(false);
  const { giveHeartToResponse } = useApp();

  const handleHeart = () => {
    if (!hearted) {
      giveHeartToResponse(questionId, response.id);
      setHearted(true);
    }
  };

  const initial = response.isAI ? "AI" : "A";
  const timeAgo = getTimeAgo(response.createdAt);

  return (
    <div className="flex gap-3 pt-3">
      <Avatar className="h-8 w-8 bg-purple-100">
        <AvatarFallback className="text-purple-500 text-xs">
          {initial}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="bg-gray-50 rounded-lg p-3 text-sm">
          {response.content}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{timeAgo}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-muted-foreground hover:text-pink-500"
            onClick={handleHeart}
          >
            <Heart
              className={`h-3 w-3 mr-1 ${hearted ? "fill-pink-500 text-pink-500" : ""}`}
            />
            {hearted ? "Appreciated" : "Appreciate"}
          </Button>
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
}) => {
  const [responseContent, setResponseContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // Get tone badge styles
  const getToneBadge = () => {
    switch (question.tone) {
      case "advice":
        return (
          <Badge className="bg-blue-100 hover:bg-blue-200 text-blue-800">
            Seeking Advice
          </Badge>
        );
      case "listen":
        return (
          <Badge className="bg-purple-100 hover:bg-purple-200 text-purple-800">
            Just Listen
          </Badge>
        );
      case "encouragement":
        return (
          <Badge className="bg-green-100 hover:bg-green-200 text-green-800">
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
    <Card className="w-full bg-white shadow-md border-pink-100 mb-6">
      <CardHeader className="border-b border-pink-50 pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 bg-pink-100">
              <AvatarFallback className="text-pink-500 text-xs">
                A
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base text-pink-900">
                Anonymous Sister
              </CardTitle>
              <CardDescription className="text-xs">{timeAgo}</CardDescription>
            </div>
          </div>
          {getToneBadge()}
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="space-y-4">
          <p className="text-sm">{question.content}</p>

          {question.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {question.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs border-pink-200 text-pink-700"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {hasResponses && (
            <div className="mt-4 pt-2 border-t border-pink-50">
              <h4 className="text-sm font-medium text-pink-900 mb-2 flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                Responses ({question.responses.length})
              </h4>
              <div className="space-y-4">
                {question.responses.map((response) => (
                  <Response
                    key={response.id}
                    response={response}
                    questionId={question.id}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>

      {showResponseForm && (
        <CardFooter className="flex-col border-t border-pink-50 pt-4">
          {canShareToWisdomWall && (
            <div className="w-full flex justify-end mb-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs flex items-center gap-1 text-muted-foreground hover:text-pink-700"
                onClick={handleShareToWisdomWall}
              >
                <Share2 className="h-3 w-3" />
                Share to Wisdom Wall
              </Button>
            </div>
          )}

          <form onSubmit={handleResponseSubmit} className="w-full">
            <div className="space-y-3">
              <Textarea
                placeholder={`Respond with ${question.tone === "advice" ? "advice" : question.tone === "listen" ? "supportive words" : "encouragement"}...`}
                value={responseContent}
                onChange={(e) => setResponseContent(e.target.value)}
                className="min-h-[80px] resize-none"
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={!responseContent.trim() || isSubmitting}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  {isSubmitting ? "Sending..." : "Send Response"}
                </Button>
              </div>
            </div>
          </form>
        </CardFooter>
      )}
    </Card>
  );
};
