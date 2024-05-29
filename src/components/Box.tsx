"use client";

import type {
  BorderProps,
  ColorProps,
  FlexboxProps,
  FlexProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  TypographyProps,
} from "styled-system";
import { isValidProp } from "@utils/utils";
import styled from "styled-components";
import {
  border,
  color,
  compose,
  flex,
  flexbox,
  layout,
  position,
  space,
  typography,
} from "styled-system";

// ==============================================================
interface BoxProps
  extends LayoutProps,
    ColorProps,
    PositionProps,
    SpaceProps,
    FlexProps,
    BorderProps,
    FlexboxProps,
    TypographyProps {
  cursor?: string;
  transition?: string;
  shadow?: number | null;
}
// ==============================================================

const Box = styled.div.withConfig({
  shouldForwardProp: (prop: string) => isValidProp(prop),
})<BoxProps>(
  ({ shadow = 0, cursor = "unset", transition, theme }) => ({
    cursor,
    transition,
    boxShadow: theme.shadows[shadow!],
  }),
  compose(layout, space, color, position, flexbox, flex, border, typography),
);

export default Box;
