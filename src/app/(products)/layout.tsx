import { PropsWithChildren } from "react";
import AppLayout from "@component/layout/layout-1";
import Sticky from "@component/sticky";
import Navbar from "./_components/Navbar";
import Container from "@component/Container";
import { StyledAppLayout } from "./styles";
import Sidebar from "./_components/Sidebar";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import Typography from "@component/Typography";
// import Collections from "./_components/Collections";
import { Header } from "./_components/header";

export default function Layout({ children }: PropsWithChildren) {
  return <StyledAppLayout>
    <Sticky fixedOn={0} scrollDistance={300}>
      <Header />
    </Sticky>

    {/* <div className="section-after-sticky"></div> */}

    {/* {!navbar ? <div className="section-after-sticky">{children}</div> : children} */}

    {/* <MobileNavigationBar /> */}

    {/* <Footer1 /> */}
    <Container my="2rem">
      <Grid container spacing={6} className="w-[1280px] px-10">
        <Grid item md={3} xs={12} className="bg-white rounded-md" spacing={24}>
          <div className="flex items-center py-2 px-6 bg-blue-50 shadow-md">
            <Icon>categories</Icon>
            <Typography ml="10px" flex="1 1 0" fontWeight="600" textAlign="left" color="text.muted">
              Categories
            </Typography>
          </div>
          {/* <Collections /> */}
          {/* <Sidebar menuItems={menuItems} x={sidebarGroups} z={productGroups.data} /> */}
        </Grid>
      {children}
      </Grid>
    </Container>

  </StyledAppLayout>
}


