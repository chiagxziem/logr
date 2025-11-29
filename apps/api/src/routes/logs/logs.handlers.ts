import type { AppRouteHandler } from "@/lib/types";
import { successResponse } from "@/utils/api-response";
import HttpStatusCodes from "@/utils/http-status-codes";
import type { IngestLogRoute } from "./logs.routes";

export const ingestLog: AppRouteHandler<IngestLogRoute> = async (c) => {
  // TODO: Add log to log events queue

  return c.json(
    successResponse({ status: "ok" }, "Log ingested successfully"),
    HttpStatusCodes.OK,
  );
};
