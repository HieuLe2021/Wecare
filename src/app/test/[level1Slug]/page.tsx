import { Fragment, Suspense } from "react";
import { headers } from "next/headers";

import type { DefaultProductListContentProps } from "../../danh-muc-san-pham/_components/content";
import { Content } from "../../danh-muc-san-pham/_components/content";
import Loading from "../../danh-muc-san-pham/loading";

export default async function Page({
  params,
  searchParams,
}: DefaultProductListContentProps) {
  const heads = headers();
  console.log("xxx", heads.get("referer"));
  return (
    <Fragment key={Math.random()}>
      <Suspense fallback={<Loading />}>
        <Content params={params} searchParams={searchParams} />
      </Suspense>
    </Fragment>
  );
}
