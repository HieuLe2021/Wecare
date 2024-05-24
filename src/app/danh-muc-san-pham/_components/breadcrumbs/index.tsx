"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";

import type { DefaultProductListContentProps } from "../content";
import type { Tables } from "~/lib/supabase/types";

export function Breadcrumb({
  allProductGroups,
}: {
  allProductGroups: Tables<"product_groups">[];
}) {
  const params = useParams<DefaultProductListContentProps["params"]>();
  const pathSplited = usePathname().split("/");
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customer");

  return (
    <div className="flex items-center gap-1 py-1.5 text-sm font-semibold leading-5 text-sky-800 bg-blend-normal max-md:flex-wrap">
      <Link
        className="text-sky-800"
        href={
          pathSplited.slice(0, 2).join("/") +
          (customerId ? `?customer=${customerId}` : "")
        }
      >
        Danh mục sản phẩm
      </Link>
      {params.slug.map((s, index) => {
        const d = allProductGroups.find((resGroups) => resGroups.slug === s);
        return (
          <Link
            className="text-sky-800"
            href={
              pathSplited.slice(0, index + 3).join("/") +
              (customerId ? `?customer=${customerId}` : "")
            }
          >
            / {d?.name}
          </Link>
        );
      })}
    </div>
  );
}
