"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "@component/Image";
import { cn } from "@utils";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { ChevronRight } from "lucide-react";

import type { MenuItem } from "~/components/categories/mega-menu/type";
import type { Tables } from "~/lib/supabase/types";
import Icon from "~/components/icon/Icon";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

export const Item = ({
  info,
  data,
  leafCount,
}: {
  info: MenuItem;
  data: NonNullable<Tables<"menu_nodes">["child_nodes"]>;
  leafCount: number;
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

    // delete page if exists
    params.delete("page");

    const query = params.toString();
    return currentPath + (query ? "?" + query : "");
  };

  return (
    <div className="bg mb-4 w-full rounded-md bg-transparent">
      <div className="flex items-end justify-between px-6 py-2 ">
        <div className="flex items-center">
          <Icon>{info.icon}</Icon>
          <p className="text-lg font-semibold">&nbsp; {info.title}</p>
          <p className="ml-1 text-base font-normal">({leafCount})</p>
        </div>
        <Link
          href={info.href}
          className="flex items-center text-xs text-blue-500 hover:text-blue-700"
        >
          Xem tất cả
          <ChevronRight />
        </Link>
      </div>
      <div className="relative h-40 w-full rounded-md bg-transparent">
        <div className="absolute left-4 right-4 top-[11px]">
          <div className="flex w-full bg-transparent  sm:px-2 md:px-12 lg:px-12">
            <Carousel
              opts={{
                align: "start",
                dragFree: true,
                loop: false,
              }}
              className="w-full bg-transparent"
              plugins={[WheelGesturesPlugin()]}
            >
              <CarouselContent>
                {data.map((item) => {
                  const isActive = item.slug && groupSlugs.includes(item.slug);
                  return (
                    <CarouselItem
                      key={item.slug}
                      className="bg-transparent md:basis-1/3 lg:basis-1/5"
                    >
                      <div
                        className={cn(
                          "p-1",
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
                          <div className="flex w-[125px] flex-col">
                            <div className="flex h-36 grow flex-col rounded-lg bg-white py-0.5 text-center text-xs font-medium leading-4 text-sky-700 max-md:mt-4">
                              {/* {isActive && (
                                <Image
                                  className="absolute right-0 top-0 z-10 h-5 w-5"
                                  src="/assets/images/wc-icon/check-tick.svg"
                                  alt="check-tick"
                                />
                              )} */}
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
                                  "mt-2",
                                  isActive
                                    ? "text-sm font-semibold text-sky-700"
                                    : "text-gray-400",
                                )}
                              >
                                {item.name}
                              </div>
                              <p className="  pt-2 text-red-500">
                                Đang cập nhật
                              </p>
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
