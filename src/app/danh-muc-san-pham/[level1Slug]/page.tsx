import { Fragment, Suspense } from "react";
import { headers } from "next/headers";

import type { DefaultProductListContentProps } from "../_components/content";
import { Content } from "../_components/content";
import Loading from "../loading";

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
