"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Breadcrumb } from "~/app/danh-muc-san-pham/_components/breadcrumbs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Tables } from "~/lib/supabase/types";
import { filterLeafNodes } from "../../_utils/client";
import { DefaultProductListContentProps } from "../content";
import { LeafCarousel } from "../leaf-carousel";

const getChildNodes = (
  menuNodes: Tables<"menu_nodes_matview">[],
  slugPrams: string[] | undefined,
  customer?: Tables<"customers_matview">,
) => {
  const slug = slugPrams?.at(-1);
  const childNodes = menuNodes.find((x) => x.slug === slug)?.child_nodes ?? [];
  const childNodesFiltered = filterLeafNodes(childNodes, customer?.products);

  return childNodesFiltered;
};
export const Topbar = ({
  allProductGroups,
  menuNodes,
  customer,
}: {
  allProductGroups: Tables<"product_groups">[];
  menuNodes: Tables<"menu_nodes_matview">[];
  customer: Tables<"customers_matview"> | undefined;
}) => {
  const params = useParams<DefaultProductListContentProps["params"]>();
  const [childNodes, setChildNodes] = useState<
    Tables<"menu_nodes_matview">["child_nodes"]
  >(getChildNodes(menuNodes, params.slug, customer));

  useEffect(() => {
    setChildNodes(getChildNodes(menuNodes, params.slug, customer));
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
            <Select defaultValue={sortOptions[0]?.value}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tất cả" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {sortOptions.map((x) => (
                    <SelectItem value={x.value}>{x.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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
