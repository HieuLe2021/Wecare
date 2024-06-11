"use client";

import {
  Children,
  cloneElement,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";

import { AccordionWrapper } from "./styles";

// ==========================================
type AccordionProps = {
  expanded?: boolean;
  children: ReactElement[] | any;
};
// ==========================================

export default function Accordion({
  expanded = false,
  children,
}: AccordionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(expanded);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);

  const toggle = () => setOpen(!open);

  useEffect(() => {
    let parent = ref.current;

    if (parent && !parentHeight) {
      setHeaderHeight(parent.children[0]?.scrollHeight || 0);

      setParentHeight(parent.scrollHeight);
    }
  }, [ref.current, parentHeight]);

  const modifiedChildren = Children.map(children, (child, ind) => {
    if (ind === 0) return cloneElement(child, { open, onClick: toggle });
    else return child;
  });

  // console.log("????", ref.current.scrollHeight, parentHeight, headerHeight);
  return (
    <AccordionWrapper
      ref={ref}
      height={open ? ref.current?.scrollHeight : headerHeight}
    >
      {modifiedChildren}
    </AccordionWrapper>
  );
}
