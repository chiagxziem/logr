import { createRoute, z } from "@hono/zod-openapi";
import {
  ProjectInsertSchema,
  ProjectSelectSchema,
} from "@repo/db/validators/project.validator";

import HttpStatusCodes from "@/utils/http-status-codes";
import { projectsExamples } from "@/utils/openapi-examples";
import {
  errorContent,
  genericErrorContent,
  getErrDetailsFromErrFields,
  serverErrorContent,
  successContent,
} from "@/utils/openapi-helpers";

const tags = ["Projects"];

export const getProjects = createRoute({
  path: "/projects",
  method: "get",
  tags,
  description: "Get projects",
  responses: {
    [HttpStatusCodes.OK]: successContent({
      description: "Projects retrieved",
      schema: z.array(ProjectSelectSchema),
      resObj: {
        details: "Projects retrieved successfully",
        data: [projectsExamples.project],
      },
    }),
    [HttpStatusCodes.UNAUTHORIZED]: genericErrorContent(
      "UNAUTHORIZED",
      "Unauthorized",
      "No session found",
    ),
    [HttpStatusCodes.TOO_MANY_REQUESTS]: genericErrorContent(
      "TOO_MANY_REQUESTS",
      "Too many requests",
      "Too many requests have been made. Please try again later.",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: serverErrorContent(),
  },
});

export const createProject = createRoute({
  path: "/projects",
  method: "post",
  tags,
  description: "Create a new project",
  request: {
    body: {
      content: {
        "application/json": {
          schema: ProjectInsertSchema,
        },
      },
      required: true,
    },
  },
  responses: {
    [HttpStatusCodes.CREATED]: successContent({
      description: "Project created",
      schema: ProjectSelectSchema,
      resObj: {
        details: "Project created successfully",
        data: projectsExamples.project,
      },
    }),
    [HttpStatusCodes.BAD_REQUEST]: errorContent({
      description: "Invalid request data",
      examples: {
        validationError: {
          summary: "Validation error",
          code: "INVALID_DATA",
          details: getErrDetailsFromErrFields(
            projectsExamples.createProjectValErrs,
          ),
          fields: projectsExamples.createProjectValErrs,
        },
      },
    }),
    [HttpStatusCodes.UNAUTHORIZED]: genericErrorContent(
      "UNAUTHORIZED",
      "Unauthorized",
      "No session found",
    ),
    [HttpStatusCodes.TOO_MANY_REQUESTS]: genericErrorContent(
      "TOO_MANY_REQUESTS",
      "Too many requests",
      "Too many requests have been made. Please try again later.",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: serverErrorContent(),
  },
});

export type GetProjectsRoute = typeof getProjects;
export type CreateProjectRoute = typeof createProject;
