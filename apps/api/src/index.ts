import createApp from "@/lib/create-app";
import configureOpenAPI from "@/lib/openapi";
import healthRouter from "@/routes/health/health.index";
import logsRouter from "@/routes/logs/logs.index";

const app = createApp();

const routers = [healthRouter, logsRouter];

configureOpenAPI(app);

routers.forEach((router) => {
  app.route("/api", router);
});

export default app;
