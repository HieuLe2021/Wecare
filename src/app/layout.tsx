import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Open_Sans } from "next/font/google";
import { AppProvider } from "@context/app-context";
import StyledContext from "@context/StyledContext";
import StyledComponentsRegistry from "@lib/registry";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./global.css";

import { headers } from "next/headers";
import Container from "@component/Container";
import Sticky from "@component/sticky";

import { Header } from "../components/header";
import Footer from "./kho-van/_components/footer";
import {
  getAllProductGroups,
  getCustomer,
  getMenuNodes,
} from "./kho-van/_utils/server";
import { StyledAppLayout } from "./styles";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wecare - Siêu thị công nghiệp",
  description:
    "Siêu thị công nghiệp Wecare cung cấp và phân phối hóa chất phục vụ đa ngành nghề. Wecare luôn nâng cao chất lượng sản phẩm và phong cách phục vụ chuyên nghiệp nhằm đáp ứng cao hơn nữa mức độ hài lòng của Quý khách hàng.",
  authors: [{ name: "Wecare", url: "https://wecare.com.vn/" }],
  keywords: ["e-commerce", "wecare", "bonik"],
};

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
    <html lang="en" className="mdl-js">
      <body className={openSans.className}>
        {/* <StyledComponentsRegistry>
          <AppProvider>
            <StyledContext>{children}</StyledContext>
          </AppProvider>
        </StyledComponentsRegistry>
        <SpeedInsights />
        <Analytics/> */}
        <StyledContext>{children}</StyledContext>

        <div className="relative mx-auto mt-8 box-border flex w-4/5 shrink-0 flex-col pb-8">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex w-6/12 flex-col max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                sizes="(max-width: 638px) 81vw, 56vw"
                srcSet="https://cdn.builder.io/api/v1/image/assets%2F89d6bbb44070475d9580fd22f21ef8f1%2F1ab2f86b7c5447ad9b99cb039165c15e?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2F89d6bbb44070475d9580fd22f21ef8f1%2F1ab2f86b7c5447ad9b99cb039165c15e?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2F89d6bbb44070475d9580fd22f21ef8f1%2F1ab2f86b7c5447ad9b99cb039165c15e?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2F89d6bbb44070475d9580fd22f21ef8f1%2F1ab2f86b7c5447ad9b99cb039165c15e?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2F89d6bbb44070475d9580fd22f21ef8f1%2F1ab2f86b7c5447ad9b99cb039165c15e?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2F89d6bbb44070475d9580fd22f21ef8f1%2F1ab2f86b7c5447ad9b99cb039165c15e?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2F89d6bbb44070475d9580fd22f21ef8f1%2F1ab2f86b7c5447ad9b99cb039165c15e?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2F89d6bbb44070475d9580fd22f21ef8f1%2F1ab2f86b7c5447ad9b99cb039165c15e?width=799 799w, https://cdn.builder.io/api/v1/image/assets%2F89d6bbb44070475d9580fd22f21ef8f1%2F1ab2f86b7c5447ad9b99cb039165c15e?width=511 511w, https://cdn.builder.io/api/v1/image/assets%2F89d6bbb44070475d9580fd22f21ef8f1%2F1ab2f86b7c5447ad9b99cb039165c15e?width=780 780w"
                className="-mt-px aspect-[1.02] h-auto min-h-[20px] w-full min-w-[20px] shrink-0 overflow-hidden object-cover text-center"
              />
            </div>
            <div className="ml-5 flex w-6/12 flex-col max-md:ml-0 max-md:w-full">
              <div className="relative mt-5 box-border h-auto shrink-0 text-left text-3xl font-medium">
                <p>Wecare Group</p>
              </div>
              <div className="relative mt-1.5 h-auto shrink-0 text-left leading-8 max-sm:text-sm">
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                  dolor sit amet, consectetur, adipisci velit, sed quia non
                  numquam eius modi tempora incidunt ut labore et dolore magnam
                  aliquam quaerat voluptatem.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
