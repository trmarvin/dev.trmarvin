import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // IMPORTANT: for migrations, use the DIRECT (non-pooler) Neon URL
    url: env("DIRECT_URL"),
  },
});