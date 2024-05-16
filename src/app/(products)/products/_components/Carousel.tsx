"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@utils";

export function CarouselProduct({
  data,
  customerId,
  groupId,
}: {
  data: any;
  customerId: any;
  groupId: any;
}) {
  const childOfSelectedGroup = data as any[];
  const searchParams = useSearchParams();
  const currentChildId = searchParams.get("child");

  const router = useRouter();
  const onClickItem = (id: any) => {
    const url = groupId
      ? `/home?group=${groupId}&customer=${customerId}&child=${id}`
      : `/home?customer=${customerId}&group=${id}`;
    router.push(url);
  };
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {childOfSelectedGroup &&
          childOfSelectedGroup.map((item, index) => (
            <CarouselItem
              key={item.id}
              onClick={() => {
                onClickItem(item.id);
                console.log("item", item);
              }}
              className={cn(
                "group basis-1/2 md:basis-1/3 lg:basis-1/5 cursor-pointer hover:border-gray-500 border-transparent border rounded-md pt-2 mb-1 mr-1",
                currentChildId === item.id ? "border-gray-500" : "text-gray-400"
              )}
            >
              <div className="flex justify-center">
                <div className="flex flex-col w-[125px]">
                  <div className="flex flex-col grow py-0.5 text-xs font-medium leading-4 text-center text-sky-700 bg-white max-md:mt-4">
                    <img
                      loading="lazy"
                      srcSet={
                        item.image_url
                          ? item.image_url
                          : "https://placehold.co/400"
                      }
                      className="self-center aspect-[1.11] w-[80px] h-[80px] object-cover group-hover:scale-125 pt-1"
                    />
                    <div
                      className={cn(
                        "mt-2",
                        currentChildId === item.id
                          ? "text-sky-700 font-semibold text-sm"
                          : "text-gray-400"
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
}

