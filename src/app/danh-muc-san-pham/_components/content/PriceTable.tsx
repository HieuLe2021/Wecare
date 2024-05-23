import type { Tables } from "~/lib/supabase/types";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
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
