"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

export function Breadcrumb({
  data,
  customerId,
}: {
  data: any[];
  customerId: any;
}) {
  const router = useRouter();
  const [grandParent, parent, current] = data;
  const onClickItem = (id: any) => {
    let url = `/home?group=${id}&customer=${customerId}`;
    if (!id) {
      url = `/home?customer=${customerId}`;
    }
    router.push(url);
  };
  return (
    <div className="flex gap-1 py-1.5 text-sm font-semibold leading-5 text-sky-800 bg-blend-normal max-md:flex-wrap items-center cursor-pointer">
      <div onClick={() => onClickItem(null)}>Danh mục sản phẩm</div>

      {grandParent && (
        <>
          <div className="my-auto text-gray-400 leading-[186%]">/</div>
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
          <div className="my-auto text-gray-400 leading-[186%]">/</div>
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
          <div className="my-auto text-gray-400 leading-[186%]">/</div>
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
