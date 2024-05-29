import {
  getAllProductGroups,
  getCustomer,
  getMenuNodes,
} from "../danh-muc-san-pham/_utils/server";
import MobileCategoryNav from "./nav";

export default async function Page({
  searchParams,
}: {
  searchParams: { customer?: string };
}) {
  const [allProductGroups, menuNodes, customer] = await Promise.all([
    getAllProductGroups(),
    getMenuNodes(),
    searchParams.customer ? getCustomer(searchParams.customer) : undefined,
  ]);

  return (
    <MobileCategoryNav
      allProductGroups={allProductGroups}
      menuNodes={menuNodes}
      customer={customer}
    />
  );
}
