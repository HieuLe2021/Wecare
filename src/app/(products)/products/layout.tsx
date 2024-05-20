import { PropsWithChildren, ReactNode, Suspense } from "react";
import Container from "@component/Container";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import AppLayout from "@component/layout/layout-1";
import Sticky from "@component/sticky";
import Typography from "@component/Typography";
import { createClient } from "@lib/supabase/server";

import { Breadcrumb } from "../_components/breadcrumbs";
import Footer from "../_components/footer";
import { Header } from "../_components/header";
import { LeafCarousel } from "../_components/leaf-carousel";
import Navbar from "../_components/Navbar";
import { Sidebar } from "../_components/sidebar";
import { CollectionsSkeleton } from "../_components/sidebar/Skeleton";
import { getCollections } from "../_components/sidebar/utils";
import { Topbar } from "../_components/topbar";
import { StyledAppLayout } from "../styles";
import { getLeafNode } from "../utils";

// const Render = async ({ children, params }: PropsWithChildren) => {
//
//
//   return (
//
//   );
// };

export default async function Layout(props: {
  children: ReactNode;
  params: {
    level1Slug?: string;
  };
}) {
  const { children, params } = props;
  console.log("pppppp", props, params);
  const supabase = createClient();
  const resGroups = (await supabase.from("product_groups").select()).data ?? [];
  const collections = getCollections(resGroups);

  const groupId = !params.level1Slug ? null : params.level1Slug;
  const childNodes = await getLeafNode(groupId);
  // const childNodes = !params.level1Slug
  //   ? (
  //       await supabase
  //         .from("product_groups")
  //         .select()
  //         .eq("is_leaf", true)
  //         .order("pos", { ascending: true })
  //     ).data ?? []
  //   : (
  //       await supabase
  //         .from("menu_nodes")
  //         .select("*")
  //         .eq("id", params.level1Slug)
  //         .order("pos", { ascending: true })
  //     )?.data?.[0]?.child_nodes ?? [];

  // const childNodes = menuNodesQuery.data && menuNodesQuery.data[0]  && menuNodesQuery.data[0].child_nodes ?  menuNodesQuery.data[0].child_nodes : []
  // const childNodes = menuNodesQuery?.data?.[0]?.child_nodes ?? [];
  return (
    <>
      <StyledAppLayout>
        <Sticky fixedOn={0} scrollDistance={300}>
          <Header />
        </Sticky>

        {/* <div className="section-after-sticky"></div> */}

        {/* {!navbar ? <div className="section-after-sticky">{children}</div> : children} */}

        {/* <MobileNavigationBar /> */}

        <Container my="2rem">
          <Grid container spacing={6} className="lg:w-[1280px] lg:px-10">
            <Grid
              item
              md={3}
              xs={12}
              className="rounded-md bg-white"
              spacing={24}
            >
              <div className="flex items-center bg-blue-50 px-3 py-2 shadow-md">
                <Icon>categories</Icon>
                <Typography
                  ml="10px"
                  flex="1 1 0"
                  fontWeight="600"
                  textAlign="left"
                  // color="text.muted"
                >
                  Danh mục sản phẩm
                </Typography>
              </div>
              <Sidebar collections={collections} />
            </Grid>
            <Grid item md={9} xs={12}>
              <Topbar resGroups={resGroups} />
              <div className="relative mb-4 h-32 w-full">
                <div className="absolute inset-0 rounded-xl bg-white max-md:max-w-full max-sm:px-10">
                  <div className="flex w-full sm:px-2  md:px-12 lg:px-12">
                    <LeafCarousel
                      data={childNodes}
                      // customerId={customerId}
                      // groupId={groupId}
                    />
                  </div>
                </div>
              </div>
              {children}
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </StyledAppLayout>

      {/* <Render>{children}</Render> */}
    </>
  );
}
