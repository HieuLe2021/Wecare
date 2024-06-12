import { createEnv } from "@t3-oss/env-nextjs";
import { vercel } from "@t3-oss/env-nextjs/presets";
import { z } from "zod";

export const env = createEnv({
  extends: [vercel()],
  shared: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    VERCEL_ENV: z.enum(["development", "preview", "production"]).optional(),
  },
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  // server: {
  //   // Database
  //   DATABASE_URL: z.string().url(),
  //   // POSTGRES_URL: z.string().url(),
  //   // POSTGRES_URL_NON_POOLING: z.string().url(),

  //   // OpenAI
  //   // OPENAI_API_KEY: z.string(),
  // },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
  },

  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  experimental__runtimeEnv: {
    VERCEL_ENV: process.env.VERCEL_ENV,
    NODE_ENV: process.env.NODE_ENV,
    // NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    // NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    //Hoang tran
    NEXT_PUBLIC_SUPABASE_URL: "https://iqkpkflvnqkpltoszjrl.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlxa3BrZmx2bnFrcGx0b3N6anJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgwODc0NTksImV4cCI6MjAzMzY2MzQ1OX0.Bcu2MAnjpVY8i4bBA6n2Yt2WPu9aCajT8REIADKtU8g",
    //hieu le
    // NEXT_PUBLIC_SUPABASE_URL: "https://awustmvkxviqvsumbcyk.supabase.co",
    // NEXT_PUBLIC_SUPABASE_ANON_KEY:
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3dXN0bXZreHZpcXZzdW1iY3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4MTY0MjksImV4cCI6MjAzMzM5MjQyOX0.hxlyeMkgBWYqDTmYtrXUr1M_S9SDvz5ouSyW8S4ctLo",
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  skipValidation:
    !!process.env.CI ||
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === "lint",
});
