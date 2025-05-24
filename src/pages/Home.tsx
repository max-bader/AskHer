import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Heart, ArrowRight, Send } from "lucide-react";

interface Comment {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  hearts: number;
}

interface Post {
  id: string;
  content: string;
  hearts: number;
  timestamp: string;
  hashtag?: string;
  comments: Comment[];
}

const initialPosts: Post[] = [
  {
    id: "1",
    content:
      "I'm the only woman on my team and I'm scared to speak up in meetings.",
    hearts: 38,
    timestamp: "3 days ago",
    comments: [
      {
        id: "c1",
        content:
          "I've been there. Start small - maybe prepare one point you definitely want to make in each meeting. It gets easier with practice ❤️",
        author: "Anonymous",
        timestamp: "2 days ago",
        hearts: 12,
      },
      {
        id: "c2",
        content:
          "Your voice matters. Remember that you were hired because of your skills and perspective.",
        author: "Anonymous",
        timestamp: "1 day ago",
        hearts: 8,
      },
    ],
  },
  {
    id: "2",
    content:
      "I feel like I'm not smart enough to be in this program. Everyone else seems to get it but me.",
    hearts: 72,
    timestamp: "1 day ago",
    hashtag: "impostersyndrome",
    comments: [
      {
        id: "c3",
        content:
          "Imposter syndrome is so real, but it's also a sign that you're pushing yourself to grow. You belong here.",
        author: "Anonymous",
        timestamp: "1 day ago",
        hearts: 15,
      },
    ],
  },
  {
    id: "3",
    content:
      "My partner makes subtle comments about my appearance that hurt. Am I being too sensitive?",
    hearts: 64,
    timestamp: "2 days ago",
    hashtag: "relationships",
    comments: [
      {
        id: "c4",
        content:
          "Your feelings are valid. Those little comments can really add up and impact your self-esteem.",
        author: "Anonymous",
        timestamp: "1 day ago",
        hearts: 20,
      },
    ],
  },
];

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newComments, setNewComments] = useState<{ [postId: string]: string }>({});
  const [showCommentInput, setShowCommentInput] = useState<{ [postId: string]: boolean }>({});

  const toggleCommentInput = (postId: string) => {
    setShowCommentInput((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleAddComment = (postId: string) => {
    const text = newComments[postId]?.trim();
    if (!text) return;

    const newComment: Comment = {
      id: `c${Date.now()}`,
      content: text,
      author: "Anonymous",
      timestamp: "Just now",
      hearts: 0,
    };

    setPosts((all) =>
      all.map((p) =>
        p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p
      )
    );
    setNewComments((prev) => ({ ...prev, [postId]: "" }));
  };

  return (
    <div className="min-h-screen bg-[#F5DCF7]">
      {/* Nav */}
      <nav className="bg-white py-4 px-6 flex justify-between items-center border-b">
        <div className="text-2xl font-bold">AskHer</div>
        <div className="flex space-x-6">
          {["Home", "Ask a Question", "HerLight", "Journal", "Resources"].map((label) => (
            <a key={label} href="#" className="text-gray-600 hover:text-gray-900">
              {label}
            </a>
          ))}
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Login
          </a>
          <Button className="bg-[#8a7c98] hover:bg-[#796a87] text-white">
            Sign Up
          </Button>
        </div>
      </nav>

      {/* Header */}
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-8xl font-['DM_Sans'] text-[#6c5a7c] mb-8">Wisdom Wall</h1>
        <p className="text-xl text-gray-600">A growing garden of anonymous support and reflection.</p>
        <p className="text-xl text-gray-600 mb-8">
          Explore advice, comfort, and <span className="text-[#856787]">real</span> stories left by others
        </p>

        {/* Search & Buttons */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <div className="relative w-96">
            <Input placeholder="Search the wall" className="pl-4 pr-10" />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">🔍</button>
          </div>
          <Button variant="outline" className="border-[#e3d7f4] text-[#856787]">
            Tags | Filters <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button className="bg-[#856787] hover:bg-[#6c5a7c] text-white">
            ComfortHer <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg p-6 shadow-sm border border-[#e3d7f4]">
              <p className="text-gray-500 mb-2">Someone {post.id === "1" ? "wrote" : "said"}:</p>
              <p className="text-lg mb-4">"{post.content}"</p>

              {/* Actions */}
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <div className="flex space-x-2">
                  <button className="hover:text-[#856787]">[ Send a heart ]</button>
                  <button
                    onClick={() => toggleCommentInput(post.id)}
                    className="hover:text-[#856787]"
                  >
                    [ Comment ] ({post.comments.length})
                  </button>
                </div>
                <div className="flex items-center">
                  {post.hashtag && <span className="mr-2">#{post.hashtag}</span>}
                  <span>Sent {post.timestamp} | </span>
                  <Heart className="h-4 w-4 ml-1 text-[#856787]" />
                  <span className="ml-1">{post.hearts}</span>
                </div>
              </div>

              {/* Comment Input & List */}
              {showCommentInput[post.id] && (
                <div className="mt-4 border-t border-[#e3d7f4] pt-4">
                  <div className="flex gap-2 mb-4">
                    <Input
                      placeholder="Share your thoughts..."
                      value={newComments[post.id] || ""}
                      onChange={(e) =>
                        setNewComments((prev) => ({ ...prev, [post.id]: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddComment(post.id);
                        }
                      }}
                    />
                    <Button onClick={() => handleAddComment(post.id)} className="px-3 bg-[#856787] hover:bg-[#6c5a7c]">
                      <Send className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {post.comments.map((c) => (
                      <div key={c.id} className="bg-[#f9f5fb] rounded-md p-3">
                        <p className="text-gray-700">{c.content}</p>
                        <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                          <span>Anonymous • {c.timestamp}</span>
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3 text-[#856787]" />
                            <span>{c.hearts}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
