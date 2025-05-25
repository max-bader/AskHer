import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Heart, ArrowRight, Send } from "lucide-react";
import SimpleQuestionForm from "@/components/SimpleQuestionForm";

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
  const [likedPosts, setLikedPosts] = useState<string[]>(() => {
    const saved = localStorage.getItem("likedPosts");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
  }, [likedPosts]);

  useEffect(() => {
    // Fetch posts from backend and merge with initialPosts
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/questions");
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        console.log('Fetched questions from backend:', data);
        
        // Map backend data to Post shape
        const mapped = data.map((q: any) => ({
          id: q.id,
          content: q.content,
          hearts: q.hearts || 0,
          timestamp: q.created_at ? new Date(q.created_at).toLocaleDateString() : "Just now",
          hashtag: q.hashtag,
          comments: q.comments || [],
        }));

        // Merge initialPosts and mapped, avoiding duplicates by id
        const allPosts = [...initialPosts];
        mapped.forEach((post: Post) => {
          if (!allPosts.some((p) => p.id === post.id)) {
            allPosts.push(post);
          }
        });
        setPosts(allPosts);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setPosts(initialPosts);
      }
    };

    fetchPosts();
  }, []);

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

  const handleNewPost = (newPost: any, submittedContent: string) => {
    const post = Array.isArray(newPost) ? newPost[0] : newPost;
    setPosts(prev => [
      {
        id: post.id || `${Date.now()}`,
        content: submittedContent,
        hearts: 0,
        timestamp: "Just now",
        hashtag: post.hashtag,
        comments: [],
      },
      ...prev,
    ]);
  };

  const handleUpvote = async (postId: string) => {
    if (likedPosts.includes(postId)) {
      // Unlike: remove from likedPosts and decrement hearts
      setLikedPosts(prev => {
        const updated = prev.filter(id => id !== postId);
        localStorage.setItem("likedPosts", JSON.stringify(updated));
        return updated;
      });
      setPosts(prev =>
        prev.map(post =>
          post.id === postId ? { ...post, hearts: Math.max(0, post.hearts - 1) } : post
        )
      );
      // Optionally: send a request to backend to remove upvote if you have such an endpoint
      // await fetch(`http://127.0.0.1:8000/responses/${postId}/unupvote`, { ... });
    } else {
      // Like: add to likedPosts and increment hearts
      setLikedPosts(prev => {
        const updated = [...prev, postId];
        localStorage.setItem("likedPosts", JSON.stringify(updated));
        return updated;
      });
      setPosts(prev =>
        prev.map(post =>
          post.id === postId ? { ...post, hearts: post.hearts + 1 } : post
        )
      );
      try {
        await fetch(`http://127.0.0.1:8000/responses/${postId}/upvote`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: 'ef02a2e7-dd66-477e-b1ec-5413f7c58e7a' }),
        });
      } catch (error) {
        console.error('Failed to upvote:', error);
      }
    }
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
                  <button
                    onClick={() => handleUpvote(post.id)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full
                      ${likedPosts.includes(post.id)
                        ? 'bg-pink-200 text-pink-600'
                        : 'bg-[#F5DCF7] text-[#856787]'}
                    `}
                  >
                    <Heart className={`h-4 w-4 ${likedPosts.includes(post.id) ? 'fill-pink-600' : ''}`} />
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
