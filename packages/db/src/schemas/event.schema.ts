import { relations } from "drizzle-orm";
import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { service } from "./service.schema";

export const deadLetter = pgTable("dead_letter", {
  id: uuid("id").primaryKey().defaultRandom(),
  serviceId: uuid("service_id")
    .references(() => service.id)
    .notNull(),
  failedAt: timestamp("failed_at").defaultNow().notNull(),
  reason: text("reason").notNull(),
  payload: jsonb("payload").default({}).notNull(),
});
export const deadLetterRelations = relations(deadLetter, ({ one }) => ({
  service: one(service, {
    fields: [deadLetter.serviceId],
    references: [service.id],
  }),
}));
