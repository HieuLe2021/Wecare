"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Image from "@component/Image";
import { cn } from "@utils";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { ChevronRight } from "lucide-react";

import type { MenuItem } from "~/components/categories/mega-menu/type";
import type { Tables } from "~/lib/supabase/types";
import { Link } from "~/components/link";
import { CardContent, CardRoot } from "~/components/shadcn/card";
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
  data: NonNullable<Tables<"menu_nodes_matview">["child_nodes"]>;
  leafCount: number;
}) => {
  const searchParams = useSearchParams();
  const currentPath = usePathname();

  return (
    <CardRoot className="mb-4 border-none">
      <CardContent>
        <div className="flex items-end justify-between">
          <Link href={info.href} className="flex items-center">
            <Image alt="" src={info.icon} width={24} height={24} />
            <p className="text-base font-semibold md:text-lg ">
              &nbsp; {info.title}
            </p>
            <p className="ml-1 text-sm font-normal md:text-base">
              ({leafCount})
            </p>
          </Link>
          <Link
            href={info.href}
            className="-mr-1 flex items-center text-xs text-blue-500 hover:text-blue-700"
          >
            Xem tất cả
            <ChevronRight />
          </Link>
        </div>

        <div className="mt-1 flex w-full px-4 lg:px-12">
          <Carousel
            opts={{
              align: "start",
              dragFree: true,
              loop: false,
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
                return (
                  <CarouselItem
                    key={item.slug}
                    className="basis-1/3 lg:basis-1/5"
                  >
                    <Link
                      href={
                        currentPath +
                        "/" +
                        item.parent_slug +
                        "?groups=" +
                        item.slug +
                        (searchParams.get("customer")
                          ? "&customer=" + searchParams.get("customer")
                          : "")
                      }
                      className={cn(
                        "group relative cursor-pointer rounded-md border border-transparent",
                        "flex h-full flex-col items-center px-2",
                      )}
                    >
                      <Image
                        loading="lazy"
                        srcSet={
                          item.image_url
                            ? item.image_url
                            : "https://placehold.co/400"
                        }
                        className="mt-2 aspect-[1.11] h-[80px] w-[80px] self-center object-cover lg:group-hover:scale-110"
                      />
                      <div
                        className={cn(
                          "mb-2 mt-[2px] line-clamp-2 text-center font-semibold lg:mt-2",
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
      </CardContent>
    </CardRoot>
  );
};
