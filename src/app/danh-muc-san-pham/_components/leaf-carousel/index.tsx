"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "@component/Image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";
import { cn } from "@utils";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import { Tables } from "~/lib/supabase/types";

export const LeafCarousel = ({
  data,
}: {
  data: NonNullable<Tables<"menu_nodes">["child_nodes"]>;
}) => {
  const searchParams = useSearchParams();
  // const currentChildId = searchParams.get("child");

  const currentPath = usePathname();
  const groupSlugs = searchParams.get("groups")?.split(",") ?? [];

  const genSelectedGroupsPath = (
    selectedGroupSlug: string,
    currentGroupSlugs: string[],
    currentPath: string,
    searchParams: URLSearchParams,
  ) => {
    let newGroupSlugs = [...currentGroupSlugs];
    if (newGroupSlugs.includes(selectedGroupSlug)) {
      newGroupSlugs = newGroupSlugs.filter((x) => x !== selectedGroupSlug);
    } else {
      newGroupSlugs.push(selectedGroupSlug);
    }
    const params = new URLSearchParams(searchParams.toString());
    if (newGroupSlugs.length === 0) {
      params.delete("groups");
    } else {
      params.set("groups", newGroupSlugs.join(","));
    }
    const query = params.toString();
    return currentPath + (query ? "?" + query : "");
  };

  const onWheelHandler = (e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  };
  useEffect(() => {
    return () => {
      return window.removeEventListener("wheel", onWheelHandler);
    };
  }, [searchParams]);

  return (
    <Carousel
      opts={{
        align: "start",
        dragFree: true,
        loop: false,
      }}
      className="w-full"
      plugins={[WheelGesturesPlugin()]}
      onMouseEnter={() => {
        window.addEventListener("wheel", onWheelHandler, { passive: false });
      }}
      onMouseLeave={() => {
        window.removeEventListener("wheel", onWheelHandler);
      }}
    >
      <CarouselContent>
        {data.map((item) => {
          const isActive = item.slug && groupSlugs.includes(item.slug);
          return (
            <CarouselItem
              key={item.slug}
              className={cn(
                "group relative mb-1 mr-1 basis-1/2 cursor-pointer rounded-md border border-transparent pt-2 hover:border-blue-500 md:basis-1/3 lg:basis-1/5",
                isActive ? "border-blue-500" : "text-gray-400",
              )}
            >
              <Link
                href={genSelectedGroupsPath(
                  item.slug!,
                  groupSlugs,
                  currentPath,
                  searchParams,
                )}
                className="flex justify-center"
              >
                <div className="flex w-[125px] flex-col">
                  <div className="flex grow flex-col bg-white py-0.5 text-center text-xs font-medium leading-4 text-sky-700 max-md:mt-4">
                    {isActive && (
                      <Image
                        className="absolute right-0 top-0 h-5 w-5"
                        src="/assets/images/wc-icon/check-tick.svg"
                        alt="check-tick"
                      />
                    )}
                    <img
                      loading="lazy"
                      srcSet={
                        item?.image_url
                          ? item.image_url
                          : "https://placehold.co/400"
                      }
                      className="aspect-[1.11] h-[80px] w-[80px] self-center object-cover pt-1 group-hover:scale-125"
                    />
                    <div
                      className={cn(
                        "mt-2",
                        isActive
                          ? "text-sm font-semibold text-sky-700"
                          : "text-gray-400",
                      )}
                    >
                      {item.name}
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
