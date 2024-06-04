"use client";

import type {
  ColumnDef,
  Row,
  SortingState,
  Table as TableDef,
} from "@tanstack/react-table";
import { Fragment, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { Tables } from "~/lib/supabase/types";
import { Image } from "~/components/image";
import TextField from "~/components/text-field";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { cn } from "~/utils";
import { vndFormatter } from "~/utils/vndFormatter";

export const PriceTable = ({
  material,
  data,
  customerProducts = [],
  skeleton,
  img,
}: {
  material: string;
  data: Tables<"products">[];
  customerProducts: Tables<"customers_matview">["products"];
  skeleton?: boolean;
  img: string;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sortBy = searchParams.get("sort_by") ?? "thuong_hieu";
  const sortOrder = searchParams.get("sort_order") ?? "asc";
  const sorting = useMemo(() => {
    return [{ id: sortBy, desc: sortOrder === "desc" }];
  }, [sortBy, sortOrder]);

  const [dataToRender, setDataToRender] = useState(data.slice(0, 10));

  const onRowClick = (
    row: Row<Tables<"products">>,
    table: TableDef<Tables<"products">>,
  ) => {
    if (!row.getIsExpanded()) {
      table.resetExpanded();
    }
    row.getToggleExpandedHandler()();
  };
  const columns: ColumnDef<Tables<"products">>[] = [
    {
      header: "Thương hiệu",
      accessorKey: "thuong_hieu",
      cell: ({ getValue }) => getValue() || "Đang cập nhật",
    },
    {
      header: "Quy cách",
      accessorKey: "quy_cach",
      cell: ({ getValue }) => getValue() || "Đang cập nhật",
    },
    {
      header: "Chất liệu",
      accessorKey: "chat_lieu",
      cell: ({ getValue }) => getValue() || "Khác",
      enableSorting: false,
    },
    {
      header: "Hoàn thiện",
      accessorKey: "hoan_thien",
      cell: ({ getValue }) => getValue() || "Đang cập nhật",
    },
    {
      header: () => <div className="pr-2 text-end">Giá</div>,
      accessorKey: "gia",
      cell: ({ row }) => {
        const price =
          customerProducts?.find((x) => x.id === row.original.id)?.gia ??
          row.original.gia;

        return (
          <div className="text-end">
            {price ? vndFormatter.format(price) : "Đang cập nhật"}
            {row.original.don_vi ? "/" + row.original.don_vi : ""}
          </div>
        );
      },
    },
  ];

  const table = useReactTable<Tables<"products">>({
    data: dataToRender,
    columns,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: (
      old: SortingState | ((old: SortingState) => SortingState),
    ) => {
      let s = null;
      if (typeof old === "function") {
        s = old(sorting);
      } else {
        s = old;
      }
      if (s[0]!.id !== sorting[0]!.id || s[0]!.desc !== sorting[0]!.desc) {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        if (s.length > 0) {
          newSearchParams.set("sort_by", s[0]!.id);
          newSearchParams.set("sort_order", s[0]!.desc ? "desc" : "asc");
          // router.replace(pathname + "?" + newSearchParams.toString());
          // change url searchParams without refresh
          window.history.replaceState(
            null,
            "",
            pathname + "?" + newSearchParams.toString(),
          );
        } else {
          newSearchParams.delete("sort_by");
          newSearchParams.delete("sort_order");
        }
      }
    },
    enableSortingRemoval: false,
    state: {
      sorting,
    },
  });

  return (
    <div className="mt-4 py-2">
      <div className=" border-b">
        <div className="pl-2 text-base font-semibold">
          {!skeleton && (
            <>
              <div className="flex">
                <span className="text-gray-500">Chất liệu:&nbsp;</span>
                {material && material !== "unknown" ? (
                  <span>{material}</span>
                ) : (
                  <span>Khác</span>
                )}
              </div>
            </>
          )}
        </div>
        <Table>
          <colgroup>
            <col width={130} />
            <col width={270} />
            <col width={130} className="table-cell sm:hidden" />
            <col width={130} />
            <col width={160} />
          </colgroup>
          {!skeleton ? (
            <>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          colSpan={header.colSpan}
                          className={cn(
                            "p-2 pl-1 pr-0",
                            header.column.id === "chat_lieu" &&
                              "hidden sm:table-cell",
                            header.column.getCanSort() && "cursor-pointer",
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          title={
                            header.column.getCanSort()
                              ? header.column.getNextSortingOrder() === "asc"
                                ? "Sort ascending"
                                : header.column.getNextSortingOrder() === "desc"
                                  ? "Sort descending"
                                  : "Clear sort"
                              : undefined
                          }
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              className={cn(
                                "flex items-center gap-1",
                                header.column.id === "gia" && "justify-end",
                              )}
                            >
                              <span>
                                {{
                                  asc: "🔼",
                                  desc: "🔽",
                                }[header.column.getIsSorted() as string] ??
                                  null}
                              </span>

                              <span>
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                              </span>
                            </div>
                          )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <Fragment key={row.id}>
                      <TableRow
                        onClick={() => {
                          onRowClick(row, table);
                        }}
                        className={cn(
                          row.getIsExpanded() ? "border-l border-r" : "",
                        )}
                      >
                        {/* first row is a normal row */}
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <TableCell
                              key={cell.id}
                              // className="p-2 text-[13px]"
                              className={cn(
                                "p-2 text-[13px]",
                                cell.column.id === "chat_lieu" &&
                                  "hidden sm:table-cell",
                              )}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                      {row.getIsExpanded() && (
                        <TableRow className="bg-gray-100">
                          {/* 2nd row is a custom 1 cell row */}
                          <TableCell
                            colSpan={row.getVisibleCells().length}
                            className="border-b border-l border-r px-2 text-[13px]"
                          >
                            {renderSubComponent({
                              row,
                              img,
                              customerProducts,
                            })}
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  );
                })}
              </TableBody>
            </>
          ) : (
            <TableBody>
              {Array(5)
                .fill(0)
                .map((_, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="py-2 pl-2 pr-0">
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell className="table-cell p-2 px-0 lg:hidden">
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell className="hidden  p-2 lg:table-cell">
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell className="hidden  p-2 lg:table-cell">
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell className="hidden p-2 lg:table-cell">
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell className="px-0 py-2 text-end">
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell className="py-2 pl-1">
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          )}
        </Table>

        {data.length > 10 && data.length !== dataToRender.length && (
          <div className="p-1.5 text-center">
            <button
              className="rounded-2xl border border-blue-500 px-6 py-1 text-xs text-blue-500 hover:bg-blue-50"
              onClick={() => setDataToRender(data)}
            >
              Xem thêm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const renderSubComponent = ({
  row,
  img,
  customerProducts,
}: {
  row: Row<Tables<"products">>;
  img: string;
  customerProducts: Tables<"customers_matview">["products"];
}) => {
  const record = row.original;
  return (
    <div className="items-center justify-between lg:flex">
      <div>
        <div className="flex">
          <Image
            loading="lazy"
            src={img}
            className="aspect-square shrink-0"
            alt={img}
            width={100}
            height={100}
          />
          <div className="pl-2">
            <div className="mb-2 text-[15px] font-semibold">
              {record.ten_sp}
            </div>
            <div className="mb-1 flex text-[13px] font-normal">
              <p className="w-24 font-normal text-gray-400">
                Thương hiệu:&nbsp;
              </p>
              {record.thuong_hieu || "Đang cập nhật"}
            </div>
            <div className=" mb-1 flex text-[13px] font-normal">
              <p className="w-24 font-normal text-gray-400">Quy cách:&nbsp;</p>
              {record.quy_cach || "Đang cập nhật"}
            </div>
            <div className="mb-1 flex text-[13px] font-normal">
              <p className="w-24 font-normal text-gray-400">Chất liệu:&nbsp;</p>
              {record.chat_lieu || "Khác"}
            </div>
            <div className="flex text-[13px] font-normal">
              <p className="w-24 font-normal text-gray-400">Giá:&nbsp;</p>
              {/* {record.gia ? vndFormatter.format(record.gia) : "Đang cập nhật"} */}
              {privatePrice(record, customerProducts)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 pt-4 lg:pt-0">
        <span>Số lượng:</span>
        <TextField placeholder="0" type="number" className="!w-20" />
        <Button className="ml-auto bg-sky-800" size="sm">
          Thêm vào giỏ hàng
        </Button>
      </div>
    </div>
  );
};

const privatePrice = (
  record: Tables<"products">,
  customerProducts: Tables<"customers_matview">["products"],
) => {
  const price =
    customerProducts?.find((x) => x.id === record.id)?.gia ?? record.gia;

  return (
    <div className="text-end">
      {price ? vndFormatter.format(price) : "Đang cập nhật"}
      {record.don_vi ? "/" + record.don_vi : ""}
    </div>
  );
};
