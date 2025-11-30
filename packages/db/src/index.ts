import { drizzle } from "drizzle-orm/node-postgres";

import env from "./lib/env";
import * as authSchema from "./schemas/auth.schema";
import * as eventSchema from "./schemas/event.schema";
import * as projectSchema from "./schemas/project.schema";

const db = drizzle(env.DATABASE_URL, {
  schema: {
    ...authSchema,
    ...eventSchema,
    ...projectSchema,
  },
  casing: "snake_case",
});

export * from "drizzle-orm";
export { db };
