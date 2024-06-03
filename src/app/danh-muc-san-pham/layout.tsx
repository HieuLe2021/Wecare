import type { ReactNode } from "react";
import { headers } from "next/headers";
import Container from "@component/Container";
import Grid from "@component/grid/Grid";
import Sticky from "@component/sticky";

import Footer from "./_components/footer";
import { Header } from "./_components/header";
import { MobileNavigationBar } from "./_components/mobile-navigation";
import { Sidebar } from "./_components/sidebar";
import { Topbar } from "./_components/topbar";
import {
  getAllProductGroups,
  getCustomer,
  getMenuNodes,
} from "./_utils/server";
import { StyledAppLayout } from "./styles";

export default async function Layout(props: { children: ReactNode }) {
  const { children } = props;
  const customerId = new URLSearchParams(
    headers().get("x-url")?.split("?").at(-1),
  ).get("customer");
  // const start = performance.now();
  const [allProductGroups, menuNodes, customer] = await Promise.all([
    getAllProductGroups(),
    getMenuNodes(),
    customerId ? getCustomer(customerId) : undefined,
  ]);
  // const end = performance.now();
  // console.log(`Execution time: ${end - start} ms`);

  return (
    <StyledAppLayout>
      <Sticky fixedOn={0} scrollDistance={300}>
        <Header
          allProductGroups={allProductGroups}
          menuNodes={menuNodes}
          customer={customer}
        />
      </Sticky>

      {/* <div className="section-after-sticky"></div> */}

      {/* {!navbar ? <div className="section-after-sticky">{children}</div> : children} */}

      <MobileNavigationBar />

      <Container my="2rem" className="flex min-h-screen flex-col">
        <Grid container spacing={6} className="lg:w-[1280px] lg:px-10">
          <Grid
            item
            md={3}
            xs={12}
            className="hidden rounded-md bg-white lg:block"
            spacing={24}
          >
            <Sidebar
              allProductGroups={allProductGroups}
              menuNodes={menuNodes}
              customer={customer}
            />
          </Grid>
          <Grid item md={9} xs={12} className="!w-full !px-3 !py-0 lg:!px-6">
            <Topbar
              allProductGroups={allProductGroups}
              menuNodes={menuNodes}
              customer={customer}
            />
            <div>{children}</div>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </StyledAppLayout>
  );
}
