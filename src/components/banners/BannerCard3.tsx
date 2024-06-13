import { ReactNode } from "react";
import Box from "@component/Box";
import styled from "styled-components";
import { FlexProps } from "styled-system";

import { Image } from "~/components/image";

// GLOBAL CUSTOM COMPONENTS

// STYLED COMPONENTS
const CardWrapper = styled(Box)({
  width: "100%",
  overflow: "hidden",
  position: "relative",
});

const CardContent = styled("div")({
  top: 0,
  left: 32,
  zIndex: 1,
  height: "100%",
  display: "flex",
  position: "absolute",
  flexDirection: "column",
  justifyContent: "center",
});

// ===========================================================
interface BannerCard1Props extends FlexProps {
  img: string;
  children: ReactNode;
}
// ===========================================================

export default function BannerCard3({
  img,
  children,
  ...props
}: BannerCard1Props) {
  return (
    <CardWrapper {...props}>
      <div className="h-full w-full">
        <Image alt="category" src={img} objectFit="contains" />
      </div>

      <CardContent>{children}</CardContent>
    </CardWrapper>
  );
}
