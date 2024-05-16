"use client";

import React from "react";
import MegaMenu1 from "@component/categories/mega-menu/MegaMenu1";
import MegaMenu2 from "@component/categories/mega-menu/MegaMenu2";
import { MenuItem } from "@component/categories/mega-menu/type";

import { StyledCategoryDropdown } from "./components";
import RootItem from "./RootItem";

export const StyledList = ({ collections }: { collections: MenuItem[] }) => {
  const megaMenu = { MegaMenu1, MegaMenu2 };
  return (
    <StyledCategoryDropdown open={true} position={"relative"}>
      {collections.map((item) => {
        let MegaMenu = megaMenu[item.menuComponent];

        return (
          <RootItem
            key={item.title}
            href={item.href}
            icon={item.icon}
            title={item.title}
            caret={!!item.menuData}
          >
            <MegaMenu data={item.menuData || {}} />
          </RootItem>
        );
      })}
    </StyledCategoryDropdown>
  );
};
