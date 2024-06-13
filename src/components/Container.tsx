"use client";

import { layoutConstant } from "@utils/constants";
import { isValidProp } from "@utils/utils";
import styled from "styled-components";
import {
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
} from "styled-system";

const Container = styled.div.withConfig({
  shouldForwardProp: (prop: string) => isValidProp(prop),
})<LayoutProps & ColorProps & PositionProps & SpaceProps & FlexboxProps>`
  margin-left: auto;
  margin-right: auto;
  max-width: ${layoutConstant.containerWidth};

  @media only screen and (max-width: 1199px) {
    margin-left: 1rem;
    margin-right: 1rem;
    display: block;
  }

  ${color}
  ${position}
  ${flexbox}
  ${layout}
  ${space}
`;

export default Container;
