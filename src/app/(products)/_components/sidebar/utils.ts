import { MenuItem } from "@component/categories/mega-menu/type";
import { Tables } from "@lib/supabase/types";
import { DANH_MUC_SAN_PHAM_URL } from "app/(products)/config";

import { Category } from "./types";

export function getCollections(
  productGroupsList: Tables<"product_groups">[],
): MenuItem[] {
  // const menuItems: MenuItem[] = []
  const menuItems = productGroupsList
    .filter((group) => !group.parent_id && group.name)
    .map((root) => {
      const level_1 = productGroupsList
        .filter((child) => child.parent_id === root.id)
        .map((child, index) => {
          const level_2 = productGroupsList
            .filter((grandChild) => grandChild.parent_id === child.id)
            .map((grandChild) => {
              const grandChildItem = {
                title: grandChild.name,
                href: "",
                imgUrl: grandChild.image_url,
              };
              return grandChildItem;
            });

          const childItem = {
            title: child.name,
            href: "",
            subCategories: level_2,
          };
          // const childItem: MenuChild = {
          //   icon: "man",
          //   title: child.name,
          //   href: "",
          //   // subCategories: level_2,
          //   ...(level_2.length > 0 ? {
          //     megaMenu: "MegaMenu1",
          //     menuData: {
          //       categories: level_2
          //     },
          //   } : {
          //     megaMenu: index,
          //   })
          // }
          return childItem;
        });

      const menuItem: MenuItem = {
        icon: "laptop",
        href: DANH_MUC_SAN_PHAM_URL + root.id,
        title: root.name,
        ...(level_1.length > 0
          ? { menuComponent: "MegaMenu1", menuData: { categories: level_1 } }
          : { menuComponent: "MegaMenu2", menuData: [] }),
        // ...(level_1.length > 0 ? { menuComponent: "MegaMenu2", menuData: level_1 } : { menuComponent: "MegaMenu2", menuData: [] })
      };
      return menuItem;
    });
  // const topGroups =
  //   productGroupsList.filter((group) => !group.parent_id && group.name) ||
  //   [];
  // for (const group of topGroups) {
  //
  //   // const children =
  //   //   productGroupsList?.filter((child: any) => child.parent_id === group.id) ||
  //   //   [];
  //   // group.children = children;
  //
  //
  //
  //
  //   const menuData: any[] = []
  //
  //   const children =
  //     productGroupsList?.filter((child) => child.parent_id === group.id) ||
  //     [];
  //
  //   for (const [childIndex, child] of children.entries()) {
  //     const grandChildren = productGroupsList?.filter(
  //       (grandChild) => grandChild.parent_id === child.id
  //     ).map(grandChild => ({
  //       href: "",
  //       // icon: "laptop", //image_url
  //       // menuComponent: "MegaMenu2",
  //       // menuData: {
  //       //   categories: children
  //       // },
  //       subCategories: [],
  //       title: grandChild.name
  //     }));
  //
  //     // child.children = grandChildren;
  //
  //     if (child.name === "Thanh nẹp giấy V") {
  //       console.log("ccccccc", child, grandChildren)
  //     }
  //     // Level 2
  //     const childItem = {
  //       href: child.id,
  //       icon: "laptop", //image_url
  //       title: child.name
  //     }
  //     if (grandChildren.length === 0) {
  //       childItem.megaMenu = childIndex
  //     }
  //     else {
  //       childItem.megaMenu = "MegaMenu1"
  //       childItem.menuData = {
  //         categories: grandChildren
  //       }
  //     }
  //     menuData.push(childItem)
  //   }
  //
  //   const formattedGroup: any = {
  //     href: "",
  //     icon: "laptop", //image_url
  //     menuComponent: "MegaMenu2",
  //     // menuData: {
  //     //   categories: menuData
  //     // },
  //     title: group.name
  //   }
  //   if (children.length === 0) {
  //     // formattedGroup.megaMenu = "MegaMenu2"
  //     formattedGroup.menuData = {
  //       categories: menuData
  //     }
  //   } else {
  //     // if (children.some(c => c.))
  //     // formattedGroup.megaMenu = "MegaMenu2"
  //     formattedGroup.menuData = menuData
  //   }
  //
  //   menuItems.push(formattedGroup)
  // }
  return menuItems;
  // return topGroups;
}
