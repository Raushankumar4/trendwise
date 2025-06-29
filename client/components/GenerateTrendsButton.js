"use client";

import { useState, useRef, useEffect } from "react";

export default function GenerateTrendsButton({ onComplete }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const controllerRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleGenerate = async () => {
    if (loading && controllerRef.current) {
      controllerRef.current.abort();
      setLoading(false);
      setStatus("Generation stopped.");

      if (typeof onComplete === "function") {
        onComplete();
      }

      clearTimeout(timeoutRef.current);
      return;
    }

    setLoading(true);
    setStatus("Fetching articles, this may take a while...");
    controllerRef.current = new AbortController();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/trend/generate`,
        {
          method: "POST",
          signal: controllerRef.current.signal,
        }
      );

      const data = await res.json();

      if (res.ok) {
        setStatus(`Successfully generated ${data.articles.length} articles.`);
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch (err) {
      if (err.name === "AbortError") {
        setStatus("Generation aborted.");
      } else {
        setStatus("Network error during generation.");
      }
    } finally {
      setLoading(false);
      if (typeof onComplete === "function") {
        onComplete();
      }
      timeoutRef.current = setTimeout(() => setStatus(""), 1000);
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div className="my-6">
      <button
        onClick={handleGenerate}
        className={`px-5 py-2 rounded text-white font-medium transition ${
          loading
            ? "bg-red-600 hover:bg-red-700"
            : "bg-gray-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Stop" : "Get Trending Articles"}
      </button>

      {status && (
        <p className="mt-2 text-sm text-gray-700 animate-fade-in">{status}</p>
      )}
    </div>
  );
}
