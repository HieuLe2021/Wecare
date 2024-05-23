import { Fragment, Suspense } from "react";

import type { DefaultProductListContentProps } from "./_components/content";
import { SwiperContainer, SwiperSlide } from "~/components/swiper";
import { Content } from "./_components/content";
import Loading from "./loading";

export default async function Page({
  params,
  searchParams,
}: DefaultProductListContentProps) {
  return (
    <Fragment key={Math.random()}>
      <SwiperContainer slidesPerView={5} mousewheel={true}>
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </SwiperContainer>
      <Suspense fallback={<Loading />}>
        <Content params={params} searchParams={searchParams} />
      </Suspense>
    </Fragment>
  );
}
