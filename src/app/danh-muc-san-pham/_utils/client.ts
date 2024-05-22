import { createClient } from "~/lib/supabase/client";

export const getLeafNode = async (slug: string | null) => {
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
      ).data?.[0]?.child_nodes ?? [];
  return childNodes;
};
