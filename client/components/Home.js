"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import GenerateTrendsButton from "../components/GenerateTrendsButton";
import LoadingSpinner from "./LoadingSpinner";
import AuthButton from "../components/AuthButton";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const fetchArticles = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/article`
      );
      const data = await res.json();
      setArticles(data);
      setFiltered(data);
    } catch (err) {
      console.error("Failed to load articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    const results = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(value) ||
        a.meta.toLowerCase().includes(value)
    );
    setFiltered(results);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <LoadingSpinner />
      </div>
    );
  }

  const featured = filtered.length > 0 ? filtered[0] : null;
  const restArticles = filtered.slice(1);

  return (
    <main className="w-full min-h-screen font-seri">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-300">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <h1 className="text-4xl font-extrabold tracking-wide uppercase leading-tight">
            TrendWise
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
            <div className="flex-grow max-w-xl">
              <input
                type="search"
                aria-label="Search articles"
                placeholder="Search news articles..."
                value={query}
                onChange={handleSearch}
                className="w-full px-5 py-3 rounded-lg border border-gray-300 shadow-md text-lg font-sans placeholder-gray-500
                           focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition"
                spellCheck="false"
                autoComplete="off"
              />
            </div>
            <GenerateTrendsButton onComplete={fetchArticles} />
            <AuthButton /> {/* Profile dropdown added here */}
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 pt-16 pb-16">
        {featured && (
          <article
            className="mb-20 bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden mx-auto max-w-5xl hover:shadow-xl transition-shadow"
            tabIndex={0}
            aria-label={`Featured article: ${featured.title}`}
          >
            <Link href={`/article/${featured.slug}`}>
              <div className="p-10 md:p-16 cursor-pointer">
                <h2 className="text-5xl font-serif font-bold leading-snug mb-6 hover:text-blue-700 hover:underline transition-colors">
                  {featured.title}
                </h2>
                {featured.isTrending && (
                  <span className="inline-block mb-6 bg-red-100 text-red-700 text-sm font-semibold px-5 py-2 rounded-full">
                    🔥 Trending
                  </span>
                )}
                <p className="text-lg font-sans leading-relaxed max-w-4xl text-gray-700">
                  {featured.meta}
                </p>
              </div>
            </Link>

            <div className="px-10 pb-6">
              <Link
                href={`/article/${featured.slug}`}
                className="text-blue-600 hover:text-blue-800 font-semibold transition"
                aria-label={`Read more about ${featured.title}`}
              >
                Read More &rarr;
              </Link>
            </div>

            <footer className="border-t  px-10 py-5 text-sm text-gray-500 flex justify-between">
              <span>By TrendWise News</span>
              <time>
                {new Date().toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </footer>
          </article>
        )}

        {restArticles.length === 0 ? (
          <p className="text-center text-red-600 text-xl font-semibold mt-12">
            No articles match your search.
          </p>
        ) : (
          <section
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 max-w-7xl mx-auto"
            aria-label="News articles"
          >
            {restArticles.map((article) => (
              <article
                key={article._id}
                className="bg-white rounded-md border border-gray-300 p-8 shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between cursor-pointer"
                tabIndex={0}
                aria-label={`News article titled ${article.title}`}
              >
                <div>
                  <h3 className="text-2xl font-serif font-semibold mb-4 text-gray-900 hover:text-blue-600 hover:underline transition-colors">
                    <Link href={`/article/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  {article.isTrending && (
                    <span className="inline-block mb-4 bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
                      🔥 Trending
                    </span>
                  )}
                  <p className="text-gray-700 font-sans text-base leading-relaxed line-clamp-5">
                    {article.meta}
                  </p>
                </div>

                <div className="mt-6">
                  <Link
                    href={`/article/${article.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold transition"
                    aria-label={`Read more about ${article.title}`}
                  >
                    Read More &rarr;
                  </Link>
                </div>

                <footer className="mt-8 text-sm text-gray-500 flex justify-between font-sans">
                  <span>By TrendWise News</span>
                  <time>{new Date().toLocaleDateString()}</time>
                </footer>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
