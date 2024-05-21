import { ReactNode } from "react";
import Container from "@component/Container";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import Sticky from "@component/sticky";
import Typography from "@component/Typography";
import { createClient } from "@lib/supabase/server";

import Footer from "./_components/footer";
import { Header } from "./_components/header";
import { Sidebar } from "./_components/sidebar";
import { getCollections } from "./_components/sidebar/utils";
import { Topbar } from "./_components/topbar";
import { StyledAppLayout } from "./styles";
import { getAllProductGroups } from "./utils";

export default async function Layout(props: { children: ReactNode }) {
  const { children } = props;
  const allProductGroups = await getAllProductGroups();
  const collections = getCollections(allProductGroups);

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
              >
                Danh mục sản phẩm
              </Typography>
            </div>
            <Sidebar collections={collections} />
          </Grid>
          <Grid item md={9} xs={12}>
            {children}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </StyledAppLayout>
  );
}
