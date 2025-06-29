"use client";

import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function ArticleContent({ content }) {
  const isYouTubeLink = (href) => {
    if (!href) return false;
    const ytRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)/;
    return ytRegex.test(href);
  };

  const getYouTubeVideoId = (url) => {
    if (!url) return null;

    const shortUrlMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})(?:\S+)?/);
    if (shortUrlMatch && shortUrlMatch[1]) return shortUrlMatch[1];

    const longUrlMatch = url.match(
      /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/
    );
    if (longUrlMatch && longUrlMatch[1]) return longUrlMatch[1];

    try {
      const urlObj = new URL(url);
      const v = urlObj.searchParams.get("v");
      if (v && v.length === 11) return v;
    } catch {
      return null;
    }

    return null;
  };

  const YouTubeEmbed = ({ url }) => {
    const videoId = getYouTubeVideoId(url);

    if (!videoId) {
      return (
        <p className="text-center text-red-500 my-6">
          Invalid YouTube video URL
        </p>
      );
    }

    return (
      <div className="aspect-video my-10 rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    );
  };

  const CustomLink = ({ href, children }) => {
    if (isYouTubeLink(href)) return <YouTubeEmbed url={href} />;

    return (
      <a
        href={href}
        className="text-blue-600 underline hover:text-blue-800 transition-colors duration-200"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  };

  const CustomImage = ({ alt, src }) => (
    <img
      src={src}
      alt={alt}
      className="my-10 mx-auto max-w-full h-auto rounded-md shadow-sm object-contain border border-gray-200"
      loading="lazy"
      decoding="async"
    />
  );

  return (
    <article className="prose prose-lg max-w-4xl mx-auto px-6 py-10 bg-white rounded-md shadow-sm text-gray-900 font-serif">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          a: CustomLink,
          img: CustomImage,
          h1: (props) => (
            <h1
              {...props}
              className="text-4xl font-bold mt-10 mb-6 leading-tight"
            />
          ),
          h2: (props) => (
            <h2
              {...props}
              className="text-3xl font-semibold mt-8 mb-5 leading-snug"
            />
          ),
          h3: (props) => (
            <h3
              {...props}
              className="text-3xl font-semibold mt-8 mb-5 leading-snug"
            />
          ),
          p: (props) => <p {...props} className="leading-relaxed mb-6" />,
          blockquote: (props) => (
            <blockquote
              {...props}
              className="border-l-4 border-gray-300 pl-6 italic text-gray-600 my-8"
            />
          ),
          code: (props) => (
            <code
              {...props}
              className="bg-gray-100 px-1 rounded font-mono text-sm"
            />
          ),
          ul: (props) => (
            <ul {...props} className="list-disc list-inside mb-6" />
          ),
          ol: (props) => (
            <ol {...props} className="list-decimal list-inside mb-6" />
          ),
        }}
      >
        {content}
      </Markdown>
    </article>
  );
}
