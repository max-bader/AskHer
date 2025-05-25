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
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-[72px] leading-[80px] font-['DM_Sans'] font-bold text-[#856787] mb-4">
            Wisdom
            <br />
            Wall
          </h1>
          <p className="text-xl font-['DM_Sans'] text-gray-600 mb-2">
            A growing garden of anonymous support and reflection.
          </p>
          <p className="text-xl font-['DM_Sans'] text-gray-600">
            Explore advice, comfort, and <span className="text-[#856787]">real</span> stories left by others
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <div className="w-96">
            <Input 
              placeholder="Search the wall" 
              className="bg-white/50 border-none rounded-md shadow-sm h-12 font-['DM_Sans']" 
            />
          </div>
          <Button variant="outline" className="bg-white/50 border-none h-12 rounded-md shadow-sm font-['DM_Sans']">
            Tags | Filters <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Posts */}
        <div className="grid grid-cols-2 gap-6 max-w-6xl mx-auto">
          {posts.map((post, index) => (
            <div 
              key={post.id} 
              style={{
                gridColumn: index % 2 === 0 ? '1' : '2',
                gridRow: showCommentInput[post.id] ? `span 2` : 'span 1'
              }}
              className={`
                relative border-4 border-[#E5D0E6] rounded-3xl overflow-hidden shadow-md
                ${showCommentInput[post.id] ? 'pb-0' : ''} 
                h-fit
              `}
            >
              <div className="bg-[#F3EEEA] p-6">
                <p className="text-gray-600 mb-4 font-['DM_Sans']">Someone {post.id === "1" ? "wrote" : "said"}:</p>
                <p className="text-lg mb-6 font-['DM_Sans']">"{post.content}"</p>

                {/* Actions */}
                <div className="flex items-center gap-4 mb-0">
                  <button className="flex items-center gap-1 text-[#856787] bg-[#F5DCF7] px-3 py-1 rounded-full">
                    <Heart className="h-4 w-4" />
                    <span>{post.hearts}</span>
                  </button>
                  <button
                    onClick={() => toggleCommentInput(post.id)}
                    className="flex items-center gap-1 text-[#856787] bg-[#F5DCF7] px-3 py-1 rounded-full"
                  >
                    <span>💬</span>
                    <span>{post.comments.length}</span>
                  </button>
                  {post.hashtag && (
                    <span className="text-[#856787] ml-2">#{post.hashtag}</span>
                  )}
                  <span className="text-gray-500 ml-auto">Sent {post.timestamp}</span>
                </div>
              </div>

              {/* Comment Input & List */}
              {showCommentInput[post.id] && (
                <div className="bg-[#E5D0E6] p-6">
                  <Input
                    placeholder="Comment, comfort, or connect"
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
                    className="bg-white/80 border-none rounded-full mb-4 font-['DM_Sans']"
                  />
                  <div className="space-y-3">
                    {post.comments.map((c) => (
                      <div key={c.id} className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#856787] flex items-center justify-center text-white text-sm">
                          {c.author.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 font-['DM_Sans']">{c.content}</p>
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
