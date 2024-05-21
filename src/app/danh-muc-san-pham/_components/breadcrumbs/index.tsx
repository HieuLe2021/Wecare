"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { Tables } from "~/lib/supabase/types";
import { getPathOfCurrentSelectedGroup } from "./utils";

export function Breadcrumb({
  resGroups,
}: {
  resGroups: Tables<"product_groups">[];
}) {
  const params = useParams();
  const pathSplited = usePathname().split("/");
  const grandParentlevel1Slug = resGroups.find(
    (resGroups) => resGroups.slug === params.level1Slug,
  );
  const grandParentlevel2Slug = resGroups.find(
    (resGroups) => resGroups.slug === params.level2Slug,
  );

  const path = getPathOfCurrentSelectedGroup(resGroups, "123123");

  const [grandParent, parent, current] = path;

  return (
    <div className="flex items-center gap-1 py-1.5 text-sm font-semibold leading-5 text-sky-800 bg-blend-normal max-md:flex-wrap">
      <Link className="text-sky-800" href={pathSplited.slice(0, 2).join("/")}>
        Danh mục sản phẩm
      </Link>
      <Link className="text-sky-800" href={pathSplited.slice(0, 3).join("/")}>
        {grandParentlevel1Slug && `/ ${grandParentlevel1Slug["name"]}`}
      </Link>
      <Link className="text-sky-800" href={pathSplited.join("/")}>
        {grandParentlevel2Slug && `/ ${grandParentlevel2Slug["name"]}`}
      </Link>
    </div>
  );
}
