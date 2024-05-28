"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import Box from "@component/Box";
import { IconButton } from "@component/buttons";
import Categories from "@component/categories/Categories";
import Container from "@component/Container";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import Image from "@component/Image";
import MiniCart from "@component/mini-cart";
import { SearchInputWithCategory } from "@component/search-box";
import Sidenav from "@component/sidenav/Sidenav";
import { Tiny } from "@component/Typography";
import { useAppContext } from "@context/app-context";
import Login from "@sections/auth/Login";

import { cn } from "~/utils";
import UserLoginDialog from "./LoginDialog";
import StyledHeader from "./styles";

// ====================================================================
type HeaderProps = { isFixed?: boolean; className?: string };
// =====================================================================

export default function Header({ isFixed, className }: HeaderProps) {
  const { state } = useAppContext();
  const [open, setOpen] = useState(false);
  const toggleSidenav = () => setOpen(!open);
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customer");
  const pathSplited = usePathname().split("/");

  const CART_HANDLE = (
    <Box ml="20px" position="relative">
      <IconButton bg="gray.200" p="12px" size="small">
        <Icon size="20px">bag</Icon>
      </IconButton>

      {!!state.cart.length && (
        <FlexBox
          top={-5}
          right={-5}
          height={20}
          minWidth={20}
          bg="primary.main"
          borderRadius="50%"
          alignItems="center"
          position="absolute"
          justifyContent="center"
        >
          <Tiny color="white" fontWeight="600" lineHeight={1}>
            {state.cart.length}
          </Tiny>
        </FlexBox>
      )}
    </Box>
  );

  const LOGIN_HANDLE = (
    <IconButton ml="1rem" bg="gray.200" p="8px">
      <Icon size="28px">user</Icon>
    </IconButton>
  );

  return (
    <StyledHeader
      className={cn(className, "bg-gray-500 shadow-lg shadow-gray-300/30")}
    >
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <FlexBox
          className="justify-center pb-4 lg:pb-0 lg:pl-[2.7rem] lg:pr-20"
          alignItems="center"
          mr="1rem"
        >
          <Link href="/danh-muc-san-pham" className="flex items-center">
            <Image src="/assets/images/logo.svg" alt="logo" />
            <h6 className="bg-gradient-to-r from-sky-400 to-sky-800 bg-clip-text pl-2 text-3xl font-bold leading-[30px] text-transparent">
              WECARE
            </h6>
          </Link>

          {isFixed && (
            <div className="category-holder">
              <Categories>
                <FlexBox color="text.hint" alignItems="center" ml="1rem">
                  <Icon>categories</Icon>
                  <Icon>arrow-down-filled</Icon>
                </FlexBox>
              </Categories>
            </div>
          )}
        </FlexBox>
        <FlexBox justifyContent="center" flex="1 1 0" className="px-3">
          <SearchInputWithCategory />
        </FlexBox>
        <FlexBox className="header-right" alignItems="center">
          <UserLoginDialog handle={LOGIN_HANDLE}>
            <div>
              <Login />
            </div>
          </UserLoginDialog>

          <Sidenav
            open={open}
            width={380}
            position="right"
            handle={CART_HANDLE}
            toggleSidenav={toggleSidenav}
          >
            <MiniCart toggleSidenav={toggleSidenav} />
          </Sidenav>
        </FlexBox>
      </Container>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-start"
        width="100%"
        className="mt-8 !hidden sm:block"
      >
        <Link
          href={""}
          className="pl-11 text-base font-medium text-sky-700 hover:text-blue-500"
        >
          TRANG CHỦ
        </Link>
        <Link
          href={
            pathSplited.slice(0, 2).join("/") +
            (customerId ? `?customer=${customerId}` : "")
          }
          className="pl-11 text-base font-medium text-sky-700 hover:text-blue-500"
        >
          SẢN PHẨM
        </Link>
        <Link
          href={""}
          className="pl-11 text-base font-medium text-sky-700 hover:text-blue-500"
        >
          VỀ CHÚNG TÔI
        </Link>
        <Link
          href={""}
          className="pl-11 text-base font-medium text-sky-700 hover:text-blue-500"
        >
          TIN TỨC
        </Link>
      </Container>
    </StyledHeader>
  );
}
