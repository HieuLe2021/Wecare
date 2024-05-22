import { match } from "assert";
import { createClient } from "@lib/supabase/server";

import FlexBox from "~/components/FlexBox";
import { Tables } from "~/lib/supabase/types";
import { vndFormatter } from "~/utils/vndFormatter";
import { getAllProductGroups, getLeafNode } from "../../utils";
import { LeafCarousel } from "../leaf-carousel";
import Pagination from "../pagination/Pagination";
import { Topbar } from "../topbar";
import { PriceTable } from "./PriceTable";

export type DefaultProductListContentProps = {
  params: { level1Slug?: string; level2Slug?: string };
  searchParams: { groups?: string; page?: string };
};
export const Content = async ({
  params,
  searchParams,
}: DefaultProductListContentProps) => {
  const supabase = createClient();
  const allProductGroups = await getAllProductGroups();
  const childNodes = await getLeafNode(
    params.level2Slug ?? params.level1Slug ?? "",
  );

  const productsById = async (id: string) => {
    const { from, to } = getPagination(parseInt(searchParams.page ?? "1"), 10);

    const res = await supabase
      .from("products")
      .select("*")
      .eq("product_group_id", id)
      .order("id", { ascending: true });
    console.log("data, count:", res.count);
    return res;
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

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <>
      <Topbar resGroups={allProductGroups} leafCount={childNodes.length} />

      <div className="p-4">
        <div className="relative mb-4 h-36 w-full">
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
              key={childNodes[index]?.id}
              className="mb-4 rounded-lg bg-white p-4"
            >
              <div className="flex gap-4 pb-4 text-xs leading-4 text-gray-800 bg-blend-normal max-md:flex-wrap">
                <img
                  loading="lazy"
                  srcSet={
                    childNodes[index]?.image_url ||
                    "https://placehold.co/600x400/png"
                  }
                  className="aspect-square h-[120px] w-[120px] shrink-0"
                />
                <div className="">
                  <p className="text-sx cursor-pointer pb-1 text-blue-500 underline underline-offset-1">
                    Băng keo
                  </p>
                  <h6 className="text-base font-semibold">
                    {childNodes[index]?.name ?? "Đang cập nhật"}
                  </h6>
                  <div className="self-start text-sm max-md:max-w-full">
                    Siêu thị công nghiệp Wecare chuyên cung cấp sản phẩm đa dạng
                    mẫu mã, phục vụ đa ngành nghề. Giá cả cạnh tranh, đảm bảo
                    trải nghiệm khách hàng tốt nhất.
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
              {Object.entries(groupedByChatLieu).map(([key, value]) => {
                return <PriceTable material={key} key={index} data={value} />;
              })}
            </div>
          );
        })}
      </div>
      <FlexBox justifyContent="end" mt="2.5rem">
        <Pagination
          pageCount={3}
          pageRangeDisplayed={3}
          marginPagesDisplayed={3}
        />
      </FlexBox>
    </>
  );
};

const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3;
  const from = page ? page * limit : 0;
  const to = page ? from + size - 1 : size - 1;

  return { from, to };
};
