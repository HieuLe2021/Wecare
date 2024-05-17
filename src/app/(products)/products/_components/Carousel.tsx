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
  const [arrCheckItem, setArrCheckItem] = React.useState([]);
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
                // onClickItem(item.id);
                if (arrCheckItem.includes(item.id)) {
                  setArrCheckItem((pre) => pre.filter((x) => x !== item.id));
                } else {
                  setArrCheckItem((pre) => [...pre, item.id]);
                }
              }}
              className={cn(
                "group relative mb-1 mr-1 basis-1/2 cursor-pointer rounded-md border border-transparent pt-2 hover:border-blue-500 md:basis-1/3 lg:basis-1/5",
                currentChildId === item.id
                  ? "border-blue-500"
                  : "text-gray-400",
                arrCheckItem.includes(item.id) && "border-blue-500",
              )}
            >
              <div className="flex justify-center">
                <div className="flex w-[125px] flex-col">
                  <div className="flex grow flex-col bg-white py-0.5 text-center text-xs font-medium leading-4 text-sky-700 max-md:mt-4">
                    {arrCheckItem.includes(item.id) && (
                      <Image
                        className="absolute right-0 top-0 h-5 w-5"
                        src="/assets/images/wc-icon/check-tick.svg"
                        alt="check-tick"
                      />
                    )}
                    <img
                      loading="lazy"
                      srcSet={
                        item.image_url
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
}
