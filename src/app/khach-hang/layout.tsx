import type {ReactNode} from "react";
import {headers} from "next/headers";
import Container from "@component/Container";
import Grid from "@component/grid/Grid";
import Sticky from "@component/sticky";

import Footer from "./_components/footer";
import {Header} from "./_components/header";
import {MobileNavigationBar} from "./_components/mobile-navigation";
import {getAllProductGroups, getCustomer, getMenuNodes,} from "./_utils/server";
import {StyledAppLayout} from "./styles";

export default async function Layout(props: { children: ReactNode }) {
  const { children } = props;
  const customerId = new URLSearchParams(
    headers().get("x-url")?.split("?").at(-1),
  ).get("customer");
  const [allProductGroups, menuNodes, customer] = await Promise.all([
    getAllProductGroups(),
    getMenuNodes(),
    customerId ? getCustomer(customerId) : undefined,
  ]);

  return (
    <StyledAppLayout>
      <Sticky fixedOn={0} scrollDistance={300}>
        <Header
          allProductGroups={allProductGroups}
          menuNodes={menuNodes}
          customer={customer}
        />
      </Sticky>

      <MobileNavigationBar />

      <Container
        my="2rem"
        className="flex min-h-[calc(100vh-428px-112px-64px)] flex-col"
      >
        <Grid container spacing={6} className="lg:w-[1280px] lg:px-10">
          <Grid
            item
            md={12}
            xs={25}
            className="xl:!w-4/4 !w-full !px-3 !py-0 lg:!w-[1280px] lg:!px-6"
          >
            <div>{children}</div>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </StyledAppLayout>
  );
}
