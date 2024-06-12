import { Fragment } from "react";

import type { DefaultProductListContentProps } from "../content";
import { getChildNodes } from "../../_utils/client";
import {
  getAllProductGroups,
  getCustomer,
  getMenuNodes,
} from "../../_utils/server";
import { getCollections } from "../sidebar/utils";
import { Item } from "./Item";

export const ListCarousel = async ({
  searchParams,
}: DefaultProductListContentProps) => {
  const [allProductGroups, menuNodes, customer] = await Promise.all([
    getAllProductGroups(),
    getMenuNodes(),
    searchParams.customer ? getCustomer(searchParams.customer) : undefined,
  ]);
  const collections = getCollections(
    allProductGroups,
    menuNodes,
    searchParams.customer ?? null,
    customer,
  );

  return (
    <>
      {collections.map((root) => {
        const data = getChildNodes(
          menuNodes,
          root.href.split("?")[0]!.split("/"),
          customer,
        );
        return (
          <Fragment key={root.id}>
            {data.length === 0 ? null : (
              <Item info={root} data={data} leafCount={data.length} />
            )}
          </Fragment>
        );
      })}
    </>
  );
};
