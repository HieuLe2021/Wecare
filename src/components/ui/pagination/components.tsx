import * as React from "react";
import Link from "next/link";

import type { ButtonProps } from "../button";
import Icon from "~/components/icon/Icon";
import { cn } from "~/utils";
import { buttonVariants } from "../button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-end", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-2", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

type PaginationItemProps = React.ComponentProps<"li">;

const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, ...props }, ref) => {
    return <li ref={ref} className={cn("select-none", className)} {...props} />;
  },
);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "disabled" | "size"> &
  React.ComponentProps<typeof Link>;

const PaginationLink = ({
  className,
  disabled,
  isActive,
  size,
  children,
  ...props
}: PaginationLinkProps) => (
  <Link
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      "h-8 w-8 p-0",
      "rounded-full border border-transparent hover:border-blue-700 hover:text-blue-700",
      className,
      isActive ? "border-blue-700 text-blue-700" : "",
      disabled
        ? "pointer-events-none rounded-full border border-blue-100 text-blue-100"
        : "",
    )}
    {...props}
  >
    {children}
  </Link>
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn(className)}
    {...props}
  >
    <Icon defaultcolor="currentColor" variant="small">
      chevron-left
    </Icon>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn(className)}
    {...props}
  >
    <Icon defaultcolor="currentColor" variant="small">
      chevron-right
    </Icon>
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex size-9 items-center justify-center", className)}
    {...props}
  >
    <Icon defaultcolor="currentColor" variant="small">
      triple-dot
    </Icon>
    <span className="sr-only ">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

const PaginationTotal = ({
  className,
  ...props
}: React.ComponentProps<"li">) => {
  return <li className={cn("", className)} {...props} />;
};
PaginationTotal.displayName = "PaginationTotal";

export type { PaginationItemProps };
export {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationTotal,
};
