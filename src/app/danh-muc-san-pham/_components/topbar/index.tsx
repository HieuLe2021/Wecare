"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Select from "@component/Select";

import { Breadcrumb } from "~/app/danh-muc-san-pham/_components/breadcrumbs";
import { Tables } from "~/lib/supabase/types";
import { DefaultProductListContentProps } from "../content";
import { LeafCarousel } from "../leaf-carousel";

export const Topbar = ({
  allProductGroups,
  menuNodes,
}: {
  allProductGroups: Tables<"product_groups">[];
  menuNodes: Tables<"menu_nodes_matview">[];
}) => {
  const params = useParams<DefaultProductListContentProps["params"]>();
  const [childNodes, setChildNodes] = useState<
    Tables<"menu_nodes_matview">["child_nodes"]
  >([]);

  useEffect(() => {
    const slug = params.slug?.at(-1);

    setChildNodes(menuNodes.find((x) => x.slug === slug)?.child_nodes ?? []);
  }, [params]);

  const leafCount = childNodes.length;

  return (
    <>
      <div className="col mb-4 flex justify-center rounded-md bg-white py-4 lg:justify-between lg:px-4 ">
        <Breadcrumb allProductGroups={allProductGroups} />
        {(params.slug && (
          <div className="row flex items-center">
            <p className="pr-2">Ngành nghề:</p>
            <Select
              placeholder="Tất cả"
              defaultValue={sortOptions[0]}
              options={sortOptions}
            />
          </div>
        )) || (
          <div className="row flex items-center">
            <p className="pr-2">Ngành nghề:</p>
            <Select
              placeholder="Tất cả"
              defaultValue={sortOptions[0]}
              options={sortOptions}
            />
          </div>
        )}
      </div>
      {params.slug && <LeafCarousel data={childNodes} leafCount={leafCount} />}
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
