import { drizzle } from "drizzle-orm/node-postgres";

import env from "./lib/env";
import * as eventSchema from "./schemas/event.schema";
import * as serviceSchema from "./schemas/service.schema";

const db = drizzle(env.DATABASE_URL, {
  schema: {
    ...eventSchema,
    ...serviceSchema,
  },
  casing: "snake_case",
});

export * from "drizzle-orm";
export { db };
