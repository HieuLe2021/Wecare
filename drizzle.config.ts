import { defineConfig } from "drizzle-kit";

import { env } from "~/env";

export default defineConfig({
  schema: "./src/server/db/schema.db",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
