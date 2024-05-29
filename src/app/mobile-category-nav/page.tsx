import {
  getAllProductGroups,
  getMenuNodes,
} from "../danh-muc-san-pham/_utils/server";
import MobileCategoryNav from "./nav";

export default async function Page() {
  const [allProductGroups, menuNodes] = await Promise.all([
    getAllProductGroups(),
    getMenuNodes(),
  ]);

  return (
    <MobileCategoryNav
      allProductGroups={allProductGroups}
      menuNodes={menuNodes}
    />
  );
}
