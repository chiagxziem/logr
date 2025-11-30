import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { project } from "../schemas/project.schema";

export const ProjectSelectSchema = createSelectSchema(project).extend({});

export const ProjectInsertSchema = createInsertSchema(project).pick({
  name: true,
});
