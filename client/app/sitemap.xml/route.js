export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/article`, {
    cache: "no-store",
  });
  const articles = await res.json();

  const baseUrl = "https://trendwise-beta.vercel.app";

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${articles
  .map(
    (article) => `<url>
  <loc>${baseUrl}/article/${article.slug}</loc>
  <changefreq>daily</changefreq>
</url>`
  )
  .join("")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
