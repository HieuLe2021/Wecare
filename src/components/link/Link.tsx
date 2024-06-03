"use client";

import type { LinkProps } from "next/link";
import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";

/*
 * To hold customer id
 */
export const Link = forwardRef(
  (
    {
      href,
      ...props
    }: LinkProps & {
      className?: string;
      children?: React.ReactNode;
    },
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => {
    const searchParams = useSearchParams();

    const currentCustomerId = searchParams.get("customer");
    if (currentCustomerId) {
      if (typeof href === "string") {
        if (href.includes("?")) {
          const s = href.split("?").at(-1);
          const hrefParams = new URLSearchParams(s);
          if (!hrefParams.get("customer")) {
            hrefParams.set("customer", currentCustomerId);
            href = href.split("?").at(-2) + "?" + hrefParams.toString();
          }
        } else {
          href = href + "?customer=" + currentCustomerId;
        }
      } else {
        if (href.search) {
          const hrefParams = new URLSearchParams(href.search);
          if (!hrefParams.get("customer")) {
            hrefParams.set("customer", currentCustomerId);
            href.search = hrefParams.toString();
          }
        } else if (href.pathname) {
          if (href.pathname.includes("?")) {
            const s = href.pathname.split("?").at(-1);
            const hrefParams = new URLSearchParams(s);
            if (!hrefParams.get("customer")) {
              hrefParams.set("customer", currentCustomerId);
              href =
                href.pathname.split("?").at(-2) + "?" + hrefParams.toString();
            }
          } else {
            href = href.pathname + "?customer=" + currentCustomerId;
          }
        }
      }
    }

    return <NextLink ref={ref} href={href} {...props} />;
  },
);
