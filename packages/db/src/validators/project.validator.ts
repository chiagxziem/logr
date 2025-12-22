import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import z from "zod";

import { project, projectToken } from "../schemas/project.schema";

export const ProjectSelectSchema = createSelectSchema(project).extend({
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const ProjectInsertSchema = createInsertSchema(project).pick({
  name: true,
});

export const ProjectUpdateSchema = ProjectInsertSchema;

export const ProjectTokenSelectSchema = createSelectSchema(projectToken)
  .omit({
    encryptedToken: true,
  })
  .extend({
    token: z.string().min(1),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
    lastUsedAt: z.iso.datetime().nullable(),
  });

export const ProjectTokenInsertSchema = createInsertSchema(projectToken)
  .extend({
    name: z.string().min(1),
  })
  .pick({
    name: true,
  });

export const ProjectTokenUpdateSchema = ProjectTokenInsertSchema;
