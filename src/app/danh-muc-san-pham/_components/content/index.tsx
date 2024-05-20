import { createClient } from "@lib/supabase/server";

import { Tables } from "~/lib/supabase/types";
import { getLeafNode } from "../../utils";
import { LeafCarousel } from "../leaf-carousel";
import { PriceTable } from "./PriceTable";

export const Content = async ({
  params,
}: {
  params: { level1Slug: string };
}) => {
  const supabase = createClient();
  const childNodes = await getLeafNode(params.level1Slug);

  const priceTablesQuery = await Promise.all(
    childNodes.map((node) => {
      return supabase
        .from("products")
        .select("*")
        .eq("product_group_id", node.id!)
        .order("id", { ascending: true });
    }),
  );

  return (
    <>
      {/* {params.level1Slug} */}

      {/* <PriceTable */}
      {/*   material="123" */}
      {/*   data={priceTablesQuery */}
      {/*     .filter((query) => !!query?.data?.[0]) */}
      {/*     .map((query) => query!.data![0]!)} */}
      {/* /> */}
      {priceTablesQuery
        // .filter((query) => !!query?.data?.[0])
        .map((query, index) => {
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
          return (
            <div key={childNodes[index]!.id}>
              <div>{childNodes[index]!.name}</div>
              {Object.entries(groupedByChatLieu).map(([key, value]) => {
                return <PriceTable material={key} key={index} data={value} />;
              })}
            </div>
          );
        })}
    </>
  );
};
