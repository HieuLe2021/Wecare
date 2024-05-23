import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@lib/supabase/server";
import { ScanText } from "lucide-react";

import type { Tables } from "~/lib/supabase/types";
import { Pagination } from "~/components/ui/pagination";
import { vndFormatter } from "~/utils/vndFormatter";
import { getCustomerProductPrices, getLeafNode } from "../../_utils/server";
import { PriceTable } from "./PriceTable";

export type DefaultProductListContentProps = {
  params: { level1Slug?: string; level2Slug?: string };
  searchParams: { groups?: string; page?: string; customer?: string };
};
export const Content = async ({
  params,
  searchParams,
}: DefaultProductListContentProps) => {
  const heads = headers();
  const pathnameSplited =
    heads
      .get("referer")
      ?.replace(heads.get("x-forwarded-proto") + "://", "")
      .replace(heads.get("x-forwarded-host") || "", "")
      .split("/")
      .join("/")
      .split("?")[0]
      ?.split("/") ?? [];
  console.log("a", heads.get("referer"));
  const supabase = createClient();
  const childNodes = await getLeafNode(
    params.level2Slug ?? params.level1Slug ?? "",
  );

  const productsBySlug = (slug: string) => {
    return supabase
      .from("products")
      .select("*")
      .eq("product_group_slug", slug)
      .order("id", { ascending: true });
  };
  const selectedGroups = searchParams.groups?.split(",");
  const groups = searchParams.groups
    ? childNodes.filter((x) => selectedGroups?.includes(x.slug!))
    : childNodes;
  const { from, to } = getPagination(parseInt(searchParams.page ?? "1"), 10);
  const [customerProductPrices, ...priceTablesQuery] = await Promise.all([
    searchParams.customer
      ? getCustomerProductPrices(searchParams.customer)
      : null,
    ...groups.slice(from, to).map((node) => {
      return productsBySlug(node.slug!);
    }),
  ]);

  return (
    <>
      {priceTablesQuery.map((query, index) => {
        const products = query.data ?? [];
        // if (products.length === 0) return null;
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

        const parentPath = params.level2Slug
          ? pathnameSplited.slice(0, 4).join("/")
          : params.level1Slug
            ? pathnameSplited.slice(0, 3).join("/")
            : "xx";

        const data = groups[index]!;
        return (
          <div key={data.id} className="mb-4 rounded-lg bg-white p-4">
            <div className="flex gap-4 pb-4 text-xs leading-4 text-gray-800 bg-blend-normal max-md:flex-wrap">
              <Image
                loading="lazy"
                src={data.image_url || "https://placehold.co/600x400/png"}
                className="aspect-square shrink-0"
                alt={data.name!}
                width={120}
                height={120}
              />
              <div className="">
                <Link
                  className="text-sx cursor-pointer pb-1 text-blue-500 underline underline-offset-1"
                  href={parentPath}
                >
                  {data.parent_name}
                </Link>
                <h6 className="text-base font-semibold">
                  {data.name ?? "Đang cập nhật"}
                </h6>
                <div className="self-start text-sm max-md:max-w-full">
                  Siêu thị công nghiệp Wecare chuyên cung cấp sản phẩm đa dạng
                  mẫu mã, phục vụ đa ngành nghề. Giá cả cạnh tranh, đảm bảo trải
                  nghiệm khách hàng tốt nhất.
                </div>
                {prices.length < 1 ? (
                  <div className="pt-2 text-xs text-red-500">
                    Vui lòng liên hệ để báo giá
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
              <div className="flex w-full flex-col items-center justify-center gap-2 p-12 text-gray-300">
                <ScanText size={40} strokeWidth={2} />
                <span>Bảng giá chưa được cập nhật</span>
              </div>
            ) : (
              Object.entries(groupedByChatLieu).map(([key, value]) => {
                return (
                  <PriceTable
                    key={index}
                    material={key}
                    data={value}
                    customerProductPrices={customerProductPrices}
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
