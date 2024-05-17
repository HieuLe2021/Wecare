"use client";

import * as React from "react";

import { useParams, useRouter } from "next/navigation";

import { Category } from "../Collections/types";
import {getPathOfCurrentSelectedGroup} from './utils'

export function Breadcrumb({ resGroups }: { resGroups: Category[] }) {
  const params = useParams();
  console.log("pa", params);
  const customerId = params.customerId || "123123";
  const router = useRouter();

  const path = getPathOfCurrentSelectedGroup(resGroups, "123123");

  const [grandParent, parent, current] = path;
  const onClickItem = (id: any) => {
    let url = `/home?group=${id}&customer=${customerId}`;
    if (!id) {
      url = `/home?customer=${customerId}`;
    }
    router.push(url);
  };
  return (
    <div className="flex cursor-pointer items-center gap-1 py-1.5 text-sm font-semibold leading-5 text-sky-800 bg-blend-normal max-md:flex-wrap">
      <div onClick={() => onClickItem(null)}>Danh mục sản phẩm</div>

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
