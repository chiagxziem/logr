import { createRoute, z } from "@hono/zod-openapi";
import { LogSchema } from "@repo/db/validators/log.validator";

import HttpStatusCodes from "@/utils/http-status-codes";
import { serverErrorContent, successContent } from "@/utils/openapi-helpers";

const tags = ["Logs"];

export const ingestLog = createRoute({
  path: "/logs",
  method: "post",
  tags,
  description: "Ingest log",
  request: {
    body: {
      content: {
        "application/json": {
          schema: LogSchema,
        },
      },
      required: true,
    },
  },
  responses: {
    [HttpStatusCodes.OK]: successContent({
      description: "Log ingested",
      schema: z.object({
        status: z.string().default("ok"),
      }),
      resObj: {
        details: "Log ingested successfully",
        data: {
          status: "ok",
        },
      },
    }),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: serverErrorContent(),
  },
});

export type IngestLogRoute = typeof ingestLog;
