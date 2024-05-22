import { Fragment, Suspense } from "react";

import type { DefaultProductListContentProps } from "./_components/content";
import { Content } from "./_components/content";
import Loading from "./loading";

export default async function Page({
  params,
  searchParams,
}: DefaultProductListContentProps) {
  return (
    <Fragment key={Math.random()}>
      <Suspense fallback={<Loading />}>
        <Content params={params} searchParams={searchParams} />
      </Suspense>
    </Fragment>
  );
}
