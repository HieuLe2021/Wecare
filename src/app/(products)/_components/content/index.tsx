import { createClient } from "@lib/supabase/server";

import { Tables } from "~/lib/supabase/types";
import { PriceTable } from "./PriceTable";

export const Content = async ({
  params,
}: {
  params: { level1Slug: string };
}) => {
  const supabase = createClient();
  const menuNodesQuery = await supabase
    .from("menu_nodes")
    .select("*")
    .eq("id", params.level1Slug)
    .order("pos", { ascending: true });

  // const childNodes = menuNodesQuery.data && menuNodesQuery.data[0]  && menuNodesQuery.data[0].child_nodes ?  menuNodesQuery.data[0].child_nodes : []
  const childNodes = menuNodesQuery?.data?.[0]?.child_nodes ?? [];

  const priceTablesQuery = await Promise.all(
    childNodes.map((node) => {
      return supabase
        .from("products")
        .select("*")
        .eq("product_group_id", node.id!)
        .order("id", { ascending: true });
    }),
  );

  console.log(
    "xxxx",
    childNodes.length,
    priceTablesQuery.length,
    priceTablesQuery[7]?.data,
  );
  return (
    <>
      {params.level1Slug}
      {childNodes.map((node, index) => {
        return (
          <div>
            {index}
            {node.id}
            {node.name}
          </div>
        );
      })}

      {/* <PriceTable */}
      {/*   material="123" */}
      {/*   data={priceTablesQuery */}
      {/*     .filter((query) => !!query?.data?.[0]) */}
      {/*     .map((query) => query!.data![0]!)} */}
      {/* /> */}
      {priceTablesQuery
        .filter((query) => !!query?.data?.[0])
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
            <div>
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
