"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CustomArticleGenerator from "../../components/CustomArticleGenerator";

export default function Profile() {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/comment/user/${session.user.email}`
      )
        .then((res) => res.json())
        .then(setComments);
    }
  }, [session]);

  if (!session) {
    return (
      <main className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-500 text-lg font-medium">
          Please log in to view your profile.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center gap-5 mb-10">
        <img
          src={session.user.image || "/default-avatar.png"}
          alt="User"
          className="w-16 h-16 rounded-full border border-gray-300 shadow-md object-cover"
        />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            👋 Welcome, {session.user.name}
          </h1>
          <p className="text-sm text-gray-500">{session.user.email}</p>
        </div>
      </div>

      {/* Comment Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          📝 Your Comments
        </h2>

        {comments.length === 0 ? (
          <p className="text-gray-500 italic">
            You haven’t posted any comments yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition"
              >
                <p className="text-gray-700 mb-2">💬 {comment.text}</p>
                <p className="text-sm text-gray-600">
                  On article:{" "}
                  <span className="text-blue-600 font-medium">
                    {comment.articleSlug}
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Article Generator */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          ✍️ Generate Custom Articles
        </h2>
        <CustomArticleGenerator />
      </section>
    </main>
  );
}
