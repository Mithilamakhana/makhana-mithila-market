import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ReviewStats { average: number; count: number }

let cache: Promise<ReviewStats> | null = null;

const load = () => {
  if (!cache) {
    cache = (async () => {
      const { data } = await supabase.from("testimonials").select("rating").eq("approved", true);
      const ratings = (data || []).map((r) => r.rating).filter((r): r is number => typeof r === "number");
      const count = ratings.length;
      const average = count ? ratings.reduce((a, b) => a + b, 0) / count : 0;
      return { average, count };
    })();
  }
  return cache;
};

export const useReviewStats = () => {
  const [stats, setStats] = useState<ReviewStats | null>(null);
  useEffect(() => { load().then(setStats).catch(() => setStats(null)); }, []);
  return stats;
};
