import type { ReactNode } from "react";
import Container from "@component/Container";
import Grid from "@component/grid/Grid";
import Sticky from "@component/sticky";

import MobileNavigationBar from "~/components/mobile-navigation";
import Footer from "./_components/footer";
import { Header } from "./_components/header";
import { MobileNavigationBar } from "./_components/mobile-navigation";
import { Sidebar } from "./_components/sidebar";
import { Topbar } from "./_components/topbar";
import { getAllProductGroups, getMenuNodes } from "./_utils/server";
import { StyledAppLayout } from "./styles";

export default async function Layout(props: { children: ReactNode }) {
  const { children } = props;
  const [allProductGroups, menuNodes] = await Promise.all([
    getAllProductGroups(),
    getMenuNodes(),
  ]);

  return (
    <StyledAppLayout>
      <Sticky fixedOn={0} scrollDistance={300}>
        <Header />
      </Sticky>

      {/* <div className="section-after-sticky"></div> */}

      {/* {!navbar ? <div className="section-after-sticky">{children}</div> : children} */}

      <MobileNavigationBar />

      <Container my="2rem">
        <Grid container spacing={6} className="lg:w-[1280px] lg:px-10">
          <Grid
            item
            md={3}
            xs={12}
            className="hidden rounded-md bg-white sm:block"
            spacing={24}
          >
            <Sidebar
              allProductGroups={allProductGroups}
              menuNodes={menuNodes}
            />
          </Grid>
          <Grid item md={9} xs={12} className="!px-3 !py-0 md:!px-6">
            <Topbar allProductGroups={allProductGroups} menuNodes={menuNodes} />
            <div>{children}</div>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </StyledAppLayout>
  );
}
