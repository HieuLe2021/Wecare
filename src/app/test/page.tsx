"use client"

import { api } from "~/trpc/react";

export default function TestPage() {
  const createPost = api.productGroup.sync.useQuery()
  return <button onClick={() => {
    const x = createPost.data
    console.log(x)

  }}>xxx</button>
}
