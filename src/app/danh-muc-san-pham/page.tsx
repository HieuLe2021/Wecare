import { Fragment, Suspense } from "react";

import type { DefaultProductListContentProps } from "./_components/content";
import { Content } from "./_components/content";
import { ListCarousel } from "./_components/list-carousel";
import Loading from "./[...slug]/_components/loading";

export default async function Page({
  params,
  searchParams,
}: DefaultProductListContentProps) {
  return (
    <Fragment key={Math.random()}>
      <Suspense fallback={<Loading />}>
        {searchParams.customer ? (
          <Content params={params} searchParams={searchParams} />
        ) : (
          <ListCarousel params={params} searchParams={searchParams} />
        )}
      </Suspense>
    </Fragment>
  );
}
