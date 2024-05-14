import { PropsWithChildren } from "react";
import AppLayout from "@component/layout/layout-1";
import Sticky from "@component/sticky";
import { Header } from "@component/header";
import Navbar from "./_components/Navbar";
import Container from "@component/Container";
import { StyledAppLayout } from "./styles";
import Sidebar from "./_components/Sidebar";

export default function Layout({ children }: PropsWithChildren) {
  return <StyledAppLayout>


    {/* <Sticky fixedOn={0} scrollDistance={300}> */}
    {/*   <Header /> */}
    {/* </Sticky> */}

    {/* <div className="section-after-sticky"></div> */}

    {/* {!navbar ? <div className="section-after-sticky">{children}</div> : children} */}

    {/* <MobileNavigationBar /> */}

    {/* <Footer1 /> */}
    <Container my="2rem">
      {/* <Navbar /> */}
      {children}
    </Container>
  </StyledAppLayout>
}


