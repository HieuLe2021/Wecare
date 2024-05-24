"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import MegaMenu1 from "@component/categories/mega-menu/MegaMenu1";
import MegaMenu2 from "@component/categories/mega-menu/MegaMenu2";

import type { Tables } from "~/lib/supabase/types";
import Icon from "~/components/icon/Icon";
import Typography from "~/components/Typography";
import { StyledCategoryDropdown } from "./components";
import RootItem from "./RootItem";
import { getCollections } from "./utils";

export const Sidebar = ({
  allProductGroups,
  menuNodes,
}: {
  allProductGroups: Tables<"product_groups">[];
  menuNodes: Tables<"menu_nodes_matview">[];
}) => {
  const searchParams = useSearchParams();
  const collections = getCollections(
    allProductGroups,
    menuNodes,
    searchParams.get("customer"),
  );
  const megaMenu = { MegaMenu1, MegaMenu2 };
  return (
    <>
      <div className="flex items-center bg-blue-50 px-3 py-2 shadow-md">
        <Icon>categories</Icon>
        <Typography ml="10px" flex="1 1 0" fontWeight="600" textAlign="left">
          Danh mục sản phẩm
        </Typography>
      </div>
      <StyledCategoryDropdown open={true} position={"relative"}>
        {collections.map((item) => {
          const MegaMenu = megaMenu[item.menuComponent];

          return (
            <RootItem
              key={item.title}
              href={item.href}
              icon={item.icon}
              title={item.title}
              caret={!!item.menuData}
              count={item.count}
            >
              <MegaMenu data={item.menuData || {}} />
            </RootItem>
          );
        })}
      </StyledCategoryDropdown>
    </>
  );
};
