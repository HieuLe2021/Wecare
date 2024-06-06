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
import { getChildNodes } from "../../_utils/client";
import { DefaultProductListContentProps } from "../content";
import { LeafCarousel } from "../leaf-carousel";

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
      <div className="mb-4 gap-4 rounded-md bg-white px-4 py-4 ">
        <div className="mb-2 hidden text-left lg:block">
          <span className="text-2xl font-semibold">{customer?.name}</span>
        </div>
        <div className="flex items-center justify-center lg:justify-between ">
          <Breadcrumb allProductGroups={allProductGroups} />
          {/* <div className="row hidden items-center lg:flex">
            <p className="pr-2">Ngành nghề:</p>
            <Select defaultValue={sortOptions[0]?.value}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tất cả" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {sortOptions.map((x) => (
                    <SelectItem key={x.value} value={x.value}>
                      {x.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div> */}
        </div>
      </div>
      <LeafCarousel data={childNodes} leafCount={leafCount} />
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
