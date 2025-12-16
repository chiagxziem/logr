import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    BASE_URL: z.url(),
    API_URL: z.url(),
    DATABASE_URL: z.url(),
  },
  client: {
    NEXT_PUBLIC_AUTH_SERVER_URL: z.url(),
    NEXT_PUBLIC_BASE_URL: z.url(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    BASE_URL: process.env.BASE_URL,
    API_URL: process.env.API_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_AUTH_SERVER_URL: process.env.NEXT_PUBLIC_AUTH_SERVER_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  emptyStringAsUndefined: true,
});
