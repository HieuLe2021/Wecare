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

// by customer or not
export const getChildNodes = (
  menuNodes: Tables<"menu_nodes_matview">[],
  slugPrams: string[] | undefined,
  customer?: Tables<"customers_matview">,
) => {
  let childNodes: Tables<"menu_nodes_matview">["child_nodes"] = [];

  // if customer appear => show all price tables
  if (!slugPrams) {
    childNodes = menuNodes
      .filter((n) => n.pos && n.pos % 10000 === 0)
      .reduce(
        (p, c) => [...p, ...c.child_nodes],
        [] as Tables<"menu_nodes_matview">["child_nodes"],
      );
  } else {
    const slug = slugPrams.at(-1);
    childNodes = menuNodes.find((x) => x.slug === slug)?.child_nodes ?? [];
  }
  const childNodesFiltered = filterLeafNodes(childNodes, customer?.products);

  return childNodesFiltered;
};
