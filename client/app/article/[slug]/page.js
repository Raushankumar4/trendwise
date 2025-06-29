import React from "react";
import Comments from "@/components/Comments";
import ArticleContent from "@/components/ArticleContent";
import { notFound } from "next/navigation";

async function getArticle(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/article/${slug}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug);

  if (!article) {
    return (
      <div className="p-8 text-red-500 text-center text-xl">
        Article not found.
      </div>
    );
  }

  return (
    <main className="max-w-screen-md lg:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-900">
            {article.title}
          </h1>
          <div className="text-sm text-gray-500 italic">{article.meta}</div>
        </header>

        <section className="prose prose-lg lg:prose-xl max-w-none mb-16">
          <ArticleContent content={article.content} />
        </section>
      </article>

      <section className="mt-12">
        <Comments slug={params.slug} />
      </section>
    </main>
  );
}

export async function generateMetadata({ params }) {
  const slug = params.slug;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/article/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return notFound();

  const article = await res.json();

  return {
    title: article.title,
    description: article.meta,
    keywords: article.title.split(" "),
    openGraph: {
      title: article.title,
      description: article.meta,
      type: "article",
      url: `https://trendwise-beta.vercel.app/article/${article.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.meta,
    },
  };
}
