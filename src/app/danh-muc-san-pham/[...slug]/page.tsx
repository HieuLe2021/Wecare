import { Fragment } from "react";

import type { DefaultProductListContentProps } from "../_components/content";
import { Content } from "../_components/content";

export default async function Page({
  params,
  searchParams,
}: DefaultProductListContentProps) {
  return (
    <Fragment key={Math.random()}>
      <Content params={params} searchParams={searchParams} />
    </Fragment>
  );
}
