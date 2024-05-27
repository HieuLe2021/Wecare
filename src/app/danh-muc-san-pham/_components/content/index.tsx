import Link from "next/link";
import { createClient } from "@lib/supabase/server";
import { ScanText } from "lucide-react";

import type { Tables } from "~/lib/supabase/types";
import Image from "~/components/Image";
import { Pagination } from "~/components/ui/pagination";
import { vndFormatter } from "~/utils/vndFormatter";
import { getCustomerProductPrices, getLeafNode } from "../../_utils/server";
import { PriceTable } from "./PriceTable";

export type DefaultProductListContentProps = {
  params: { slug?: string[] };
  searchParams: {
    groups?: string;
    page?: string;
    customer?: string;
    sort_by?: keyof Tables<"products">;
    sort_order?: "asc" | "desc";
  };
};
export const Content = async ({
  params,
  searchParams,
}: DefaultProductListContentProps) => {
  const sortBy = searchParams.sort_by ?? "thuong_hieu";
  const sortOrder = searchParams.sort_order ?? "asc";

  const supabase = createClient();
  const childNodes = await getLeafNode(params.slug!.at(-1)!);

  const productsBySlug = (slug: string) => {
    return supabase
      .from("products")
      .select("*")
      .eq("product_group_slug", slug)
      .order("id", { ascending: true });
  };
  const selectedGroups = searchParams.groups?.split(",");

  const { from, to } = getPagination(parseInt(searchParams.page ?? "1"), 10);
  const groups = searchParams.groups
    ? childNodes.filter((x) => selectedGroups?.includes(x.slug))
    : childNodes;
  const paginatedGroups = groups.slice(from, to);
  const [customerProductPrices, ...priceTablesQuery] = await Promise.all([
    searchParams.customer
      ? getCustomerProductPrices(searchParams.customer)
      : null,
    ...paginatedGroups.map((node) => {
      return productsBySlug(node.slug);
    }),
  ]);

  return (
    <>
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

        const data = paginatedGroups[index]!;
        return (
          <div key={data.id} className="mb-4 rounded-lg bg-white p-4">
            <div className="flex gap-4 pb-4 text-xs leading-4 text-gray-800 bg-blend-normal max-md:flex-wrap">
              <Image
                loading="lazy"
                src={data.image_url}
                className="aspect-square shrink-0"
                alt={data.name}
                width={120}
                height={120}
              />
              <div className="">
                <Link
                  className="text-sx cursor-pointer pb-1 text-blue-500 underline underline-offset-1"
                  href={data.parent_slug}
                >
                  {data.parent_name}
                </Link>
                <h6 className="text-base font-semibold">{data.name}</h6>
                <div className="self-start text-sm max-md:max-w-full">
                  Siêu thị công nghiệp Wecare chuyên cung cấp sản phẩm đa dạng
                  mẫu mã, phục vụ đa ngành nghề. Giá cả cạnh tranh, đảm bảo trải
                  nghiệm khách hàng tốt nhất.
                </div>
                {prices.length === 0 ? null : prices.length === 1 ? (
                  <div className="pt-2 text-xs text-red-500">
                    {vndFormatter.format(prices[0]!)}
                  </div>
                ) : (
                  <div className="pt-2 text-base text-red-500">
                    {vndFormatter.format(priceMin)} -{" "}
                    {vndFormatter.format(priceMax)}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-1 h-[1px] w-full border border-b border-dashed"></div>
            {Object.entries(groupedByChatLieu).length === 0 ? (
              <div className="flex w-full flex-col items-center justify-center gap-2 pt-2 text-gray-300">
                <ScanText size={40} strokeWidth={2} />
                <span>Vui lòng liên hệ để được báo giá</span>
              </div>
            ) : (
              Object.entries(groupedByChatLieu).map(([key, value]) => {
                return (
                  <PriceTable
                    key={index}
                    material={key}
                    data={value}
                    customerProductPrices={customerProductPrices}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                  />
                );
              })
            )}
          </div>
        );
      })}
      <Pagination total={groups.length} />
    </>
  );
};

const getPagination = (p: number, size: number) => {
  const page = p - 1;
  const limit = size ? +size : 3;
  const from = page ? page * limit : 0;
  const to = page ? from + size - 1 : size - 1;

  return { from, to };
};
