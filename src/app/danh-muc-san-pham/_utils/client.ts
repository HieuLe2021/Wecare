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

export const getChildNodes = (
  menuNodes: Tables<"menu_nodes_matview">[],
  slugPrams: string[] | undefined,
  customer?: Tables<"customers_matview">,
) => {
  const slug = slugPrams?.at(-1);
  const childNodes = menuNodes.find((x) => x.slug === slug)?.child_nodes ?? [];
  const childNodesFiltered = filterLeafNodes(childNodes, customer?.products);

  return childNodesFiltered;
};
