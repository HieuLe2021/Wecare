import { ReactNode, useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";

// register();

type SwiperContainerProps = {
  children: ReactNode;
  freeMode?: boolean;
  mousewheel?:
    | boolean
    | {
        releaseOnEdges?: boolean;
        sensitivity?: number;
      };
  pagination?: boolean;
  spaceBetween?: number;
  slidesPerView?: number;
};
export const SwiperContainer = (props: SwiperContainerProps) => {
  const swiperRef = useRef<HTMLElement & { initialize: () => void }>(null);
  const { children, ...rest } = props;

  useEffect(() => {
    if (swiperRef.current) {
      // Register Swiper web component
      register();

      // pass component props to parameters
      const params = {
        // "mousewheel": props.mousewheel,
        // "pagination": props.pagination,
        // "space-between": props.spaceBetween,
        // "slides-per-view": props.slidesPerView,
        // on: {
        //   slideChange: () => console.log("slide changed"),
        //   progress: (s, progress) => console.log(`progress is ${progress}`),
        // },
        ...rest,
      };

      // Assign it to swiper element
      Object.assign(swiperRef.current, params);
      console.log("ppppp", params, swiperRef.current);

      // initialize swiper
      swiperRef.current.initialize();
    }
  }, []);

  return (
    <swiper-container init={false} ref={swiperRef}>
      {children}
    </swiper-container>
  );
};

type SwiperSlideProps = {
  children: ReactNode;
};
export function SwiperSlide(props: SwiperSlideProps) {
  const { children, ...rest } = props;

  return <swiper-slide {...rest}>{children}</swiper-slide>;
}
