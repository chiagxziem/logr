import createApp from "@/lib/create-app";
import configureOpenAPI from "@/lib/openapi";
import healthRouter from "@/routes/health/health.index";

const app = createApp();

const routers = [healthRouter];

configureOpenAPI(app);

routers.forEach((router) => {
  app.route("/api", router);
});

export default app;
