"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { Tables } from "~/lib/supabase/types";
import { getPathOfCurrentSelectedGroup } from "./utils";

export function Breadcrumb({
  resGroups,
}: {
  resGroups: Tables<"product_groups">[];
}) {
  const params = useParams();
  const customerId =
    params.customerId || "ee5a7760-8b65-ed11-9561-000d3a856e52";
  const router = useRouter();
  const grandParentlevel1Slug = resGroups.find(
    (resGroups) => resGroups.id === params.level1Slug,
  );
  const grandParentlevel2Slug = resGroups.find(
    (resGroups) => resGroups.id === params.level2Slug,
  );

  const path = getPathOfCurrentSelectedGroup(resGroups, "123123");

  const [grandParent, parent, current] = path;
  const onClickItem = (id: any) => {
    let url = `/danh-muc-san-pham?group=${id}&customer=${customerId}`;
    if (!id) {
      url = `/danh-muc-san-pham`;
    }
    router.push(url);
  };

  return (
    <div className="flex items-center gap-1 py-1.5 text-sm font-semibold leading-5 text-sky-800 bg-blend-normal max-md:flex-wrap">
      <Link className="text-sky-800" href="/danh-muc-san-pham">
        Danh mục sản phẩm
      </Link>
      <Link
        className="text-sky-800"
        href={`/danh-muc-san-pham?group=${params.level1Slug}&customer=${customerId}`}
      >
        {grandParentlevel1Slug && `/ ${grandParentlevel1Slug["name"]}`}
      </Link>
      <Link
        className="text-sky-800"
        href={`/danh-muc-san-pham?group=${params.level2Slug}&customer=${customerId}`}
      >
        {grandParentlevel2Slug && `/ ${grandParentlevel2Slug["name"]}`}
      </Link>
      {grandParent && (
        <>
          <div className="my-auto leading-[186%] text-gray-400">/</div>
          <div
            test-data={grandParent.id}
            className="flex cursor-pointer"
            onClick={() => onClickItem(grandParent.id)}
          >
            {grandParent.name}
          </div>
        </>
      )}
      {parent && (
        <>
          <div className="my-auto leading-[186%] text-gray-400">/</div>
          <div
            test-data={parent.id}
            onClick={() => onClickItem(parent.id)}
            className="flex cursor-pointer"
          >
            {parent.name}
          </div>
        </>
      )}
      {current && (
        <>
          <div className="my-auto leading-[186%] text-gray-400">/</div>
          <div
            test-data={current.id}
            onClick={() => onClickItem(current.id)}
            className="flex cursor-pointer"
          >
            {current.name}
          </div>
        </>
      )}
    </div>
  );
}
