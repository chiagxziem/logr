import { relations } from "drizzle-orm";
import {
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { project } from "./project.schema";

export const event = pgTable("event", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .references(() => project.id)
    .notNull(),
  eventTs: timestamp("event_ts").notNull(),
  receivedAt: timestamp("received_at").defaultNow().notNull(),
  level: text("level").notNull(),
  message: text("message").notNull(),
  service: text("service"),
  environment: text("environment"),
  ipHashed: text("ip_hashed"),
  userAgent: text("user_agent"),
  context: jsonb("context").default({}).notNull(),
  meta: jsonb("meta").default({}).notNull(),
});
export const eventRelations = relations(event, ({ one }) => ({
  project: one(project, {
    fields: [event.projectId],
    references: [project.id],
  }),
}));

export const eventIndex = pgTable(
  "event_index",
  {
    id: uuid("id").primaryKey(),
    projectId: uuid("project_id")
      .references(() => project.id)
      .notNull(),
    eventTs: timestamp("event_ts").notNull(),
    level: text("level").notNull(),
    service: text("service"),
    environment: text("environment"),
  },
  (table) => {
    return [
      index("event_index_projectId_eventTs_idx").on(
        table.projectId,
        table.eventTs,
      ),
      index("event_index_projectId_level_idx").on(table.projectId, table.level),
      index("event_index_projectId_service_idx").on(
        table.projectId,
        table.service,
      ),
      index("event_index_projectId_environment_idx").on(
        table.projectId,
        table.environment,
      ),
    ];
  },
);
export const eventIndexRelations = relations(eventIndex, ({ one }) => ({
  project: one(project, {
    fields: [eventIndex.projectId],
    references: [project.id],
  }),
}));

export const deadLetter = pgTable("dead_letter", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .references(() => project.id)
    .notNull(),
  failedAt: timestamp("failed_at").defaultNow().notNull(),
  reason: text("reason").notNull(),
  payload: jsonb("payload").notNull(),
});
export const deadLetterRelations = relations(deadLetter, ({ one }) => ({
  project: one(project, {
    fields: [deadLetter.projectId],
    references: [project.id],
  }),
}));
