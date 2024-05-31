import type { MenuItem } from "@component/categories/mega-menu/type";
import type { Tables } from "@lib/supabase/types";

import { filterLeafNodes } from "../../_utils/client";
import { DANH_MUC_SAN_PHAM_URL } from "../../config";

const checkNodeHasProductId = (
  node: Tables<"product_groups">,
  menuNodes: Tables<"menu_nodes_matview">[],
  customer: Tables<"customers_matview"> | undefined,
) => {
  if (!customer) return true;
  const childNodes =
    menuNodes.find((x) => x.slug === node.slug)?.child_nodes ?? [];
  const filtered = filterLeafNodes(childNodes, customer.products);
  return filtered.length > 0;
};
export function getCollections(
  productGroupsList: Tables<"product_groups">[],
  menuNodes: Tables<"menu_nodes_matview">[],
  customerId: string | null,
  customer: Tables<"customers_matview"> | undefined,
): MenuItem[] {
  const menuItems = productGroupsList
    .filter(
      (root) =>
        !root.parent_id &&
        root.name &&
        checkNodeHasProductId(root, menuNodes, customer),
    )
    .map((root) => {
      const level_1 = productGroupsList
        .filter(
          (level_1) =>
            level_1.parent_id === root.id &&
            checkNodeHasProductId(level_1, menuNodes, customer),
        )
        .map((level_1) => {
          const level_2 = productGroupsList
            .filter(
              (level_2) =>
                level_2.parent_id === level_1.id &&
                // ,
                // checkNodeHasProductId(level_2, menuNodes, customer),
                (customer?.products
                  .map((x) => x.parent_id)
                  .includes(level_2.id) ||
                  checkNodeHasProductId(level_2, menuNodes, customer)),
            )
            .map((level_2) => {
              const level_3 = productGroupsList.filter(
                (level_3) => level_3.parent_id === level_2.id,
              );
              const level2Href =
                level_3.length === 0
                  ? "/" +
                    DANH_MUC_SAN_PHAM_URL +
                    "/" +
                    root.slug +
                    "/" +
                    level_1.slug +
                    (customerId ? `?customer=${customerId}&` : "?") +
                    "groups=" +
                    level_2.slug
                  : "/" +
                    DANH_MUC_SAN_PHAM_URL +
                    "/" +
                    root.slug +
                    "/" +
                    level_1.slug +
                    "/" +
                    level_2.slug +
                    (customerId ? `?customer=${customerId}` : "");

              const grandChildItem = {
                title: level_2.name,
                href: level2Href,
                imgUrl: level_2.image_url,
              };
              return grandChildItem;
            });

          const href =
            level_2.length === 0
              ? "/" +
                DANH_MUC_SAN_PHAM_URL +
                "/" +
                root.slug +
                "?groups=" +
                level_1.slug
              : "/" +
                DANH_MUC_SAN_PHAM_URL +
                "/" +
                root.slug +
                "/" +
                level_1.slug +
                (customerId ? `?customer=${customerId}` : "");
          const childItem = {
            title: level_1.name,
            href,
            subCategories: level_2,
            imgUrl: level_1.image_url,
          };
          return childItem;
        });

      // const count =
      //   menuNodes.find((n) => n.id === root.id)?.child_nodes.length || 0;
      const childNodes =
        menuNodes.find((x) => x.id === root.id)?.child_nodes ?? [];
      const childNodesFiltered = filterLeafNodes(
        childNodes,
        customer?.products,
      );
      const count = childNodesFiltered.length;

      const menuItem: MenuItem = {
        id: root.id,
        icon: root.icon ?? "",
        href:
          "/" +
          DANH_MUC_SAN_PHAM_URL +
          "/" +
          root.slug +
          (customerId ? `?customer=${customerId}` : ""),
        title: root.name,
        count: count,
        ...(level_1.length > 0
          ? { menuComponent: "MegaMenu1", menuData: { categories: level_1 } }
          : { menuComponent: "MegaMenu2", menuData: [] }),
      };
      return menuItem;
    });

  return menuItems;
}
