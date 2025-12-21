import { describeRoute } from "hono-openapi";
import z from "zod";

import HttpStatusCodes from "../../lib/http-status-codes";
import {
  createRateLimitErrorResponse,
  createServerErrorResponse,
  createSuccessResponse,
} from "../../lib/openapi";

const tags = ["Health"];

export const checkHealthDoc = describeRoute({
  description: "Check API health status",
  tags,
  security: [{}],
  responses: {
    [HttpStatusCodes.OK]: createSuccessResponse("API is healthy", {
      details: "API is healthy",
      dataSchema: z.object({
        status: z.literal("ok"),
      }),
    }),
    // [HttpStatusCodes.TOO_MANY_REQUESTS]: createErrorResponse(
    //   "Too many requests",
    //   {
    //     "Too many requests": {
    //       summary: "Too many requests",
    //       code: "TOO_MANY_REQUESTS",
    //       details: "Too many requests have been made. Please try again later.",
    //     },
    //   },
    // ),
    // [HttpStatusCodes.TOO_MANY_REQUESTS]: createGenericErrorResponse(
    //   "Too many requests",
    //   {
    //     code: "TOO_MANY_REQUESTS",
    //     details: "Too many requests have been made. Please try again later.",
    //   },
    // ),
    [HttpStatusCodes.TOO_MANY_REQUESTS]: createRateLimitErrorResponse(),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: createServerErrorResponse(),
  },
});
