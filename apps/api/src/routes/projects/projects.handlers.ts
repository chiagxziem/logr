import type { AppRouteHandler } from "@/lib/types";
import {
  createProjectForUser,
  getProjectsForUser,
} from "@/queries/project-queries";
import { successResponse } from "@/utils/api-response";
import HttpStatusCodes from "@/utils/http-status-codes";
import type { CreateProjectRoute, GetProjectsRoute } from "./projects.routes";

export const getProjects: AppRouteHandler<GetProjectsRoute> = async (c) => {
  const user = c.get("user");

  const projects = await getProjectsForUser(user.id);

  return c.json(
    successResponse(projects, "Projects retrieved successfully"),
    HttpStatusCodes.OK,
  );
};

export const createProject: AppRouteHandler<CreateProjectRoute> = async (c) => {
  const user = c.get("user");
  const { name } = c.req.valid("json");

  const newProject = await createProjectForUser(name, user.id);

  return c.json(
    successResponse(newProject, "Project created successfully"),
    HttpStatusCodes.CREATED,
  );
};
