"use client";

import navigations from "@data/navigations";
import { useRef, useState, useEffect, cloneElement, ReactElement } from "react";
import styled from "styled-components";
import { getTheme, isValidProp } from "@utils/utils";
import MenuItem from "./MenuItem";
import MegaMenu1 from "@component/categories/mega-menu/MegaMenu1";
import MegaMenu2 from "@component/categories/mega-menu/MegaMenu2";

// =====================================================================
type CategoriesProps = {
  // open?: boolean; children: ReactElement,
  menuItems: any
  // menuItems: typeof navigations;
  x: any
  z: any
};
// =====================================================================

export default function Sidebar({ menuItems, x, z }: CategoriesProps) {
  console.log("menuItems", menuItems, x, z)
  const megaMenu = { MegaMenu1, MegaMenu2 };

  return (
    <StyledCategoryDropdown open={true} position={"relative"}>
      {menuItems.map((item) => {
        let MegaMenu = megaMenu[item.menuComponent];

        return (
          <MenuItem
            key={item.title}
            href={item.href}
            icon={item.icon}
            title={item.title}
            caret={!!item.menuData}>
            <MegaMenu data={item.menuData || {}} />
          </MenuItem>
        );
      })}
    </StyledCategoryDropdown>
  );
}

type CategoryDropdownProps = {
  open: boolean;
  position?: "absolute" | "relative";
};

export const StyledCategoryDropdown = styled.div.withConfig({
  shouldForwardProp: (prop: string) => isValidProp(prop)
}) <CategoryDropdownProps>`
  left: 0;
  right: auto;
  border-radius: 4px;
  padding: 0.5rem 0px;
  transform-origin: top;
  position: ${({ position }) => position};
  transform: ${({ open }) => (open ? "scaleY(1)" : "scaleY(0)")};
  top: ${({ position }) => (position === "absolute" ? "calc(100% + 0.7rem)" : "0.5rem")};
  background-color: ${getTheme("colors.body.paper")};
  box-shadow: ${getTheme("shadows.regular")};
  transition: all 250ms ease-in-out;
  z-index: 98;
max-width: 278px;
`;
