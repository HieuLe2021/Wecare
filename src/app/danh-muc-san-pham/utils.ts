import { cache } from "react";

import "server-only";

import { createClient } from "~/lib/supabase/server";

export const preloadLeafNode = (id: string | null) => {
  void getLeafNode(id);
};

export const getLeafNode = cache(async (id: string | null) => {
  const supabase = createClient();
  const childNodes = !id
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
          .eq("id", id)
          .order("pos", { ascending: true })
      )?.data?.[0]?.child_nodes ?? [];
  return childNodes;
});
