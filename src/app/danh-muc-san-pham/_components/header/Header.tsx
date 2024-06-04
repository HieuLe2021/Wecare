"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Box from "@component/Box";
import Container from "@component/Container";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import { SearchInputWithCategory } from "@component/search-box";
import { Tiny } from "@component/Typography";
import { useAppContext } from "@context/app-context";
import Login from "@sections/auth/Login";

import type { Tables } from "~/lib/supabase/types";
import { IconButton } from "~/components/buttons";
import { Image } from "~/components/image";
import { Link } from "~/components/link";
import { Button } from "~/components/shadcn/button";
import { cn } from "~/utils";
import { MobileSidebar } from "../mobile-sidebar";
import UserLoginDialog from "./LoginDialog";
import StyledHeader from "./styles";

type HeaderProps = {
  className?: string;
  allProductGroups: Tables<"product_groups">[];
  menuNodes: Tables<"menu_nodes_matview">[];
  customer: Tables<"customers_matview"> | undefined;
};

export default function Header({
  className,
  allProductGroups,
  menuNodes,
  customer,
}: HeaderProps) {
  const { state } = useAppContext();
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customer");
  const pathSplited = usePathname().split("/");

  const CART_HANDLE = (
    <Box ml="20px" position="relative">
      <IconButton bg="gray.200" p="12px">
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
      <Icon className="ml-[2px]" size="28px">
        user
      </Icon>
    </IconButton>
  );

  return (
    <StyledHeader
      className={cn(
        className,
        "!h-auto !bg-white !py-4 shadow-lg shadow-gray-300/30 lg:!bg-white",
      )}
    >
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <div className="flex items-center px-4 pb-2">
          <MobileSidebar
            allProductGroups={allProductGroups}
            menuNodes={menuNodes}
            customer={customer}
          />
          <FlexBox
            className="!hidden justify-center pb-4 lg:!flex lg:pb-0 lg:pl-[2.7rem] lg:pr-20"
            alignItems="center"
            mr="1rem"
          >
            <Link href="/danh-muc-san-pham" className="flex items-center">
              <Image
                src="/assets/images/logo.svg"
                alt="logo"
                width={40}
                height={40}
              />
              <h6 className="bg-gradient-to-r from-sky-400 to-sky-800 bg-clip-text pl-2 text-3xl font-bold leading-[30px] text-transparent">
                WECARE
              </h6>
            </Link>
          </FlexBox>
          <FlexBox
            justifyContent="center"
            flex="1 1 0"
            className="w-[780px] bg-white px-3 lg:!bg-white"
          >
            <SearchInputWithCategory />
          </FlexBox>
          <FlexBox className="header-right" alignItems="center">
            <UserLoginDialog handle={LOGIN_HANDLE}>
              <div>
                <Login />
              </div>
            </UserLoginDialog>

            {CART_HANDLE}
          </FlexBox>

          <Button
            variant="outline"
            shape="icon"
            size="lg"
            className="lg:hidden"
            aria-label="Cart"
          >
            <Icon>bag</Icon>
            <span className="sr-only">Cart</span>
          </Button>
        </div>
        <div className="mt-1 text-center lg:hidden">
          <span className="text-lg font-semibold">{customer?.name}</span>
        </div>
      </Container>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-start"
        width="100%"
        className="mt-6 !hidden lg:!flex"
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
