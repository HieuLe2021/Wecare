"use client";

import Select from "@component/Select";

import type { Tables } from "~/lib/supabase/types";
import { Breadcrumb } from "~/app/danh-muc-san-pham/_components/breadcrumbs";
import { Tables } from "~/lib/supabase/types";

export const Topbar = ({
  allProductGroups: resGroups,
  leafCount,
}: {
  allProductGroups: Tables<"product_groups">[];
  leafCount: number;
}) => {
  return (
    <div className="col mb-4 flex justify-between rounded-lg bg-white pb-2 lg:mx-4 lg:px-4">
      <div>
        <Breadcrumb resGroups={resGroups} />
        <p>{leafCount} nhóm sản phẩm</p>
      </div>
      <div className="row flex items-center">
        <p className="pr-2">Ngành nghề:</p>
        <Select
          placeholder="Tất cả"
          defaultValue={sortOptions[0]}
          options={sortOptions}
        />
      </div>
    </div>
  );
};

const sortOptions = [
  { label: "Tất cả", value: "Tất cả" },
  { label: "Nhà máy gỗ", value: "Nhà máy gỗ" },
  { label: "Sản xuất khác", value: "Sản xuất khác" },
  { label: "Shop bán lẻ", value: "Shop bán lẻ" },
  { label: "Thi công nội thất", value: "Thi công nội thất" },
  { label: "Wicker", value: "Wicker" },
  { label: "Xây dựng", value: "Xây dựng" },
];
