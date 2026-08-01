import type { PageSlug, ContentResolver } from "@/lib/site/types";

export async function getContentResolver(_slug: PageSlug): Promise<ContentResolver> {
  return {
    t(_key, fallback) {
      return fallback;
    },
    i(_key, fallback) {
      return fallback;
    }
  };
}
