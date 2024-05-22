"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Select from "@component/Select";

import type { Tables } from "~/lib/supabase/types";
import { Breadcrumb } from "~/app/danh-muc-san-pham/_components/breadcrumbs";
import { LeafCarousel } from "../leaf-carousel";

export const Topbar = ({
  allProductGroups,
  level1Nodes,
}: {
  allProductGroups: Tables<"product_groups">[];
  level1Nodes: Tables<"menu_nodes">[];
}) => {
  const params = useParams<{ level1Slug?: string; level2Slug?: string }>();
  const [childNodes, setChildNodes] = useState<
    NonNullable<Tables<"menu_nodes">["child_nodes"]>
  >([]);

  useEffect(() => {
    const slug = params.level2Slug ?? params.level1Slug ?? "";
    setChildNodes(level1Nodes.find((x) => x.slug === slug)?.child_nodes ?? []);
  }, [params]);

  const leafCount = childNodes.length;

  return (
    <>
      <div className="col mb-4 flex justify-between rounded-md bg-white py-1 lg:px-4">
        <div>
          <Breadcrumb allProductGroups={allProductGroups} />
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
      <LeafCarousel data={childNodes} />
    </>
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
