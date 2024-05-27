"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import { Fragment } from "react";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { Tables } from "~/lib/supabase/types";
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
  customerProductPrices = {},
  skeleton,
}: {
  material: string;
  data: Tables<"products">[];
  customerProductPrices: Tables<"customers">["product_prices"] | undefined;
  skeleton?: boolean;
}) => {
  const onRowClick = (row: Row<Tables<"products">>) => {
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
    },
    {
      header: "Hoàn thiện",
      accessorKey: "hoan_thien",
      cell: ({ getValue }) => getValue() || "Đang cập nhật",
    },
    {
      header: () => <div className="text-end">Giá</div>,
      accessorKey: "gia",
      cell: ({ row }) => {
        const price =
          (customerProductPrices as Record<string, number> | null)?.[
            row.original.id
          ] ?? row.original.gia;

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
    data,
    columns,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  console.log(table.getState().sorting);

  return (
    <div className="py-2">
      <div className=" border-b">
        <div className="pl-2 text-base font-medium">
          {!skeleton && (
            <>
              {material && material !== "unknown" ? (
                <div>Chất liệu: {`${material}`}</div>
              ) : (
                "Chất liệu: Khác"
              )}
            </>
          )}
        </div>
        {/* <TanstackTable columns={}/> */}
        <Table>
          <colgroup>
            <col width={120} />
            <col width={280} />
            <col width={130} />
            <col width={130} />
            <col width={160} />
          </colgroup>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className="p-2"
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
                        <div className="flex items-center gap-1">
                          <span>
                            {{
                              asc: "🔼",
                              desc: "🔽",
                            }[header.column.getIsSorted() as string] ?? null}
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
                      onRowClick(row);
                    }}
                    className={cn(
                      row.getIsExpanded() ? "border-l border-r" : "",
                    )}
                  >
                    {/* first row is a normal row */}
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id} className="p-2">
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
                        className="border-b border-l border-r px-2"
                      >
                        {renderSubComponent({ row })}
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>

        <Table>
          <colgroup>
            <col width={140} />
            <col width={280} />
            <col width={100} className="table-cell lg:hidden " />
            <col width={140} className="table-cell sm:hidden" />
            <col width={100} />
            <col width={140} />
          </colgroup>
          <TableHeader className={skeleton ? "hidden" : ""}>
            <TableRow>
              <TableHead className="text-black-400 h-10 px-2 text-sm font-medium">
                Thương hiệu
              </TableHead>
              <TableHead className="text-black-400 table-cell h-10 px-0 font-medium lg:hidden">
                Quy cách / hoàn thiện
              </TableHead>
              <TableHead className="text-black-400 hidden h-10 px-2 text-sm font-medium lg:table-cell ">
                Quy cách
              </TableHead>
              <TableHead className="text-black-400 hidden h-10 px-2 font-medium lg:table-cell">
                Chất liệu
              </TableHead>
              <TableHead className="text-black-400 hidden h-10 px-2 font-medium lg:table-cell ">
                Hoàn thiện
              </TableHead>
              <TableHead className="text-black-400 h-10 px-2 text-end font-medium">
                Giá
              </TableHead>
              <TableHead className="text-black-400 h-10 px-2 font-medium"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skeleton ? (
              <>
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
                        <TableCell className="py-2 pl-1 pr-0">
                          <Skeleton className="h-4 w-full" />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </>
            ) : (
              <>
                {data.length === 0 ? (
                  <>Chưa có dữ liệu</>
                ) : (
                  data.map((productItem) => {
                    const price =
                      (
                        customerProductPrices as Record<string, number> | null
                      )?.[productItem.id] ?? productItem.gia;
                    return (
                      <TableRow key={productItem.id}>
                        <TableCell className="py-2 pl-2 pr-0">
                          {productItem.thuong_hieu || "Đang cập nhật"}
                        </TableCell>
                        <TableCell className="table-cell p-2 px-0 lg:hidden">
                          {productItem.quy_cach} /{" "}
                          {productItem.hoan_thien || " "}
                        </TableCell>
                        <TableCell className="hidden  p-2 lg:table-cell">
                          {productItem.quy_cach || "Đang cập nhật"}
                        </TableCell>
                        <TableCell className="hidden  p-2 lg:table-cell">
                          {productItem.chat_lieu || "Khác"}
                        </TableCell>
                        <TableCell className="hidden p-2 lg:table-cell">
                          {productItem.hoan_thien || "Đang cập nhật"}
                        </TableCell>
                        <TableCell className="px-0 py-2 text-end">{`${
                          price ? vndFormatter.format(price) : "Đang cập nhật"
                        }`}</TableCell>
                        <TableCell className="py-2 pl-1 pr-0">
                          /&nbsp;{productItem.don_vi || " "}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const renderSubComponent = ({ row }: { row: Row<Tables<"products">> }) => {
  const record = row.original;
  return (
    <div className="flex items-center justify-between">
      <div className="font-bold">{record.ten_sp}</div>
      <div className="flex items-center gap-1">
        <span>Số lượng:</span>
        <TextField placeholder="0" type="number" className="!w-20" />
        <Button className="ml-auto bg-sky-800" size="sm">
          Thêm vào giỏ hàng
        </Button>
      </div>
    </div>
  );
};
