import type { EmblaCarouselType } from "embla-carousel";
import type { PropsWithChildren } from "react";
import React, { useCallback, useEffect, useState } from "react";

import { clsm } from "~/components";

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

type PropType = PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    isActive?: boolean;
  }
>;

export const DotButton: React.FC<PropType> = (props) => {
  const { children, className, isActive, ...restProps } = props;

  return (
    <button
      type="button"
      className={clsm(
        "flex h-2.5 w-2.5 cursor-pointer touch-manipulation appearance-none rounded-full bg-gray-200 lg:h-3 lg:w-3",
        isActive && "bg-gray-700",
        className,
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};
