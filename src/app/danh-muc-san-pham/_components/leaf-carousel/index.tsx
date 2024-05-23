"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "@component/Image";
import { cn } from "@utils";

import type { Tables } from "~/lib/supabase/types";
import { SwiperContainer, SwiperSlide } from "~/components/swiper";

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
    <>
      <div className=" bg-white">
        <div className="">
          <div className="">
            <SwiperContainer mousewheel freeMode pagination slidesPerView={5}>
              {data.map((item) => {
                const isActive = item.slug && groupSlugs.includes(item.slug);
                return (
                  <SwiperSlide
                    key={item.slug}
                    // className="md:basis-1/3 lg:basis-1/5"
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
                          <div className="flex grow flex-col bg-white py-0.5 text-center text-xs font-medium leading-4 text-sky-700 max-md:mt-4">
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
                    </div>
                  </SwiperSlide>
                );
              })}
            </SwiperContainer>
          </div>
        </div>
      </div>
    </>
  );
};
