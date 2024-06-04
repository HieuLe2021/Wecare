import Link from "next/link";
import { createClient } from "@lib/supabase/server";
import { ScanText } from "lucide-react";

import type { Tables } from "~/lib/supabase/types";
import { Image } from "~/components/image";
import { Pagination } from "~/components/ui/pagination";
import { vndFormatter } from "~/utils/vndFormatter";
import { filterLeafNodes } from "../../_utils/client";
import { getCustomer, getLeafNode } from "../../_utils/server";
import { CloseLeafButton } from "./CloseLeafButton";
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
  const supabase = createClient();
  const [customer, childNodes] = await Promise.all([
    searchParams.customer ? getCustomer(searchParams.customer) : undefined,
    getLeafNode(params.slug!.at(-1)!),
  ]);

  // by customer or not
  const childNodesFiltered = filterLeafNodes(childNodes, customer?.products);

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
    ? childNodesFiltered.filter((x) => selectedGroups?.includes(x.slug))
    : childNodesFiltered;
  // const groups = searchParams.groups
  //   ? childNodes.filter((x) => selectedGroups?.includes(x.slug))
  //   : childNodes;
  const paginatedGroups = groups.slice(from, to);
  const priceTablesQuery = await Promise.all([
    ...paginatedGroups.map((node) => {
      return productsBySlug(node.slug);
    }),
  ]);

  const cp = customer?.products?.map((cp) => cp.id);
  const filtered =
    customer && cp && cp.length > 0
      ? priceTablesQuery
          .map((t) => ({
            data: t.data?.filter((r) => !cp || cp.includes(r.id)),
          }))
          .filter((t) => t.data && t.data.length > 0)
      : priceTablesQuery;

  return (
    <>
      {filtered.map((query, index) => {
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

        const prices = products.map(
          (i) =>
            customer?.products?.find((p) => p.id === i.id)?.gia ?? i.gia ?? 0,
        );
        const priceMin = Math.min(...prices);
        const priceMax = Math.max(...prices);

        const data = paginatedGroups[index]!;
        return (
          <div key={data.id} className="mb-4 rounded-lg bg-white lg:p-4">
            <div className="flex gap-2 pb-4 text-xs leading-4 text-gray-800 bg-blend-normal max-lg:flex-wrap lg:gap-4">
              <div className="flex w-full lg:w-24">
                <div className="relative h-24 w-24">
                  <Image
                    loading="lazy"
                    src={data.image_url}
                    className="aspect-square"
                    alt={"Ảnh đại diện - " + data.name}
                    fill
                    sizes="96px"
                  />
                </div>

                <div className="w-[calc(100%-130px)] pl-2 pt-2 lg:hidden">
                  <Link
                    className="text-sx cursor-pointer pb-4 text-blue-500 underline underline-offset-1"
                    href={data.parent_slug}
                  >
                    {data.parent_name}
                  </Link>
                  <h6 className="mt-4 text-base font-semibold">{data.name}</h6>
                  {prices.length === 0 ? null : prices.length === 1 ? (
                    <div className="pt-2 text-sm text-red-500">
                      {vndFormatter.format(prices[0]!)}
                    </div>
                  ) : (
                    <div className="pt-2 text-sm text-red-500">
                      {vndFormatter.format(priceMin)} -{" "}
                      {vndFormatter.format(priceMax)}
                    </div>
                  )}
                </div>
                {searchParams.groups && (
                  <div className="lg:hidden">
                    <CloseLeafButton leafSlug={data.slug} />
                  </div>
                )}
              </div>

              <div className="hidden flex-1 lg:block">
                <Link
                  className="text-sx cursor-pointer pb-2 text-blue-500 underline underline-offset-1"
                  href={data.parent_slug}
                >
                  {data.parent_name}
                </Link>
                <h6 className="text-base font-semibold">{data.name}</h6>
                <div className="self-start pt-1 text-[13px] leading-5 max-lg:max-w-full	">
                  Siêu thị công nghiệp Wecare chuyên cung cấp sản phẩm đa dạng
                  mẫu mã, phục vụ đa ngành nghề. Giá cả cạnh tranh, đảm bảo trải
                  nghiệm khách hàng tốt nhất.
                </div>
                {prices.length === 0 ? null : prices.length === 1 ? (
                  <div className="pt-2 text-sm text-red-500">
                    {vndFormatter.format(prices[0]!)}
                  </div>
                ) : (
                  <div className="pt-2 text-sm text-red-500">
                    {vndFormatter.format(priceMin)} -{" "}
                    {vndFormatter.format(priceMax)}
                  </div>
                )}
              </div>
              <div className="lg:hidden">
                <div className="self-start px-2 pt-1 text-[13px] leading-5	max-lg:max-w-full">
                  Siêu thị công nghiệp Wecare chuyên cung cấp sản phẩm đa dạng
                  mẫu mã, phục vụ đa ngành nghề. Giá cả cạnh tranh, đảm bảo trải
                  nghiệm khách hàng tốt nhất.
                </div>
              </div>
              {searchParams.groups && (
                <div className="hidden lg:block">
                  <CloseLeafButton leafSlug={data.slug} />
                </div>
              )}
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
                    key={key}
                    material={key}
                    data={value}
                    customerProducts={customer?.products || []}
                    img={data.image_url}
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
