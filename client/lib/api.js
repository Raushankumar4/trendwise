export async function getArticles() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/article`);
  return res.json();
}

export async function getArticle(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/article/${slug}`);
  return res.json();
}
