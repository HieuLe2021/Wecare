"use client"

import { getTheme } from "@utils/utils";
import styled from "styled-components";

export const StyledAppLayout = styled.div`
  .header-container {
    box-shadow: ${getTheme("shadows.regular")};
  }
`;
