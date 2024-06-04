"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@utils";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import type { CarouselApi } from "~/components/ui/carousel";
import type { Tables } from "~/lib/supabase/types";
import { Image } from "~/components/image";
import { CardContent, CardRoot } from "~/components/shadcn/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  DotButton,
  useDotButton,
} from "~/components/ui/carousel";

export const LeafCarousel = ({
  data,
  leafCount,
}: {
  data: Tables<"menu_nodes_matview">["child_nodes"];
  leafCount: number;
}) => {
  const searchParams = useSearchParams();

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

    // delete page if exists
    params.delete("page");

    const query = params.toString();
    return currentPath + (query ? "?" + query : "");
  };

  const f = data.filter((x) => x.slug && groupSlugs.includes(x.slug))[0];
  const d = f ? data.findIndex((x) => x.id === f.id) : 0;
  const startIndex = d > 4 ? d - 4 : 0;

  const [api, setApi] = useState<CarouselApi>();
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api);

  return (
    <CardRoot className="mb-4 border-none">
      <CardContent>
        <div className="flex items-end justify-between">
          <p className="font-medium">{leafCount} nhóm sản phẩm</p>
          {groupSlugs.length > 0 && (
            <Link
              href={
                currentPath + searchParams.get("customer")
                  ? "?customer=" + searchParams.get("customer")
                  : ""
              }
              className="text-xs text-blue-500 hover:text-blue-700"
            >
              Xoá mục chọn
            </Link>
          )}
        </div>
        <div className="mt-1 flex w-full px-4 lg:px-12">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              dragFree: true,
              loop: false,
              startIndex,
              slidesToScroll: 3,
              breakpoints: {
                "(min-width: 1024px)": {
                  slidesToScroll: 5,
                },
              },
            }}
            className="w-full"
            plugins={[WheelGesturesPlugin()]}
          >
            <CarouselContent>
              {data.map((item) => {
                const isActive = item.slug && groupSlugs.includes(item.slug);
                return (
                  <CarouselItem
                    key={item.slug}
                    className="basis-1/3 lg:basis-1/5"
                  >
                    <Link
                      href={genSelectedGroupsPath(
                        item.slug,
                        groupSlugs,
                        currentPath,
                        searchParams,
                      )}
                      className={cn(
                        "group relative cursor-pointer rounded-md border border-transparent",
                        "flex h-full flex-col items-center px-2",
                        isActive ? "border-blue-500" : "text-gray-400",
                      )}
                    >
                      {isActive && (
                        <Image
                          className="absolute right-0.5 top-0.5 z-10"
                          src="/assets/images/wc-icon/check-tick.svg"
                          alt="check-tick"
                          width={20}
                          height={20}
                        />
                      )}
                      <div className="relative h-20 w-20 lg:h-24 lg:w-24 ">
                        <Image
                          loading="lazy"
                          src={item.image_url}
                          className="mt-2 aspect-[1.11] self-center object-cover lg:group-hover:scale-110"
                          alt={"Ảnh đại diện - " + item.name}
                          fill
                          sizes="96px"
                        />
                      </div>
                      <div
                        className={cn(
                          "mb-2 mt-2 line-clamp-2 text-center text-xs font-semibold lg:mt-2 lg:text-sm",
                          isActive ? "text-sky-700" : "text-gray-600",
                        )}
                      >
                        {item.name}
                      </div>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            {data.length > 0 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-1">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              isActive={index === selectedIndex}
            />
          ))}
        </div>
      </CardContent>
    </CardRoot>
  );
};
