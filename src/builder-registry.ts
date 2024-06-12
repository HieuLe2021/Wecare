"use client";
import { builder, Builder, withChildren } from "@builder.io/react";
import Accordion from "./components/accordion/Accordion";
import Counter from "./components/Counter/Counter";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(Counter, {
  name: "Counter",
  inputs: [
    {
      name: "initialCount",
      type: "number",
    },
  ],
});

Builder.registerComponent(withChildren(Accordion), {
  name: "Accordion",
  inputs: [
    {
      name: "children",
      type: "string",
      hideFromUI: true,
      meta: {
        ts: "any",
      },
    },
    {
      name: "expanded",
      type: "boolean",
    },
  ],
});
