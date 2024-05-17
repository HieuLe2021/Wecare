import { PropsWithChildren, Suspense } from "react";
import Container from "@component/Container";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import AppLayout from "@component/layout/layout-1";
import Sticky from "@component/sticky";
import Typography from "@component/Typography";
import { createClient } from "@lib/supabase/server";

import { Breadcrumb } from "./_components/breadcrumbs";
import Footer from "./_components/footer";
import { Header } from "./_components/header";
import Navbar from "./_components/Navbar";
import { Sidebar } from "./_components/sidebar";
import { CollectionsSkeleton } from "./_components/sidebar/Skeleton";
import { getCollections } from "./_components/sidebar/utils";
import BreadcrumbsPd from "./products/_components/breadcrumbsPd";
import { StyledAppLayout } from "./styles";

const Render = async ({ children }: PropsWithChildren) => {
  const supabase = createClient();
  const resGroups = (await supabase.from("product_groups").select()).data ?? [];
  const collections = getCollections(resGroups);

  return (
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
            <BreadcrumbsPd resGroups={resGroups} />
            {children}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </StyledAppLayout>
  );
};

export default function Layout({ children }) {
  return (
    <Suspense
      fallback={
        <Container my="2rem">
          <Grid container spacing={6}>
            <Grid
              item
              md={3}
              xs={12}
              className="rounded-md bg-white"
              spacing={24}
            >
              {/* <div className="flex items-center bg-blue-50 px-6 py-2 shadow-md">
                <Icon>categories</Icon>
                <Typography
                  ml="10px"
                  flex="1 1 0"
                  fontWeight="600"
                  textAlign="left"
                  color="text.muted"
                >
                  Categories
                </Typography>
              </div> */}
              <CollectionsSkeleton />
              {/* <Sidebar menuItems={menuItems} x={sidebarGroups} z={productGroups.data} /> */}
            </Grid>
            <Grid item md={9} xs={12}>
              <CollectionsSkeleton />
              {/* <Breadcrumb data={path} customerId={customerId} params={params} /> */}

              {/* {children} */}
            </Grid>
          </Grid>
        </Container>
      }
    >
      <Render>{children}</Render>
    </Suspense>
  );
}
