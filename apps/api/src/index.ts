import { createApp } from "@/app";
import health from "@/services/health/health.route";
import ingest from "@/services/ingest/ingest.route";
import service from "@/services/service/service.route";

const app = createApp();

app.route("/health", health);
app.route("/ingest", ingest);
app.route("/services", service);

export default app;
