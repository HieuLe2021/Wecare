"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Accordion, AccordionHeader } from "@component/accordion";
import Box from "@component/Box";
import Divider from "@component/Divider";
import Grid from "@component/grid/Grid";
import Scrollbar from "@component/Scrollbar";
import Typography from "@component/Typography";
import navigations from "@data/navigations";
import useWindowSize from "@hook/useWindowSize";
import clsx from "clsx";

import type { Tables } from "~/lib/supabase/types";
import { Image } from "~/components/image";
import Header from "../danh-muc-san-pham/_components/header/Header";
import { MobileNavigationBar } from "../danh-muc-san-pham/_components/mobile-navigation";
import { getCollections } from "../danh-muc-san-pham/_components/sidebar/utils";
import MobileCategoryImageBox from "./MobileCategoryImageBox";
import { MobileCategoryNavStyle } from "./styles";

// GLOBAL CUSTOM COMPONENTS

// CUSTOM HOOK

// ==============================================================
interface Suggestion {
  href: string;
  title: string;
  imgUrl: string;
}
// ==============================================================

export default function MobileCategoryNav({
  allProductGroups,
  menuNodes,
  customer,
}: {
  allProductGroups: Tables<"product_groups">[];
  menuNodes: Tables<"menu_nodes_matview">[];
  customer: Tables<"customers_matview"> | undefined;
}) {
  const width = useWindowSize();
  const [category, setCategory] = useState<any>(navigations[0]);
  const [suggestedList, setSuggestedList] = useState<Suggestion[]>([]);
  const [subCategoryList, setSubCategoryList] = useState<any[]>([]);

  const handleCategoryClick = (cat: any) => () => {
    let menuData = cat.menuData;
    if (menuData) setSubCategoryList(menuData.categories || menuData);
    else setSubCategoryList([]);
    setCategory(cat);
  };

  useEffect(() => setSuggestedList(suggestion), []);

  // HIDDEN IN LARGE DEVICE
  if (width && width > 900) return null;

  //
  const searchParams = useSearchParams();
  const collections = getCollections(
    allProductGroups,
    menuNodes,
    searchParams.get("customer"),
    customer,
  );

  return (
    <MobileCategoryNavStyle>
      <Header className="header" />

      <div className="main-category-holder mt-4">
        <Scrollbar>
          {collections.map((item) => (
            <div
              key={item.title}
              className={clsx({
                "main-category-box": true,
                active: category?.href === item.href,
              })}
              onClick={handleCategoryClick(item)}
              // borderLeft={`${category?.href === item.href ? "3" : "0"}px solid`}
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
        {category?.menuComponent === "MegaMenu1" ? (
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
                        {item.subCategories?.map((item: any, ind: number) => (
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

      <MobileNavigationBar />
    </MobileCategoryNavStyle>
  );
}

const suggestion = [
  {
    title: "Belt",
    href: "/belt",
    imgUrl: "/assets/images/products/categories/belt.png",
  },
  {
    title: "Hat",
    href: "/Hat",
    imgUrl: "/assets/images/products/categories/hat.png",
  },
  {
    title: "Watches",
    href: "/Watches",
    imgUrl: "/assets/images/products/categories/watch.png",
  },
  {
    title: "Sunglasses",
    href: "/Sunglasses",
    imgUrl: "/assets/images/products/categories/sunglass.png",
  },
  {
    title: "Sneakers",
    href: "/Sneakers",
    imgUrl: "/assets/images/products/categories/sneaker.png",
  },
  {
    title: "Sandals",
    href: "/Sandals",
    imgUrl: "/assets/images/products/categories/sandal.png",
  },
  {
    title: "Formal",
    href: "/Formal",
    imgUrl: "/assets/images/products/categories/shirt.png",
  },
  {
    title: "Casual",
    href: "/Casual",
    imgUrl: "/assets/images/products/categories/t-shirt.png",
  },
];
