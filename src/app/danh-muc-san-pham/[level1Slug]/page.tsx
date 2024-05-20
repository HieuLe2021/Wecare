import { createClient } from "@lib/supabase/server";

import { Tables } from "~/lib/supabase/types";
import { Content } from "../_components/content";
import { PriceTable } from "../_components/content/PriceTable";

export default async function Page({
  params,
}: {
  params: { level1Slug: string };
}) {
  return (
    <>
      <Content params={params} />
    </>
  );
}
