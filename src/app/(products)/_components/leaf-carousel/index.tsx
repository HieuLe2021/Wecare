"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "@component/Image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";
import { cn } from "@utils";

import { Tables } from "~/lib/supabase/types";

export const LeafCarousel = ({
  data,
  // customerId,
  // groupId,
}: {
  data: NonNullable<Tables<"menu_nodes">["child_nodes"]>;
  // customerId: any;
  // groupId: any;
}) => {
  // console.log("dddddd", data);
  // const childOfSelectedGroup = data as any[];
  const searchParams = useSearchParams();
  const currentChildId = searchParams.get("child");

  const router = useRouter();
  // const onClickItem = (id: any) => {
  //   const url = groupId
  //     ? `/home?group=${groupId}&customer=${customerId}&child=${id}`
  //     : `/home?customer=${customerId}&group=${id}`;
  //   router.push(url);
  // };
  const groupIds = searchParams.get("group_ids")?.split(",") ?? [];

  const onSelectLeafGroupHandler = React.useCallback(
    (selectedId: string) => {
      console.log("???", selectedId);
      let newGroupIds = [...groupIds];
      if (newGroupIds.includes(selectedId)) {
        newGroupIds = newGroupIds.filter((x) => x !== selectedId);
      } else {
        newGroupIds.push(selectedId);
      }
      const params = new URLSearchParams(searchParams.toString());
      params.set("group_ids", newGroupIds.join(","));

      console.log("aaa", params.toString());
      router.push(`/products?${params.toString()}`);
    },
    [searchParams, groupIds],
  );

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {data.map((item, index) => (
          <CarouselItem
            key={item.id}
            onClick={() => {
              if (item.id) onSelectLeafGroupHandler(item.id);
            }}
            className={cn(
              "group relative mb-1 mr-1 basis-1/2 cursor-pointer rounded-md border border-transparent pt-2 hover:border-blue-500 md:basis-1/3 lg:basis-1/5",
              currentChildId === item.id ? "border-blue-500" : "text-gray-400",
              item.id && groupIds.includes(item.id) && "border-blue-500",
            )}
          >
            <div className="flex justify-center">
              <div className="flex w-[125px] flex-col">
                <div className="flex grow flex-col bg-white py-0.5 text-center text-xs font-medium leading-4 text-sky-700 max-md:mt-4">
                  {item.id && groupIds.includes(item.id) && (
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
                      currentChildId === item.id
                        ? "text-sm font-semibold text-sky-700"
                        : "text-gray-400",
                    )}
                  >
                    {item.name}
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
