import { createRoute, z } from "@hono/zod-openapi";

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
          schema: z.object({
            projectId: z.string().min(1),
            method: z.enum([
              "get",
              "head",
              "post",
              "put",
              "patch",
              "delete",
              "connect",
              "options",
              "trace",
            ]),
            path: z.string().min(1),
            status: z.number(),
            timestamp: z.number(),
            duration: z.number(),
            env: z.string().min(1),
            sessionId: z.string().optional(),
            level: z.enum(["debug", "info", "warn", "error"]).optional(),
            message: z.string().optional(),
            meta: z.record(z.string(), z.unknown()).optional(),
          }),
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
