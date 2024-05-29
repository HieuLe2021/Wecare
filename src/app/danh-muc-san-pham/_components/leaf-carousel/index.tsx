"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "@component/Image";
import { cn } from "@utils";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import type { Tables } from "~/lib/supabase/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

export const LeafCarousel = ({
  data,
  leafCount,
}: {
  data: NonNullable<Tables<"menu_nodes">["child_nodes"]>;
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

  return (
    <div className="mb-4 w-full rounded-md bg-white">
      <div className="flex items-end justify-between px-6 py-2">
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
      <div className="relative h-44 w-full rounded-md bg-white">
        <div className="absolute left-4 right-4 top-[11px]">
          <div className="flex w-full sm:px-2  md:px-12 lg:px-12">
            <Carousel
              opts={{
                align: "start",
                dragFree: true,
                loop: false,
                startIndex,
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
                      className="basis-1/2 md:basis-1/3 lg:basis-1/5"
                    >
                      <div
                        className={cn(
                          "min-h-[138px] min-w-[138px] p-1",
                          "group relative cursor-pointer rounded-md border border-transparent",
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
                          <div className="flex flex-col">
                            <div className="flex grow flex-col bg-white text-center text-xs font-medium leading-4 text-sky-700 max-md:mt-4">
                              {isActive && (
                                <Image
                                  className="absolute right-0 top-0 z-10 h-5 w-5"
                                  src="/assets/images/wc-icon/check-tick.svg"
                                  alt="check-tick"
                                />
                              )}
                              <Image
                                loading="lazy"
                                srcSet={
                                  item.image_url
                                    ? item.image_url
                                    : "https://placehold.co/400"
                                }
                                className="aspect-[1.11] h-[80px] w-[80px] self-center object-cover pt-1 group-hover:scale-110"
                              />
                              <div
                                className={cn(
                                  "mt-2 font-semibold",
                                  isActive
                                    ? "text-sm text-sky-700"
                                    : "text-gray-600",
                                )}
                              >
                                {item.name}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
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
        </div>
      </div>
    </div>
  );
};
