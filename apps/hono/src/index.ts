import { createApp } from "./app";
import health from "./services/health/health.route";
import user from "./services/user/user.route";

const app = createApp();

// Chain routes for RPC type inference
const routes = app.route("/health", health).route("/user", user);

export type AppType = typeof routes;
export default routes;
