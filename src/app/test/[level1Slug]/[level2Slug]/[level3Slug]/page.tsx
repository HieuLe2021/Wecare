import { Fragment, Suspense } from "react";

import type { DefaultProductListContentProps } from "../../../../danh-muc-san-pham/_components/content";
import { Content } from "../../../../danh-muc-san-pham/_components/content";
import Loading from "../../../../danh-muc-san-pham/loading";

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
