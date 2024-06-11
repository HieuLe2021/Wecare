import { ReactNode } from "react";
import Icon from "@component/icon/Icon";
import { FlexboxProps, SpaceProps } from "styled-system";

import { AccordionHeaderWrapper } from "./styles";

// STYLED COMPONENT

// ==================================================================================
type AccordionHeaderProps = {
  open?: boolean;
  showIcon?: boolean;
  children: ReactNode;
  [key: string]: unknown;
};

type Props = AccordionHeaderProps & SpaceProps & FlexboxProps;
// ==================================================================================

export default function AccordionHeader({
  open,
  children,
  showIcon = true,
  ...props
}: Props) {
  return (
    <AccordionHeaderWrapper open={open!} {...props}>
      {children}

      {showIcon && (
        <Icon
          className="caret-icon"
          variant="small"
          defaultcolor="currentColor"
        >
          chevron-right
        </Icon>
      )}
    </AccordionHeaderWrapper>
  );
}
