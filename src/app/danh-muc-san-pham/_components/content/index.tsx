import { createClient } from "@lib/supabase/server";

import { Tables } from "~/lib/supabase/types";
import { vndFormatter } from "~/utils/vndFormatter";
import { getLeafNode } from "../../utils";
import { LeafCarousel } from "../leaf-carousel";
import { PriceTable } from "./PriceTable";

export type DefaultProductListContentProps = {
  params: { level1Slug: string };
  searchParams: { groups?: string };
};
export const Content = async ({
  params,
  searchParams,
}: DefaultProductListContentProps) => {
  const supabase = createClient();
  const childNodes = await getLeafNode(params.level1Slug);

  const productsById = (id: string) => {
    return supabase
      .from("products")
      .select("*")
      .eq("product_group_id", id)
      .order("id", { ascending: true });
  };
  const priceTablesQuery = await Promise.all(
    searchParams.groups
      ? searchParams.groups.split(",").map((id) => {
          return productsById(id);
        })
      : childNodes.map((node) => {
          return productsById(node.id!);
        }),
  );

  return (
    <div className="p-4">
      <div className="relative mb-4 h-32 w-full">
        <div className="absolute inset-0 rounded-xl bg-white max-md:max-w-full max-sm:px-10">
          <div className="flex w-full sm:px-2  md:px-12 lg:px-12">
            <LeafCarousel data={childNodes} />
          </div>
        </div>
      </div>

      {priceTablesQuery.map((query, index) => {
        const products = query.data ?? [];
        const groupedByChatLieu: Record<string, Tables<"products">[]> = {};
        products.forEach((product) => {
          const { chat_lieu } = product;
          const chatLieu = chat_lieu ?? "unknown";
          if (!groupedByChatLieu[chatLieu]) {
            groupedByChatLieu[chatLieu] = [];
          }
          groupedByChatLieu[chatLieu]!.push(product);
        });

        const prices = products.map((i) => i.gia ?? 0);
        const priceMin = Math.min(...prices);
        const priceMax = Math.max(...prices);
        return (
          <div
            key={childNodes[index]!.id}
            className="mb-4 rounded-lg bg-white p-4"
          >
            <div className="flex gap-4 pb-4 text-xs leading-4 text-gray-800 bg-blend-normal max-md:flex-wrap">
              <img
                loading="lazy"
                srcSet={
                  childNodes[index]!.image_url ||
                  "https://placehold.co/600x400/png"
                }
                className="aspect-square h-[120px] w-[120px] shrink-0"
              />
              <div className="">
                <p className="text-sx cursor-pointer pb-1 text-blue-500 underline underline-offset-1">
                  Băng keo
                </p>
                <h6 className="text-base font-semibold">
                  {childNodes[index]!.name}
                </h6>
                <div className="self-start text-sm max-md:max-w-full">
                  Siêu thị công nghiệp Wecare chuyên cung cấp sản phẩm đa dạng
                  mẫu mã, phục vụ đa ngành nghề. Giá cả cạnh tranh, đảm bảo trải
                  nghiệm khách hàng tốt nhất.
                </div>
                <div className="pt-2 text-base text-red-500">
                  {vndFormatter.format(priceMin)} -{" "}
                  {vndFormatter.format(priceMax)}
                </div>
              </div>
            </div>
            <div className="mb-1 h-[1px] w-full border border-b border-dashed"></div>
            {Object.entries(groupedByChatLieu).map(([key, value]) => {
              return <PriceTable material={key} key={index} data={value} />;
            })}
          </div>
        );
      })}
    </div>
  );
};
