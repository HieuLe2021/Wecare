import "server-only";

import { cache } from "react";
import { createClient } from "~/lib/supabase/server";

export const getAllProductGroups = cache(async () => {
  const supabase = createClient();
  return (await supabase.from("product_groups").select()).data ?? [];
});


export const preloadLeafNode = (id: string | null) => {
  void getLeafNode(id);
};

export const getLeafNode = cache(async (slug: string | null) => {
  const supabase = createClient();
  const childNodes = !slug
    ? (
        await supabase
          .from("product_groups")
          .select()
          .eq("is_leaf", true)
          .order("pos", { ascending: true })
      ).data ?? []
    : (
        await supabase
          .from("menu_nodes")
          .select("*")
          .eq("slug", slug)
          .order("pos", { ascending: true })
      )?.data?.[0]?.child_nodes ?? [];
  return childNodes;
});
