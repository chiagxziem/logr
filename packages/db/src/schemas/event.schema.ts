import { relations } from "drizzle-orm";
import {
  bigint,
  index,
  integer,
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
  method: text("method").notNull(),
  path: text("path").notNull(),
  status: integer("status").notNull(),
  eventTs: timestamp("event_ts").notNull(),
  duration: bigint({ mode: "number" }).notNull(),
  env: text("env").notNull(),
  receivedAt: timestamp("received_at").defaultNow().notNull(),
  sessionId: text("session_id"),
  level: text("level"),

  message: text("message"),
  ipHashed: text("ip_hashed"),
  userAgent: text("user_agent"),
  meta: jsonb("meta").$type<Record<string, unknown>>().default({}).notNull(),
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
    method: text("method").notNull(),
    path: text("path").notNull(),
    status: integer("status").notNull(),
    eventTs: timestamp("event_ts").notNull(),
    duration: bigint({ mode: "number" }).notNull(),
    env: text("env").notNull(),
    sessionId: text("session_id"),
    level: text("level"),
  },
  (table) => [
    index("event_index_projectId_method_idx").on(table.projectId, table.method),
    index("event_index_projectId_path_idx").on(table.projectId, table.path),
    index("event_index_projectId_status_idx").on(table.projectId, table.status),
    index("event_index_projectId_eventTs_idx").on(
      table.projectId,
      table.eventTs,
    ),
    index("event_index_projectId_env_idx").on(table.projectId, table.env),
    index("event_index_projectId_sessionId_idx").on(
      table.projectId,
      table.sessionId,
    ),
    index("event_index_projectId_level_idx").on(table.projectId, table.level),
  ],
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
  payload: jsonb("payload").default({}).notNull(),
});
export const deadLetterRelations = relations(deadLetter, ({ one }) => ({
  project: one(project, {
    fields: [deadLetter.projectId],
    references: [project.id],
  }),
}));
