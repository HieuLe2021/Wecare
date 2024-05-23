import React, { ReactNode, RefObject, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { register } from "swiper/element/bundle";
import { Swiper } from "swiper/types";

import { cn } from "~/utils";
import { Button } from "../ui/button";

type SwiperRef = RefObject<Swiper & { initialize: () => void }>;
type SwiperContextProps = {
  swiperRef: SwiperRef;
  slideNext?: () => void;
  slidePrev?: () => void;
  isBeginning?: boolean;
  isEnd?: boolean;
  direction?: "vertical" | "horizontal";
};

const SwiperContext = React.createContext<SwiperContextProps | null>(null);

function useSwiper() {
  const context = React.useContext(SwiperContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

type SwiperContainerProps = {
  children: ReactNode;
  freeMode?: boolean;
  keyboard?: boolean;
  mousewheel?:
    | boolean
    | {
        releaseOnEdges?: boolean;
        sensitivity?: number;
      };
  navigation?:
    | boolean
    | {
        nextEl?: string | HTMLElement;
        prevEl?: string | HTMLElement;
      };
  pagination?: boolean;
  spaceBetween?: number;
  slidesPerView?: number;
  direction?: "vertical" | "horizontal";
};
const SwiperRoot = (props: SwiperContainerProps) => {
  const swiperRef = useRef<Swiper & { initialize: () => void }>(null);
  // const swiperRef = useRef<HTMLElement & SwiperEvents & { initialize: () => void }>(null);
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
    <SwiperContext.Provider
      value={{
        swiperRef: swiperRef,
        isBeginning: swiperRef.current?.isBeginning,
        isEnd: swiperRef.current?.isEnd,
        direction: props.direction ?? "horizontal",
        slideNext: () => swiperRef.current?.slideNext(),
        slidePrev: () => swiperRef.current?.slidePrev(),
      }}
    >
      {children}
    </SwiperContext.Provider>
  );
};

const SwiperContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { swiperRef } = useSwiper();

  return <swiper-container init={false} ref={swiperRef} {...props} />;
});
SwiperContent.displayName = "SwiperContent";

type SwiperSlideProps = {
  children: ReactNode;
};
export function SwiperSlide(props: SwiperSlideProps) {
  const { children, ...rest } = props;

  return <swiper-slide {...rest}>{children}</swiper-slide>;
}

const SwiperPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { slidePrev, isBeginning, direction } = useSwiper();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute  h-8 w-8 rounded-full",
        direction === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={isBeginning}
      onClick={slidePrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
SwiperPrevious.displayName = "SwiperPrevious";

const SwiperNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { direction, isEnd, slideNext } = useSwiper();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        direction === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!isEnd}
      onClick={slideNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
SwiperNext.displayName = "SwiperNext";

export { SwiperRoot, SwiperContent, SwiperPrevious, SwiperNext };
