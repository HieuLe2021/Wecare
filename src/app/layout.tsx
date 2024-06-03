import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { AppProvider } from "@context/app-context";
import StyledContext from "@context/StyledContext";
import StyledComponentsRegistry from "@lib/registry";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./global.css";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wecare - Siêu thị công nghiệp",
  description:
    "Siêu thị công nghiệp Wecare cung cấp và phân phối hóa chất phục vụ đa ngành nghề. Wecare luôn nâng cao chất lượng sản phẩm và phong cách phục vụ chuyên nghiệp nhằm đáp ứng cao hơn nữa mức độ hài lòng của Quý khách hàng.",
  authors: [{ name: "Wecare", url: "https://wecare.com.vn/" }],
  keywords: ["e-commerce", "wecare", "bonik"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="mdl-js">
      <body className={openSans.className}>
        <StyledComponentsRegistry>
          <AppProvider>
            <StyledContext>{children}</StyledContext>
          </AppProvider>
        </StyledComponentsRegistry>
        <SpeedInsights />
      </body>
    </html>
  );
}
