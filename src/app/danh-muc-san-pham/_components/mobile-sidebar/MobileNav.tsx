"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
}: {
  allProductGroups: Tables<"product_groups">[];
  menuNodes: Tables<"menu_nodes_matview">[];
  customer: Tables<"customers_matview"> | undefined;
}) => {
  const searchParams = useSearchParams();
  const collections = getCollections(
    allProductGroups,
    menuNodes,
    searchParams.get("customer"),
    customer,
  );
  const initCollections =
    collections.find((x) => x.href === searchParams.get("current")) ||
    collections[0];
  const [selectedCategory, setSelectedCategory] = useState(initCollections);

  const initSubCollections = initCollections
    ? initCollections.menuComponent === "MegaMenu1"
      ? initCollections.menuData.categories
      : initCollections.menuData
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
    setSelectedCategory(root);
  };

  return (
    <>
      <MobileCategoryNavStyle>
        <div className="main-category-holder mt-4">
          <Scrollbar>
            {collections.map((item) => (
              <div
                key={item.title}
                className={clsx({
                  "main-category-box": true,
                  active: selectedCategory?.id === item.id,
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

        <div className="container mt-2 w-[calc(100%-90px)]">
          {selectedCategory?.menuComponent === "MegaMenu1" ? (
            <>
              {subCategoryList
                .filter((sc) => sc.subCategories.length > 0)
                .map((item, ind) => (
                  <Fragment key={ind}>
                    <Divider />
                    <Accordion>
                      <AccordionHeader px="0px" py="10px">
                        <Typography fontWeight="600" fontSize="15px">
                          {item.title}
                        </Typography>
                      </AccordionHeader>

                      <Box mb="2rem" mt="0.5rem">
                        <Grid container spacing={3}>
                          {item.subCategories.map((item, ind) => (
                            <Grid item lg={1} md={2} sm={4} xs={4} key={ind}>
                              <Link href={item.href}>
                                <MobileCategoryImageBox {...item} />
                              </Link>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Accordion>
                  </Fragment>
                ))}

              <Box mb="2rem" mt="0.5rem">
                <Grid container spacing={3}>
                  {subCategoryList
                    .filter((sc) => sc.subCategories.length === 0)
                    .map((item, ind) => (
                      <Grid item lg={1} md={2} sm={4} xs={4} key={ind}>
                        <Link href={item.href}>
                          <MobileCategoryImageBox {...item} />
                        </Link>
                      </Grid>
                    ))}
                </Grid>
              </Box>
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
