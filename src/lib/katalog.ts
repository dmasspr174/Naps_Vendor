import { ProductItem } from "@/types";

/**
 * Public catalog fetcher using native Next.js 15 fetch cache.
 * Queries Supabase PostgREST endpoint directly with tag-based caching ('katalog').
 * Returns an empty array if database is unreachable (graceful degradation).
 */
export async function getPublicCatalog(): Promise<ProductItem[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn("[katalog] Missing Supabase env vars — returning empty catalog.");
    return [];
  }

  try {
    const endpoint = `${supabaseUrl}/rest/v1/katalog?select=*&order=id.asc`;

    const res = await fetch(endpoint, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      next: {
        revalidate: 3600,
        tags: ["katalog"],
      },
    });

    if (!res.ok) {
      console.warn("[katalog] REST API error:", res.statusText);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? (data as ProductItem[]) : [];
  } catch (err) {
    console.error("[katalog] Fetch error:", err);
    return [];
  }
}

export default getPublicCatalog;
