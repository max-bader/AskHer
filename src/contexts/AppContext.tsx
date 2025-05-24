import React, { createContext, useContext, useEffect, useState } from "react";

// Simple UUID generator function (replacement for uuid package)
const generateId = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Define types
export type QuestionTone = "advice" | "listen" | "encouragement";

export interface Question {
  id: string;
  content: string;
  tone: QuestionTone;
  createdAt: Date;
  userId: string;
  responses: Response[];
  isPublic: boolean;
  tags: string[];
}

export interface Response {
  id: string;
  content: string;
  createdAt: Date;
  userId: string;
  isAI: boolean;
}

export interface User {
  id: string;
  points: number;
  heartsReceived: number;
  questionsAsked: number;
  responsesGiven: number;
  supportTitle: string;
}

interface AppContextType {
  user: User;
  questions: Question[];
  publicQuestions: Question[];
  addQuestion: (content: string, tone: QuestionTone, tags: string[]) => void;
  addResponse: (questionId: string, content: string) => void;
  makeQuestionPublic: (questionId: string) => void;
  getSupportTitle: (points: number) => string;
  getTodayQuestion: () => Question | null;
  getRandomQuestionsToAnswer: (count: number) => Question[];
  giveHeartToResponse: (questionId: string, responseId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Sample questions for testing
const sampleQuestions: Question[] = [
  {
    id: "q1",
    content:
      "How do you handle feeling overwhelmed at work when deadlines are approaching?",
    tone: "advice",
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    userId: "system",
    responses: [
      {
        id: "r1",
        content:
          "I break down tasks into smaller chunks and tackle them one by one. It helps me see progress and feel less overwhelmed.",
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        userId: "user1",
        isAI: false,
      },
      {
        id: "r2",
        content:
          "Taking short breaks to breathe or meditate helps me. Sometimes stepping away for 5 minutes clears my mind.",
        createdAt: new Date(Date.now() - 21600000), // 6 hours ago
        userId: "user2",
        isAI: false,
      },
    ],
    isPublic: true,
    tags: ["work", "stress", "time-management"],
  },
  {
    id: "q2",
    content:
      "I'm constantly comparing myself to others on social media and it's affecting my self-esteem. Does anyone else struggle with this?",
    tone: "listen",
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
    userId: "system",
    responses: [
      {
        id: "r3",
        content:
          "I've been there too. Remember that people only post their highlights, not their struggles. You're seeing their curated life, not reality.",
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        userId: "user3",
        isAI: false,
      },
    ],
    isPublic: true,
    tags: ["social-media", "self-esteem", "mental-health"],
  },
  {
    id: "q3",
    content:
      "I recently had to make a difficult decision that I know was right for me, but I still feel guilty about it. How do I move forward?",
    tone: "encouragement",
    createdAt: new Date(Date.now() - 259200000), // 3 days ago
    userId: "system",
    responses: [],
    isPublic: true,
    tags: ["decisions", "guilt", "self-care"],
  },
];

// Support titles based on points
const supportTitles = [
  { threshold: 0, title: "New Supporter" },
  { threshold: 10, title: "Empathy Builder" },
  { threshold: 25, title: "Quiet Supporter" },
  { threshold: 50, title: "Wisdom Sharer" },
  { threshold: 100, title: "Compassion Champion" },
  { threshold: 200, title: "Sisterhood Pillar" },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize or retrieve user ID from localStorage
  const [user, setUser] = useState<User>(() => {
    const storedUser = localStorage.getItem("askher-user");
    if (storedUser) {
      return JSON.parse(storedUser);
    }

    return {
      id: generateId(),
      points: 0,
      heartsReceived: 0,
      questionsAsked: 0,
      responsesGiven: 0,
      supportTitle: "New Supporter",
    };
  });

  // Store questions in state
  const [questions, setQuestions] = useState<Question[]>(sampleQuestions);

  // Get only public questions for the wisdom wall
  const publicQuestions = questions.filter((q) => q.isPublic);

  // Save user to localStorage when changed
  useEffect(() => {
    localStorage.setItem("askher-user", JSON.stringify(user));
  }, [user]);

  // Get support title based on points
  const getSupportTitle = (points: number): string => {
    const title = supportTitles
      .slice()
      .reverse()
      .find((t) => points >= t.threshold);

    return title ? title.title : "New Supporter";
  };

  // Add a new question
  const addQuestion = (content: string, tone: QuestionTone, tags: string[]) => {
    const newQuestion: Question = {
      id: generateId(),
      content,
      tone,
      createdAt: new Date(),
      userId: user.id,
      responses: [],
      isPublic: false,
      tags,
    };

    setQuestions((prev) => [newQuestion, ...prev]);
    setUser((prev) => ({
      ...prev,
      questionsAsked: prev.questionsAsked + 1,
      points: prev.points + 2, // 2 points for asking a question
    }));
  };

  // Add a response to a question
  const addResponse = (questionId: string, content: string) => {
    const newResponse: Response = {
      id: generateId(),
      content,
      createdAt: new Date(),
      userId: user.id,
      isAI: false,
    };

    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? { ...q, responses: [...q.responses, newResponse] }
          : q,
      ),
    );

    setUser((prev) => ({
      ...prev,
      responsesGiven: prev.responsesGiven + 1,
      points: prev.points + 5, // 5 points for giving a response
    }));
  };

  // Make a question public (add to wisdom wall)
  const makeQuestionPublic = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, isPublic: true } : q)),
    );

    setUser((prev) => ({
      ...prev,
      points: prev.points + 3, // 3 points for sharing with community
    }));
  };

  // Get today's question (or null if already asked today)
  const getTodayQuestion = (): Question | null => {
    const today = new Date().toDateString();
    const userQuestions = questions.filter((q) => q.userId === user.id);

    const askedToday = userQuestions.some(
      (q) => new Date(q.createdAt).toDateString() === today,
    );

    if (askedToday) {
      return null;
    }

    return null; // No question for today yet
  };

  // Get random questions for the user to answer (excluding their own)
  const getRandomQuestionsToAnswer = (count: number): Question[] => {
    const otherQuestions = questions.filter((q) => q.userId !== user.id);

    // Prioritize questions with fewer responses
    const sortedQuestions = [...otherQuestions].sort(
      (a, b) => a.responses.length - b.responses.length,
    );

    return sortedQuestions.slice(0, count);
  };

  // Give a heart to a response
  const giveHeartToResponse = (questionId: string, responseId: string) => {
    // In a real app, we'd track which responses received hearts
    // For this MVP, we'll just update the user's hearts received
    const question = questions.find((q) => q.id === questionId);
    if (!question) return;

    const response = question.responses.find((r) => r.id === responseId);
    if (!response) return;

    // Update the user who received the heart (in a real app)
    // For now just increment the counter
    setUser((prev) => ({
      ...prev,
      heartsReceived: prev.heartsReceived + 1,
    }));
  };

  const contextValue: AppContextType = {
    user,
    questions,
    publicQuestions,
    addQuestion,
    addResponse,
    makeQuestionPublic,
    getSupportTitle,
    getTodayQuestion,
    getRandomQuestionsToAnswer,
    giveHeartToResponse,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
