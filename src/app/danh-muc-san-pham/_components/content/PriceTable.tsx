import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";

import { Tables } from "~/lib/supabase/types";

export const PriceTable = ({
  material,
  data,
}: {
  material: string | "unknown";
  data: Tables<"products">[];
}) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  // console.log("dddd", data);

  return (
    <div className="py-4">
      <div className=" border-b">
        <div className="pl-2 text-base font-medium">
          {material && material !== "unknown" ? (
            <div>Chất liệu: {`${material}`}</div>
          ) : (
            "Chất liệu: Khác"
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
          <TableHeader>
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
            {data.map((productItem) => (
              <TableRow key={productItem.id}>
                <TableCell className="py-2 pl-2 pr-0">
                  {productItem.thuong_hieu || "Đang cập nhật"}
                </TableCell>
                <TableCell className="table-cell p-2 px-0 lg:hidden">
                  {productItem.quy_cach} / {productItem.hoan_thien || " "}
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
                  productItem.gia
                    ? formatter.format(productItem.gia)
                    : formatter.format(10000)
                }`}</TableCell>
                <TableCell className="py-2 pl-1 pr-0">
                  /&nbsp;{productItem.don_vi || " "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* <div className="mb-1 h-[1px] w-full border border-b border-dashed"></div> */}
    </div>
  );
};
