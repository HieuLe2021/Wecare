import type { Tables } from "~/lib/supabase/types";

export const filterLeafNodes = (
  allLeaf: Tables<"menu_nodes_matview">["child_nodes"],
  customerProducts: Tables<"customers_matview">["products"] | undefined,
) => {
  return customerProducts
    ? allLeaf.filter((n) =>
        customerProducts.map((x) => x.parent_id).includes(n.id),
      )
    : allLeaf;
};
