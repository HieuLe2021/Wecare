"use client";

import type { FlexboxProps } from "styled-system";
import { Children, cloneElement } from "react";

// PROPS TYPES
import type { GridProps } from "./types";
// STYLED COMPONENT
import StyledGrid from "./styles";

export default function Grid({
  children,
  spacing = 0,
  vertical_spacing,
  horizontal_spacing,
  containerHeight = "unset",
  ...props
}: GridProps & FlexboxProps) {
  let childList = children;

  if (props.container) {
    childList = Children.map(children, (child) => {
      return cloneElement(child, {
        spacing: spacing,
        vertical_spacing: vertical_spacing,
        horizontal_spacing: horizontal_spacing,
      });
    });
  }

  return (
    <StyledGrid
      spacing={spacing}
      containerHeight={containerHeight}
      vertical_spacing={vertical_spacing}
      horizontal_spacing={horizontal_spacing}
      {...props}
    >
      {childList}
    </StyledGrid>
  );
}
