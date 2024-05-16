import { Fragment } from "react";
import { MenuItem } from "@component/categories/mega-menu/type";
// GLOBAL CUSTOM COMPONENTS
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import ProductFilterCard from "@component/products/ProductFilterCard";
import Typography from "@component/Typography";
import { Breadcrumb } from "@components/breadcrumb";
import navigations from "@data/navigations";
import ProductDetails from "@sections/shop/ProductDetails";
// PAGE SECTION COMPONENTS
import ShopIntroCard from "@sections/shop/ShopIntroCard";
// API FUNCTIONS
import api from "@utils/__api__/shops";
// CUSTOM DATA MODEL
import { createClient } from "@utils/supabase/server";
import { SlugParams } from "interfaces";

import Sidebar from "../_components/Sidebar";
import { CarouselProduct } from "./_components/Carousel";
import CustomTable from "./_components/Table";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: {
    group: string;
    customer: string;
    child: string;
    sectors: string[];
  };
}) {
  const supabase = createClient();
  let groupId = searchParams.group;
  const childGroupId = searchParams.child;
  const customerId = searchParams.customer;
  const productGroups = await supabase.from("product_groups").select();
  let productGroupsList = productGroups.data || [];
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const allBusinessSectors = Array.from(
    new Set<string>(
      (productGroupsList.map((item: any) => item.nganh_nghe) || []).filter(
        (item: string) => item && !item.includes(","),
      ),
    ),
  );
  const filterBusinessSectors = searchParams.sectors;

  if (filterBusinessSectors && filterBusinessSectors.length > 0) {
    productGroupsList = productGroupsList.filter((group: any) => {
      return (
        !group.nganh_nghe || filterBusinessSectors.includes(group.nganh_nghe)
      );
    });
  }

  const groups = prepareTreeData(productGroupsList);
  const sidebarGroups = JSON.parse(JSON.stringify(groups));
  const menuItems = genTreeData(productGroupsList);
  let selectedGroup =
    groupId &&
    productGroupsList?.find((group: any) => group.id == groupId && group.name);
  if (!groupId) {
    selectedGroup = {
      name: "Danh mục sản phẩm",
      id: null,
      children: groups,
      productByMaterial: [],
    };
  }

  // calculate path for current selected group

  // get child of current selected group
  const childOfSelectedGroup = groupId
    ? productGroupsList?.filter(
        (group: any) => group.parent_id == groupId && group.name,
      )
    : productGroupsList?.filter((group: any) => !group.parent_id && group.name);

  let productsForCustomer: any[] = [];
  if (customerId) {
    const productsForCustomerData = await supabase
      .from("customer_products")
      .select()
      .eq("customerid", customerId);
    productsForCustomer = productsForCustomerData.data || [];
  }

  const allProducts = (await supabase.from("products").select()).data || [];

  const currentProductByMaterial = await getProductByMaterial(
    supabase,
    groupId,
    productsForCustomer,
    allProducts,
  );
  selectedGroup && (selectedGroup.productByMaterial = currentProductByMaterial);

  // loop through child of current selected group
  if (selectedGroup?.children?.length > 0) {
    let groupList = selectedGroup?.children.map((child: any) => child.id);
    const productByMaterialList = await Promise.all(
      groupList.map((id: any) =>
        getProductByMaterial(supabase, id, productsForCustomer, allProducts),
      ),
    );
    for (let i = 0; i < selectedGroup.children.length; i++) {
      selectedGroup.children[i].productByMaterial = productByMaterialList[i];
      const grandChildren = await getChildrenProductDataOfGroup(
        productGroupsList,
        selectedGroup.children[i].id,
        supabase,
        productsForCustomer,
        allProducts,
      );
      // calculate next level data
      // need to check performance
      if (!groupId && grandChildren.length > 0) {
        const grandGroupList = grandChildren.map((child: any) => child.id);
        const grandProductByMaterialList = await Promise.all(
          grandGroupList.map((id: any) =>
            getProductByMaterial(
              supabase,
              id,
              productsForCustomer,
              allProducts,
            ),
          ),
        );
        for (let j = 0; j < grandChildren.length; j++) {
          grandChildren[j].productByMaterial = grandProductByMaterialList[j];
          const grandGrandChildren = await getChildrenProductDataOfGroup(
            productGroupsList,
            grandChildren[j].id,
            supabase,
            productsForCustomer,
            allProducts,
          );
          grandChildren[j].children = grandGrandChildren;
        }
      }

      // update first item only
      //TODO: Check performance
      if (!groupId && grandChildren.length > 0 && false) {
        const grandGroupList = [grandChildren[0].id];
        const grandProductByMaterialList = await Promise.all(
          grandGroupList.map((id: any) =>
            getProductByMaterial(supabase, id, productsForCustomer),
          ),
        );
        grandChildren[0].productByMaterial = grandProductByMaterialList[0];
        const grandGrandChildren = await getChildrenProductDataOfGroup(
          productGroupsList,
          grandChildren[0].id,
          supabase,
          productsForCustomer,
        );
        grandChildren[0].children = grandGrandChildren;
      }
    }

    if (childGroupId) {
      selectedGroup.children = [
        selectedGroup.children.find((child: any) => child.id == childGroupId),
      ];
      const grandChildren = await getChildrenProductDataOfGroup(
        productGroupsList,
        childGroupId,
        supabase,
        productsForCustomer,
        allProducts, //TODO: check
      );
      selectedGroup.children[0].children = grandChildren;
    }
  }

  return (
    <Fragment>
      {/* <ShopIntroCard /> */}

      {/* SHOW IN LARGE DEVICE */}
      {/* <Hidden as={Grid} item md={3} xs={12} down={1024}>
          <ProductFilterCard />
        </Hidden> */}

      {/* <Grid item md={3} xs={12}> */}
      {/* </Grid> */}

      {/* <Grid item md={3} xs={12}> */}
      {/*   <ProductFilterCard /> */}
      {/* </Grid> */}

      <div className="w-full px-4">
        <div className="text-4xl font-medium leading-7 text-gray-800 max-md:max-w-full">
          {selectedGroup?.name}
        </div>
        {childOfSelectedGroup?.length === 0 ? null : (
          <>
            <div className="mt-2 text-xs leading-4 text-gray-400 max-md:max-w-full">
              {`${
                childOfSelectedGroup?.length
                  ? childOfSelectedGroup?.length
                  : "0"
              }`}{" "}
              loại sản phẩm
            </div>
            <div className="relative h-40 w-full">
              <div className="absolute inset-0 rounded-xl bg-white max-md:max-w-full max-sm:px-10">
                <div className="flex w-full sm:px-2  md:px-12 lg:px-12">
                  <CarouselProduct
                    data={childOfSelectedGroup || []}
                    customerId={customerId}
                    groupId={groupId}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {selectedGroup && (
          <div>
            <CustomTable data={selectedGroup?.productByMaterial}></CustomTable>
            {selectedGroup.children &&
              selectedGroup.children.map((item: any) => (
                <>
                  <h6 className="my-2 bg-zinc-100 py-1 pl-2 text-2xl font-medium ">
                    {item.name ? item.name : "Khác"}
                  </h6>
                  <div className="mb-3 flex pl-2"></div>
                  <div className="mb-2 h-[1px] w-full border border-b border-dashed"></div>
                  <CustomTable data={item.productByMaterial}></CustomTable>
                  {item.children &&
                    item.children.map((grandChild: any) => (
                      <div className="rounded-lg bg-white p-2	">
                        <div className="flex gap-4 pl-2 text-xs leading-4 text-gray-800 bg-blend-normal max-md:flex-wrap">
                          <img
                            loading="lazy"
                            srcSet="https://wecare.com.vn/wp-content/uploads/2023/04/Ban_le_xe_tai-removebg-preview-247x296.png"
                            className="aspect-square w-[120px] shrink-0"
                          />
                          <div className="p-2">
                            <p className="text-sx cursor-pointer pb-1 text-blue-500 underline underline-offset-1">
                              Băng keo
                            </p>
                            <h6 className="text-base font-semibold">
                              {grandChild.name ? grandChild.name : "Khác"}
                            </h6>
                            <div className="self-start text-sm max-md:max-w-full">
                              Siêu thị công nghiệp Wecare chuyên cung cấp sản
                              phẩm đa dạng mẫu mã, phục vụ đa ngành nghề. Giá cả
                              cạnh tranh, đảm bảo trải nghiệm khách hàng tốt
                              nhất.
                            </div>
                            <div className="pt-2 text-base text-red-500">
                              {formatter.format(40000)} -{" "}
                              {formatter.format(140000)}
                            </div>
                          </div>
                        </div>
                        <div className="mb-2 flex pl-2">
                          {groupId &&
                            grandChild.productByMaterial < 1 &&
                            "Vui lòng liên hệ để báo giá"}
                        </div>
                        <div className="mb-1 h-[1px] w-full border border-b border-dashed"></div>
                        <CustomTable
                          data={grandChild.productByMaterial}
                        ></CustomTable>
                        {!selectedGroup.id &&
                          grandChild.children &&
                          grandChild.children.map((grandGrandChild: any) => (
                            <>
                              <h6 className="text-1xl pl-2 font-semibold">
                                {grandGrandChild.name
                                  ? grandGrandChild.name
                                  : "Khác"}
                              </h6>
                              <div className="mb-2 flex pl-2">
                                {groupId &&
                                  grandGrandChild.productByMaterial == 0 &&
                                  "Vui lòng liên hệ để báo giá"}
                              </div>
                              <div className="mb-1 h-[1px] w-full border border-b border-dashed"></div>
                              <CustomTable
                                data={grandGrandChild.productByMaterial}
                              ></CustomTable>
                            </>
                          ))}
                      </div>
                    ))}
                </>
              ))}
          </div>
        )}
      </div>
      {/*   <ProductDetails shop={shop} /> */}

      {/* <Sidebar menuItems={navigations} x={sidebarGroups} z={productGroups.data} /> */}
    </Fragment>
  );
}

async function getChildrenProductDataOfGroup(
  productGroupsList: any[],
  groupId: string,
  supabase: any,
  productsForCustomer: any[],
  allProducts?: any[],
) {
  const grandChildren =
    productGroupsList?.filter(
      (grandChild: any) => grandChild.parent_id == groupId,
    ) || [];

  const grandChildrenGroupList = grandChildren?.map((child: any) => child.id);
  const grandChildProductByMaterialList = await Promise.all(
    grandChildrenGroupList.map((id: any) =>
      getProductByMaterial(supabase, id, productsForCustomer, allProducts),
    ),
  );
  for (let i = 0; i < grandChildren.length; i++) {
    grandChildren[i].productByMaterial = grandChildProductByMaterialList[i];
  }
  return grandChildren;
}

async function getProductByMaterial(
  supabase: any,
  groupId: string,
  productsForCustomer: any[],
  allProducts?: any[],
) {
  if (!groupId) {
    return [];
  }
  let productList = allProducts
    ? allProducts.filter((item: any) => item.product_group_id == groupId)
    : (await supabase.from("products").select().eq("product_group_id", groupId))
        .data || [];

  const productCustomerList = productsForCustomer || [];
  // merger customer product with product list
  productList = productList.map((item: any) => {
    const customProduct = productCustomerList.find(
      (product: any) => product.productid === item.id,
    );
    if (customProduct) {
      return {
        ...item,
        gia: customProduct?.gia || item.gia,
        don_vi: customProduct?.don_vi || item.don_vi,
      };
    }
    return item;
  });

  const productByMaterial = Object.entries(
    productList.reduce((acc: any, item: any) => {
      if (!acc[item.chat_lieu]) {
        acc[item.chat_lieu] = [];
      }
      acc[item.chat_lieu].push(item);

      return acc;
    }, {}),
  ).map(([label, options]) => ({ label, options }));
  return productByMaterial;
}

function prepareTreeData(productGroupsList: any[]) {
  const topGroups =
    productGroupsList?.filter((group: any) => !group.parent_id && group.name) ||
    [];
  for (const group of topGroups) {
    const children =
      productGroupsList?.filter((child: any) => child.parent_id === group.id) ||
      [];
    group.children = children;
    for (const child of children) {
      const grandChildren = productGroupsList?.filter(
        (grandChild: any) => grandChild.parent_id === child.id,
      );
      child.children = grandChildren;
    }
  }
  return topGroups;
}

type Category = {
  id: string;
  image_url: string;
  last_synced: Date;
  name: string;
  nganh_nghe: string;
  parent_id: string | null;
  productByMaterial: {
    label: string | null;
    options: {
      chat_lieu: string | null;
      don_vi: string;
      gia: number;
      hoan_thien: string;
      id: string;
      last_synced: Date;
      product_group_id: string;
      quy_cach: string;
      ten_sp: string;
      thuong_hieu: string;
    }[];
  }[];
};

type SubCategory = {
  title: string;
  href: string;
  imgUrl: string;
};
type MenuCategory = {
  title: string;
  href: string;
  subCategories?: SubCategory[];
};
type MenuChild =
  | {
      icon?: string;
      title?: string;
      href?: string;

      megaMenu: "MegaMenu1";
      menuData: {
        categories: MenuCategory[];
      };
    }
  | {
      icon: string;
      title: string;
      href: string;
      megaMenu: number;
    };

// type MenuItem = typeof navigations
function genTreeData(productGroupsList: Category[]): MenuItem[] {
  // const menuItems: MenuItem[] = []
  const menuItems = productGroupsList
    .filter((group) => !group.parent_id && group.name)
    .map((root) => {
      const level_1 = productGroupsList
        .filter((child) => child.parent_id === root.id)
        .map((child, index) => {
          const level_2 = productGroupsList
            .filter((grandChild) => grandChild.parent_id === child.id)
            .map((grandChild) => {
              const grandChildItem = {
                title: grandChild.name,
                href: "",
                imgUrl: grandChild.image_url,
              };
              return grandChildItem;
            });

          const childItem = {
            title: child.name,
            href: "",
            subCategories: level_2,
          };
          // const childItem: MenuChild = {
          //   icon: "man",
          //   title: child.name,
          //   href: "",
          //   // subCategories: level_2,
          //   ...(level_2.length > 0 ? {
          //     megaMenu: "MegaMenu1",
          //     menuData: {
          //       categories: level_2
          //     },
          //   } : {
          //     megaMenu: index,
          //   })
          // }
          return childItem;
        });

      const menuItem: MenuItem = {
        icon: "laptop",
        href: "",
        title: root.name,
        ...(level_1.length > 0
          ? { menuComponent: "MegaMenu1", menuData: { categories: level_1 } }
          : { menuComponent: "MegaMenu2", menuData: [] }),
        // ...(level_1.length > 0 ? { menuComponent: "MegaMenu2", menuData: level_1 } : { menuComponent: "MegaMenu2", menuData: [] })
      };
      return menuItem;
    });
  // const topGroups =
  //   productGroupsList.filter((group) => !group.parent_id && group.name) ||
  //   [];
  // for (const group of topGroups) {
  //
  //   // const children =
  //   //   productGroupsList?.filter((child: any) => child.parent_id === group.id) ||
  //   //   [];
  //   // group.children = children;
  //
  //
  //
  //
  //   const menuData: any[] = []
  //
  //   const children =
  //     productGroupsList?.filter((child) => child.parent_id === group.id) ||
  //     [];
  //
  //   for (const [childIndex, child] of children.entries()) {
  //     const grandChildren = productGroupsList?.filter(
  //       (grandChild) => grandChild.parent_id === child.id
  //     ).map(grandChild => ({
  //       href: "",
  //       // icon: "laptop", //image_url
  //       // menuComponent: "MegaMenu2",
  //       // menuData: {
  //       //   categories: children
  //       // },
  //       subCategories: [],
  //       title: grandChild.name
  //     }));
  //
  //     // child.children = grandChildren;
  //
  //     if (child.name === "Thanh nẹp giấy V") {
  //       console.log("ccccccc", child, grandChildren)
  //     }
  //     // Level 2
  //     const childItem = {
  //       href: child.id,
  //       icon: "laptop", //image_url
  //       title: child.name
  //     }
  //     if (grandChildren.length === 0) {
  //       childItem.megaMenu = childIndex
  //     }
  //     else {
  //       childItem.megaMenu = "MegaMenu1"
  //       childItem.menuData = {
  //         categories: grandChildren
  //       }
  //     }
  //     menuData.push(childItem)
  //   }
  //
  //   const formattedGroup: any = {
  //     href: "",
  //     icon: "laptop", //image_url
  //     menuComponent: "MegaMenu2",
  //     // menuData: {
  //     //   categories: menuData
  //     // },
  //     title: group.name
  //   }
  //   if (children.length === 0) {
  //     // formattedGroup.megaMenu = "MegaMenu2"
  //     formattedGroup.menuData = {
  //       categories: menuData
  //     }
  //   } else {
  //     // if (children.some(c => c.))
  //     // formattedGroup.megaMenu = "MegaMenu2"
  //     formattedGroup.menuData = menuData
  //   }
  //
  //   menuItems.push(formattedGroup)
  // }
  return menuItems;
  // return topGroups;
}
