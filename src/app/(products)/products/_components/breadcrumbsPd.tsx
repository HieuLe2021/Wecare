"use client"

import { Breadcrumb } from "app/(products)/_components/breadcrumbs";
import Select from "@component/Select";

export default function BreadcrumbsPd({resGroups}){

    return (
        <div className="flex col justify-between lg:mx-4 lg:px-4 py-2 mb-2 rounded-lg bg-white">
            <div>
                <Breadcrumb resGroups={resGroups} />
                <p>30 sản phẩm</p>
            </div>
            <div className="flex row items-center">
                <p className="pr-2">Ngành nghề:</p>
                <Select placeholder="Tất cả" defaultValue={sortOptions[0]} options={sortOptions} />
            </div>
        </div>
    );
}

const sortOptions = [
    { label: "Tất cả", value: "Tất cả" },
    { label: "Nhà máy gỗ", value: "Nhà máy gỗ" },
    { label: "Sản xuất khác", value: "Sản xuất khác" },
    { label: "Shop bán lẻ", value: "Shop bán lẻ" },
    { label: "Thi công nội thất", value: "Thi công nội thất" },
    { label: "Wicker", value: "Wicker" },
    { label: "Xây dựng", value: "Xây dựng" }
  ];