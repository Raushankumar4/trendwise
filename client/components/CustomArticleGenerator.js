"use client";

import { useState } from "react";
import axios from "axios";

export default function CustomArticleGenerator() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setStatus("");

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/article/generate`,
        { topic }
      );

      if (res.status === 201) {
        setStatus("Article generated successfully!");
        setTopic("");
      } else {
        setStatus(`Error: ${res.data.error}`);
      }
    } catch (err) {
      setStatus("xioFailed to generate article.");
      console.error("Error:", err.message);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-md shadow mb-8">
      <h2 className="text-xl font-bold mb-2">🧠 Generate Your Own Article</h2>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic (e.g. How to Learn JavaScript)"
        className="w-full px-4 py-2 border rounded mb-3"
      />
      <button
        onClick={handleGenerate}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Article"}
      </button>
      {status && <p className="text-sm mt-3 text-gray-600">{status}</p>}
    </div>
  );
}
