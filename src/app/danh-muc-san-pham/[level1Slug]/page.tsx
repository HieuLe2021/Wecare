import type { DefaultProductListContentProps } from "../_components/content";
import { Content } from "../_components/content";

export default async function Page({
  params,
  searchParams,
}: DefaultProductListContentProps) {
  return (
    <>
      <Content params={params} searchParams={searchParams} />
    </>
  );
}
