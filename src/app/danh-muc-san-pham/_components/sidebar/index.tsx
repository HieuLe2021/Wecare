"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import MegaMenu1 from "@component/categories/mega-menu/MegaMenu1";
import MegaMenu2 from "@component/categories/mega-menu/MegaMenu2";

import type { Tables } from "~/lib/supabase/types";
import Icon from "~/components/icon/Icon";
import { Link } from "~/components/link";
import Typography from "~/components/Typography";
import { DANH_MUC_SAN_PHAM_URL } from "../../config";
import { StyledCategoryDropdown } from "./components";
import RootItem from "./RootItem";
import { getCollections } from "./utils";

export const Sidebar = ({
  allProductGroups,
  menuNodes,
  customer,
}: {
  allProductGroups: Tables<"product_groups">[];
  menuNodes: Tables<"menu_nodes_matview">[];
  customer: Tables<"customers_matview"> | undefined;
}) => {
  const searchParams = useSearchParams();
  const collections = getCollections(
    allProductGroups,
    menuNodes,
    searchParams.get("customer"),
    customer,
  );
  return (
    <>
      <Link
        href={"/" + DANH_MUC_SAN_PHAM_URL}
        className="flex items-center bg-blue-50 px-3 py-2 shadow-md"
      >
        <Icon>categories</Icon>
        <Typography ml="10px" flex="1 1 0" fontWeight="600" textAlign="left">
          Danh mục sản phẩm
        </Typography>
      </Link>
      <StyledCategoryDropdown open={true} position={"relative"}>
        {collections.map((item) => {
          return (
            <RootItem
              key={item.title}
              href={item.href}
              icon={item.icon}
              title={item.title}
              caret={!!item.menuData}
              count={item.count}
            >
              {item.menuComponent === "MegaMenu1" && (
                <MegaMenu1 data={item.menuData} />
              )}
              {item.menuComponent === "MegaMenu2" && (
                <MegaMenu2 data={item.menuData} />
              )}
            </RootItem>
          );
        })}
      </StyledCategoryDropdown>
    </>
  );
};
