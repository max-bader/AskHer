import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Info, X, Image, Link as LinkIcon, Tag as TagIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useApp, QuestionTone } from "@/contexts/AppContext";

const MAX_QUESTION_LENGTH = 500;
const MAX_TAGS = 5;

interface QuestionFormProps {
  onSubmit?: (response: any) => void;
}

export const QuestionForm = ({ onSubmit }: QuestionFormProps) => {
  const [question, setQuestion] = useState("");
  const [tone, setTone] = useState<QuestionTone>("advice");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { addQuestion } = useApp();

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_QUESTION_LENGTH) {
      setQuestion(e.target.value);
    }
  };

  const handleAddTag = () => {
    if (
      tagInput.trim() &&
      tags.length < MAX_TAGS &&
      !tags.includes(tagInput.trim())
    ) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 'user-123',
          content: question,
          tone: 'advice'
        }),
      });

      const data = await response.json();
      console.log('Response:', data);
      
      // Clear the input
      setQuestion('');
      
      // Call the onSubmit callback if provided
      if (onSubmit) {
        onSubmit(data);
      }
    } catch (error) {
      console.error('Error submitting question:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const remainingChars = MAX_QUESTION_LENGTH - question.length;

  return (
    <Card className="bg-white shadow-sm border-0">
      <CardHeader className="pb-0 pt-4">
        <h2 className="text-lg font-medium">Create a post</h2>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium">Response Tone</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    Select what type of responses you'd prefer to receive
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Select
            value={tone}
            onValueChange={(value) => setTone(value as QuestionTone)}
          >
            <SelectTrigger className="w-full bg-gray-50 border-gray-200">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="advice">
                Advice - I'm looking for solutions
              </SelectItem>
              <SelectItem value="listen">
                Just Listen - I need to be heard
              </SelectItem>
              <SelectItem value="encouragement">
                Encouragement - I need support
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="space-y-2">
            <Textarea
              placeholder="What would you like to ask? Share your question here..."
              className="min-h-[120px] resize-none bg-gray-50 border-gray-200"
              value={question}
              onChange={handleQuestionChange}
              maxLength={MAX_QUESTION_LENGTH}
              required
              disabled={isLoading}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{remainingChars} characters remaining</span>
              {isSuccess && (
                <span className="text-green-600 font-medium">
                  Your question has been submitted successfully!
                </span>
              )}
            </div>
          </div>

          <div className="border border-gray-200 rounded-md p-2">
            <div className="flex mb-2 text-sm text-gray-700">
              <TagIcon className="h-4 w-4 mr-1" /> Tags (up to 5)
            </div>

            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-gray-100 text-gray-700 rounded-md"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-gray-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Add a tag (e.g., work, relationships)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-gray-50 border-gray-200"
                disabled={tags.length >= MAX_TAGS}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddTag}
                disabled={!tagInput.trim() || tags.length >= MAX_TAGS}
                className="border-gray-300"
              >
                Add
              </Button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t border-gray-200 pt-3 pb-4">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-gray-500"
            >
              <Image className="h-4 w-4 mr-1" /> Images
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-gray-500"
            >
              <LinkIcon className="h-4 w-4 mr-1" /> Link
            </Button>
          </div>

          <Button
            type="submit"
            disabled={!question.trim() || isLoading}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isLoading ? 'Sending...' : 'AskHer'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
