// import { Suspense } from "react";
// import { cn } from "@utils";
// import { createClient } from "@utils/supabase/server";

import { StyledList } from "./List";

// import { getCollections } from "./utils";
//
//
// async function CollectionList() {
//   const supabase = createClient();
//   const collections = getCollections(
//     (await supabase.from("product_groups").select()).data ?? [],
//   );
//   return <StyledList collections={collections} />;
// }
//
// export default function Collections({}) {
//   return (
//     <Suspense
//       fallback={
//         <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
//           <div className={cn(skeleton, items)} />
//           <div className={cn(skeleton, items)} />
//           <div className={cn(skeleton, items)} />
//           <div className={cn(skeleton, items)} />
//           <div className={cn(skeleton, items)} />
//           <div className={cn(skeleton, items)} />
//           <div className={cn(skeleton, items)} />
//           <div className={cn(skeleton, items)} />
//         </div>
//       }
//     >
//       <CollectionList />
//     </Suspense>
//   );
// }
export default StyledList;
