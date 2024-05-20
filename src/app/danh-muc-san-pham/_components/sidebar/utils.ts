import { MenuItem } from "@component/categories/mega-menu/type";
import { Tables } from "@lib/supabase/types";

import { DANH_MUC_SAN_PHAM_URL } from "../../config";

export function getCollections(
  productGroupsList: Tables<"product_groups">[],
): MenuItem[] {
  const menuItems = productGroupsList
    .filter((group) => !group.parent_id && group.name)
    .map((root) => {
      const level_1 = productGroupsList
        .filter((child) => child.parent_id === root.id)
        .map((child) => {
          const level_2 = productGroupsList
            .filter((grandChild) => grandChild.parent_id === child.id)
            .map((grandChild) => {
              const grandChildItem = {
                title: grandChild.name,
                href:
                  "/" +
                  DANH_MUC_SAN_PHAM_URL +
                  "/" +
                  root.id +
                  "/" +
                  child.id +
                  "?groupIds=" +
                  grandChild.id,
                imgUrl: grandChild.image_url,
              };
              return grandChildItem;
            });

          const childItem = {
            title: child.name,
            href: "/" + DANH_MUC_SAN_PHAM_URL + "/" + root.id + "/" + child.id,
            subCategories: level_2,
          };
          return childItem;
        });

      const menuItem: MenuItem = {
        icon: "laptop",
        href: "/" + DANH_MUC_SAN_PHAM_URL + "/" + root.id,
        title: root.name || "",
        ...(level_1.length > 0
          ? { menuComponent: "MegaMenu1", menuData: { categories: level_1 } }
          : { menuComponent: "MegaMenu2", menuData: [] }),
      };
      return menuItem;
    });

  return menuItems;
}
