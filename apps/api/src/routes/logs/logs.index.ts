import { createRouter } from "@/lib/create-app";
import * as logsHandlers from "@/routes/logs/logs.handlers";
import * as logsRoutes from "@/routes/logs/logs.routes";

const logsRouter = createRouter();

logsRouter.openapi(logsRoutes.ingestLog, logsHandlers.ingestLog);

export default logsRouter;
