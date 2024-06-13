import "server-only";

import { cache } from "react";

import { createClient } from "~/lib/supabase/server";

export const getAllCustomer = cache(async () => {
  const supabase = createClient();
  return (
    (
      await supabase
        .from("customers")
        .select()
        .order("name", { ascending: true })
    ).data ?? []
  );
});

export const getAllProductGroups = cache(async () => {
  const supabase = createClient();
  return (
    (
      await supabase
        .from("product_groups")
        .select()
        .order("pos", { ascending: true })
    ).data ?? []
  );
});

export const getMenuNodes = cache(async () => {
  const supabase = createClient();
  return (
    (
      await supabase
        .from("menu_nodes_matview")
        .select()
        .order("pos", { ascending: true })
    ).data ?? []
  );
});

export const getCustomer = cache(async (customerId: string) => {
  const supabase = createClient();
  return (
    await supabase.from("customers_matview").select().eq("id", customerId)
  ).data?.[0];
});

export const productsBySlug = (slug: string) => {
  const supabase = createClient();
  return supabase
    .from("products")
    .select("*")
    .eq("product_group_slug", slug)
    .order("id", { ascending: true });
};
