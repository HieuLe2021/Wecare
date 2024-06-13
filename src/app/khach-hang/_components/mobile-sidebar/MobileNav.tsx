import { Fragment, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Accordion, AccordionHeader } from "@component/accordion";
import Box from "@component/Box";
import Divider from "@component/Divider";
import Grid from "@component/grid/Grid";
import Scrollbar from "@component/Scrollbar";
import Typography from "@component/Typography";
import clsx from "clsx";

import type {
  Category,
  MenuItem,
} from "~/components/categories/mega-menu/type";
import type { Tables } from "~/lib/supabase/types";
import { Image } from "~/components/image";
import { getCollections } from "../sidebar/utils";
import MobileCategoryImageBox from "./MobileCategoryImageBox";
import { MobileCategoryNavStyle } from "./styles";

export const MobileNav = ({
  allProductGroups,
  menuNodes,
  customer,
  close,
}: {
  allProductGroups: Tables<"product_groups">[];
  menuNodes: Tables<"menu_nodes_matview">[];
  customer: Tables<"customers_matview"> | undefined;
  close: () => void;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const collections = getCollections(
    allProductGroups,
    menuNodes,
    searchParams.get("customer"),
    customer,
  );

  const pathnameArr = pathname.split("/");
  const selectedRootByPathname =
    collections.find((x) => x.href === pathnameArr.slice(0, 3).join("/")) ||
    collections[0];

  const [selectedRoot, setSelectedRoot] = useState(selectedRootByPathname);

  const initSubCollections = selectedRootByPathname
    ? selectedRootByPathname.menuComponent === "MegaMenu1"
      ? selectedRootByPathname.menuData.categories
      : selectedRootByPathname.menuData
    : [];
  const [subCategoryList, setSubCategoryList] =
    useState<Category[]>(initSubCollections);

  const handleCategoryClick = (root: MenuItem) => () => {
    setSubCategoryList(
      root.menuComponent === "MegaMenu1"
        ? root.menuData.categories
        : root.menuData,
    );
    // else setSubCategoryList([]);
    setSelectedRoot(root);
  };

  const level_2_with_children = subCategoryList.filter(
    (sc) => sc.subCategories.length > 0,
  );

  const level_2_without_children = subCategoryList.filter(
    (sc) => sc.subCategories.length === 0,
  );
  if (level_2_without_children.length > 0) {
    level_2_with_children.push({
      id: "danh-muc-khac",
      title: "Danh mục khác",
      href: "",
      imgUrl: "",
      icon: "",
      subCategories: level_2_without_children,
    });
  }
  return (
    <>
      <MobileCategoryNavStyle>
        <div className="main-category-holder">
          <Scrollbar>
            {collections.map((item) => (
              <div
                key={item.title}
                className={clsx({
                  "main-category-box": true,
                  active: selectedRoot?.id === item.id,
                })}
                onClick={handleCategoryClick(item)}
              >
                {item.icon && (
                  <Image alt="" src={item.icon} width={38} height={38} />
                )}

                <Typography
                  className="ellipsis"
                  textAlign="center"
                  fontSize="11px"
                  lineHeight="1"
                  height="25px"
                >
                  {item.title}
                </Typography>
              </div>
            ))}
          </Scrollbar>
        </div>

        <div className="container !left-[90px] right-0 w-auto bg-sky-50 !pt-0">
          {selectedRoot?.menuComponent === "MegaMenu1" ? (
            <>
              {level_2_with_children.map((item) => (
                <Fragment key={item.id}>
                  <Divider />
                  <Accordion
                    expanded={
                      (pathnameArr.length > 3 &&
                        item.href === pathnameArr.slice(0, 4).join("/")) ||
                      (pathnameArr.length < 4 && item.id === "danh-muc-khac")
                    }
                  >
                    <AccordionHeader px="0px" py="10px">
                      <Typography fontWeight="600" fontSize="15px">
                        <Link
                          href={item.href}
                          onClick={(e) => {
                            e.stopPropagation();
                            close();
                          }}
                        >
                          {item.title}
                        </Link>
                      </Typography>
                    </AccordionHeader>

                    <Box mb="1rem" mt="0">
                      <Grid container spacing={3}>
                        {item.subCategories.map((item, ind) => (
                          <Grid item lg={1} md={2} sm={4} xs={4} key={ind}>
                            <Link
                              href={item.href}
                              onClick={() => {
                                close();
                              }}
                            >
                              <MobileCategoryImageBox {...item} />
                            </Link>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Accordion>
                </Fragment>
              ))}

              {/* {level_2_without_children.length > 0 && ( */}
              {/*   <Box mb="2rem" mt="0.5rem"> */}
              {/*     <Typography fontWeight="600" fontSize="15px" mb="1rem"> */}
              {/*       Danh mục khác */}
              {/*     </Typography> */}
              {/*     <Grid container spacing={3}> */}
              {/*       {level_2_without_children.map((item, ind) => ( */}
              {/*         <Grid item lg={1} md={2} sm={4} xs={4} key={ind}> */}
              {/*           <Link href={item.href}> */}
              {/*             <MobileCategoryImageBox {...item} /> */}
              {/*           </Link> */}
              {/*         </Grid> */}
              {/*       ))} */}
              {/*     </Grid> */}
              {/*   </Box> */}
              {/* )} */}
            </>
          ) : (
            <Box mb="2rem">
              <Grid spacing={3}>
                {subCategoryList.map((item, ind) => (
                  <Grid item lg={1} md={2} sm={4} xs={4} key={ind}>
                    <Link href="/product/search/423423">
                      <MobileCategoryImageBox {...item} />
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </div>
      </MobileCategoryNavStyle>
    </>
  );
};
