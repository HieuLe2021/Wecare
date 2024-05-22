import type { ReactNode } from "react";
import Container from "@component/Container";
import Grid from "@component/grid/Grid";
import Sticky from "@component/sticky";

import Footer from "./_components/footer";
import { Header } from "./_components/header";
import { Sidebar } from "./_components/sidebar";
import { getCollections } from "./_components/sidebar/utils";
import { Topbar } from "./_components/topbar";
import { getAllProductGroups, getLevel1Nodes } from "./_utils/server";
import { StyledAppLayout } from "./styles";

export default async function Layout(props: { children: ReactNode }) {
  const { children } = props;
  const [allProductGroups, level1Nodes] = await Promise.all([
    getAllProductGroups(),
    getLevel1Nodes(),
  ]);

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
            <Sidebar collections={collections} />
          </Grid>
          <Grid item md={9} xs={12} className="!px-6 !py-0">
            <Topbar
              allProductGroups={allProductGroups}
              level1Nodes={level1Nodes}
            />
            <div>{children}</div>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </StyledAppLayout>
  );
}
