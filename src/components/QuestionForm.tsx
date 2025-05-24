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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Info, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useApp, QuestionTone } from "@/contexts/AppContext";

const MAX_QUESTION_LENGTH = 500;
const MAX_TAGS = 5;

export const QuestionForm: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [tone, setTone] = useState<QuestionTone>("advice");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim()) return;

    setIsSubmitting(true);

    // Submit the question to the context
    addQuestion(question, tone, tags);

    // Show success message and reset form
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setQuestion("");
      setTone("advice");
      setTags([]);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1000);
  };

  const remainingChars = MAX_QUESTION_LENGTH - question.length;

  return (
    <Card
      className="w-full bg-white shadow-md border-pink-100"
      id="question-form"
    >
      <CardHeader className="border-b border-pink-50">
        <CardTitle className="text-lg text-pink-900">
          Ask Your Question
        </CardTitle>
        <CardDescription>
          Your question will be anonymous and shared with others who can provide
          support
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Your Question
              <span className="text-xs text-muted-foreground ml-2">
                ({remainingChars} characters remaining)
              </span>
            </label>
            <Textarea
              placeholder="What would you like to ask? Share your question here..."
              className="min-h-[120px] resize-none"
              value={question}
              onChange={handleQuestionChange}
              maxLength={MAX_QUESTION_LENGTH}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label htmlFor="tone-selector" className="text-sm font-medium">
                Response Tone
              </label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select what type of responses you'd prefer to receive</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Select
              value={tone}
              onValueChange={(value) => setTone(value as QuestionTone)}
            >
              <SelectTrigger id="tone-selector">
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
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tags (up to 5)</label>
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-pink-100 hover:bg-pink-200 text-pink-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-pink-950"
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
                className="flex-1"
                disabled={tags.length >= MAX_TAGS}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddTag}
                disabled={!tagInput.trim() || tags.length >= MAX_TAGS}
                className="border-pink-200 hover:bg-pink-50"
              >
                Add
              </Button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t border-pink-50 pt-4">
          <div>
            {isSuccess && (
              <span className="text-sm text-green-600 font-medium">
                Your question has been submitted successfully!
              </span>
            )}
          </div>
          <Button
            type="submit"
            disabled={!question.trim() || isSubmitting}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            {isSubmitting ? "Submitting..." : "Submit Question"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
