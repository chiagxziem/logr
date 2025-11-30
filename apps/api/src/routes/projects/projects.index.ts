import { createRouter } from "@/lib/create-app";
import { authMiddleware } from "@/middleware/auth-middleware";
import * as projectsHandlers from "@/routes/projects/projects.handlers";
import * as projectsRoutes from "@/routes/projects/projects.routes";

const projectsRouter = createRouter();

projectsRouter.use("/projects/*", authMiddleware);

projectsRouter
  .openapi(projectsRoutes.createProject, projectsHandlers.createProject)
  .openapi(projectsRoutes.getProjects, projectsHandlers.getProjects);

export default projectsRouter;
