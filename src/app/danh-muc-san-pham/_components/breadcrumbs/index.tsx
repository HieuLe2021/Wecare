"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";

import type { Tables } from "~/lib/supabase/types";

export function Breadcrumb({
  allProductGroups,
}: {
  allProductGroups: Tables<"product_groups">[];
}) {
  const params = useParams();
  const pathSplited = usePathname().split("/");
  const grandParentlevel1Slug = allProductGroups.find(
    (resGroups) => resGroups.slug === params.level1Slug,
  );
  const grandParentlevel2Slug = allProductGroups.find(
    (resGroups) => resGroups.slug === params.level2Slug,
  );
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
      <Link
        className="text-sky-800"
        href={
          pathSplited.slice(0, 3).join("/") +
          (customerId ? `?customer=${customerId}` : "")
        }
      >
        {grandParentlevel1Slug && `/ ${grandParentlevel1Slug.name}`}
      </Link>
      <Link
        className="text-sky-800"
        href={
          pathSplited.join("/") + (customerId ? `?customer=${customerId}` : "")
        }
      >
        {grandParentlevel2Slug && `/ ${grandParentlevel2Slug.name}`}
      </Link>
    </div>
  );
}
