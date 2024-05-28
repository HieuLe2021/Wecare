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
  const currentPath = usePathname();

  return (
    <div className="mb-4 w-full rounded-md bg-transparent px-2">
      <div className="flex items-end justify-between pt-4 md:px-6">
        <Link href={info.href} className="flex items-center">
          <Image alt="" src={info.icon} width={24} height={24} />
          <p className="text-base font-semibold md:text-lg ">
            &nbsp; {info.title}
          </p>
          <p className="ml-1 text-sm font-normal md:text-base">({leafCount})</p>
        </Link>
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
          <div className="flex w-full bg-transparent px-3 md:px-12 lg:px-12">
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
                  return (
                    <CarouselItem
                      key={item.slug}
                      className="basis-1/2 bg-transparent md:basis-1/3 lg:basis-1/5"
                    >
                      <div
                        className={cn(
                          "p-1",
                          "group relative cursor-pointer rounded-md border border-transparent",
                          "text-gray-400",
                        )}
                      >
                        <Link
                          href={
                            currentPath +
                            "/" +
                            item.parent_slug! +
                            "?groups=" +
                            item.slug +
                            (searchParams.get("customer")
                              ? "&customer=" + searchParams.get("customer")
                              : "")
                          }
                          className="flex justify-center"
                        >
                          <div className="flex w-[125px] flex-col">
                            <div className="flex h-36 grow flex-col rounded-lg bg-white py-0.5 text-center text-xs font-medium leading-4 text-sky-700 max-md:mt-4">
                              <Image
                                loading="lazy"
                                srcSet={
                                  item.image_url
                                    ? item.image_url
                                    : "https://placehold.co/400"
                                }
                                className="aspect-[1.11] h-[80px] w-[80px] self-center object-cover pt-1 group-hover:scale-110"
                              />
                              <div className={cn("mt-6", "text-gray-400")}>
                                {item.name}
                              </div>
                              {/* <p className="  pt-2 text-red-500">
                                Đang cập nhật
                              </p> */}
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
