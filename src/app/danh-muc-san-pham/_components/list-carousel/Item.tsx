"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "@component/Image";
import { cn } from "@utils";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

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
    <div className="mb-4 w-full rounded-md bg-white">
      <div className="flex items-end justify-between px-6 py-2">
        <Link href={info.href}>
          <Icon>{info.icon}</Icon>
          {info.title}
          {leafCount}
        </Link>
        <Link
          href={info.href}
          className="text-xs text-blue-500 hover:text-blue-700"
        >
          Xem tất cả
        </Link>
      </div>
      <div className="relative h-36 w-full rounded-md bg-white">
        <div className="absolute left-4 right-4 top-[11px]">
          <div className="flex w-full sm:px-2  md:px-12 lg:px-12">
            <Carousel
              opts={{
                align: "start",
                dragFree: true,
                loop: false,
              }}
              className="w-full"
              plugins={[WheelGesturesPlugin()]}
            >
              <CarouselContent>
                {data.map((item) => {
                  return (
                    <CarouselItem
                      key={item.slug}
                      className="md:basis-1/3 lg:basis-1/5"
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
                            <div className="flex grow flex-col bg-white py-0.5 text-center text-xs font-medium leading-4 text-sky-700 max-md:mt-4">
                              <Image
                                loading="lazy"
                                srcSet={
                                  item.image_url
                                    ? item.image_url
                                    : "https://placehold.co/400"
                                }
                                className="aspect-[1.11] h-[80px] w-[80px] self-center object-cover pt-1 group-hover:scale-110"
                              />
                              <div className={cn("mt-2", "text-gray-400")}>
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
