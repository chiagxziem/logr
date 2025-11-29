import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";

import type { errorResponse } from "@/utils/api-response";
import type { auth } from "./auth";

export interface AppBindings {
  Variables: {
    user: typeof auth.$Infer.Session.user;
    session: typeof auth.$Infer.Session.session;
  };
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;

export type ErrorStatusCodes<R> =
  Extract<
    R extends AppRouteHandler<infer Route>
      ? Route["responses"][keyof Route["responses"]]
      : never,
    { content: { "application/json": ReturnType<typeof errorResponse> } }
  > extends { status: infer S }
    ? S
    : never;

export type Log = {
  projectId: string;
  method:
    | "get"
    | "head"
    | "post"
    | "put"
    | "patch"
    | "delete"
    | "connect"
    | "options"
    | "trace";
  path: string;
  status: number;
  timestamp: number;
  duration: number;
  env: string;
  sessionId?: string;
  level?: "debug" | "info" | "warn" | "error";
  message?: string;
  meta?: Record<string, unknown>;
};
