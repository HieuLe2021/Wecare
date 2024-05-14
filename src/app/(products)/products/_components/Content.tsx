import React from 'react'
import CustomTable from './Table'

type ContentProp ={

}
export const Content = () => {
  return <div className="w-full">
            <div className="text-4xl font-medium leading-7 text-gray-800 max-md:max-w-full">
              {selectedGroup?.name}
            </div>
            {childOfSelectedGroup?.length === 0 ? null : (
              <>
                <div className="mt-2 text-xs leading-4 text-gray-400 max-md:max-w-full">
                  {`${
                    childOfSelectedGroup?.length
                      ? childOfSelectedGroup?.length
                      : "0"
                  }`}{" "}
                  loại sản phẩm
                </div>
                <div className="relative w-full h-40">
                  <div className="bg-white rounded-xl max-sm:px-10 max-md:max-w-full absolute inset-0">
                    <div className="flex w-full sm:px-2  lg:px-12 md:px-12">
                      <CarouselProduct
                        data={childOfSelectedGroup || []}
                        customerId={customerId}
                        groupId={groupId}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {selectedGroup && (
              <div>
                <CustomTable
                  data={selectedGroup?.productByMaterial}
                ></CustomTable>
                {selectedGroup.children &&
                  selectedGroup.children.map((item: any) => (
                    <>
                      <h6 className="font-medium text-2xl py-1 bg-zinc-100 pl-2 my-2 ">
                        {item.name ? item.name : "Khác"}
                      </h6>
                      <div className="flex mb-3 pl-2"></div>
                      <div className="h-[1px] w-full mb-2 border-b border border-dashed"></div>
                      <CustomTable data={item.productByMaterial}></CustomTable>
                      {item.children &&
                        item.children.map((grandChild: any) => (
                          <>
                            <h6 className="font-semibold text-1xl pl-2">
                              {grandChild.name ? grandChild.name : "Khác"}
                            </h6>
                            <div className="flex mb-2 pl-2">
                              {groupId &&
                                grandChild.productByMaterial < 1 &&
                                "Vui lòng liên hệ để báo giá"}
                            </div>
                            <div className="h-[1px] w-full mb-1 border-b border border-dashed"></div>
                            <CustomTable
                              data={grandChild.productByMaterial}
                            ></CustomTable>
                            {!selectedGroup.id &&
                              grandChild.children &&
                              grandChild.children.map(
                                (grandGrandChild: any) => (
                                  <>
                                    <h6 className="font-semibold text-1xl pl-2">
                                      {grandGrandChild.name
                                        ? grandGrandChild.name
                                        : "Khác"}
                                    </h6>
                                    <div className="flex mb-2 pl-2">
                                      {groupId &&
                                        grandGrandChild.productByMaterial ==
                                          0 &&
                                        "Vui lòng liên hệ để báo giá"}
                                    </div>
                                    <div className="h-[1px] w-full mb-1 border-b border border-dashed"></div>
                                    <CustomTable
                                      data={grandGrandChild.productByMaterial}
                                    ></CustomTable>
                                  </>
                                )
                              )}
                          </>
                        ))}
                    </>
                  ))}
              </div>
            )}
          </div>
}

