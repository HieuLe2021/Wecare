import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";

export default function CustomTable({ data }: { data: any }) {
  const products = data as any[];
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div>
      {products &&
        products.map((product: any) => (
          <div className="mb-4 mt-2 border-b">
            <div className="pl-2 text-base font-medium">
              {product.label && product.label !== "null" ? (
                <div>Chất liệu: {`${product.label}`}</div>
              ) : (
                "Chất liệu: Khác"
              )}
            </div>
            {/* <div className="flex gap-4 mt-4 text-xs leading-4 text-gray-800 bg-blend-normal max-md:flex-wrap pb-2">
              <img
                loading="lazy"
                srcSet="https://wecare.com.vn/wp-content/uploads/2023/04/Ban_le_xe_tai-removebg-preview-247x296.png"
                className="shrink-0 aspect-square w-[72px]"
              />
              <div className="self-start max-md:max-w-full">
                Siêu thị công nghiệp Wecare chuyên cung cấp sản phẩm đa dạng mẫu
                mã, phục vụ đa ngành nghề. Giá cả cạnh tranh, đảm bảo trải
                nghiệm khách hàng tốt nhất.
              </div>
            </div> */}
            <Table>
              <colgroup>
                <col width={200} />
                <col width={140} />
                <col width={140} className="table-cell lg:hidden " />
                <col width={140} className="table-cell sm:hidden" />
                <col width={300} />
                <col width={140} />
              </colgroup>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-black-500 h-10 px-2 text-sm font-medium">
                    Thương hiệu
                  </TableHead>
                  <TableHead className="text-black-500 table-cell h-10 px-0 font-medium lg:hidden">
                    Quy cách / hoàn thiện
                  </TableHead>
                  <TableHead className="text-black-500 hidden h-10 px-2 text-sm font-medium lg:table-cell ">
                    Chất liệu
                  </TableHead>
                  <TableHead className="text-black-500 text-black-500 hidden h-10 px-2 font-medium lg:table-cell">
                    Quy cách
                  </TableHead>
                  <TableHead className="text-black-500 hidden h-10 px-2 font-medium lg:table-cell ">
                    Hoàn thiện
                  </TableHead>
                  <TableHead className="text-black-500 h-10 px-2 text-end font-medium">
                    Giá
                  </TableHead>
                  <TableHead className="h-10 px-2 font-medium"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {product.options &&
                  product.options.map((productItem: any) => (
                    <TableRow key={productItem.id}>
                      <TableCell className="p-2">
                        {productItem.thuong_hieu || "----"}
                      </TableCell>
                      <TableCell className="table-cell px-0 py-2 pl-2 lg:hidden">
                        {productItem.quy_cach} / {productItem.hoan_thien || " "}
                      </TableCell>
                      <TableCell className="hidden  py-2 lg:table-cell">
                        {productItem.chat_lieu || "----"}
                      </TableCell>
                      <TableCell className="hidden  p-2 lg:table-cell">
                        {productItem.quy_cach || "----"}
                      </TableCell>
                      <TableCell className="hidden p-2 lg:table-cell">
                        {productItem.hoan_thien || "----"}
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
        ))}
    </div>
  );
}
