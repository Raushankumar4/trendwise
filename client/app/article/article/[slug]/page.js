"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Comments({ slug }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/comment/${slug}`
        );
        setComments(res.data);
      } catch (error) {
        console.error("Failed to fetch comments", error);
      }
    };
    fetchComments();
  }, [slug]);

  const handlePost = async () => {
    if (!text.trim()) return;

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/comment`,
        {
          articleSlug: slug,
          text,
          user: session.user,
        }
      );

      setComments([res.data, ...comments]);
      setText("");
    } catch (error) {
      console.error("Failed to post comment", error);
    }
  };

  return (
    <div className="mt-10 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Comments</h2>

      {session ? (
        <div className="mb-6">
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
            placeholder="Write your comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handlePost}
              disabled={!text.trim()}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md disabled:opacity-50 hover:bg-blue-700 transition"
            >
              Post Comment
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 italic">
          Please log in to leave a comment.
        </p>
      )}

      <div className="space-y-6">
        {comments.map((c) => (
          <div key={c._id} className="border-t pt-4">
            <div className="flex items-center space-x-3 mb-2">
              <img
                src={c.user.image || "/default-avatar.png"}
                alt={c.user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  {c.user.name}
                </p>
                <p className="text-xs text-gray-400">
                  {new Intl.DateTimeFormat("default", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(c.createdAt))}
                </p>
              </div>
            </div>
            <p className="text-gray-800 text-sm">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
