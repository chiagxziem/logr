import type { User } from "@repo/db/schemas/auth.schema";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import { axiosClient } from "@/lib/axios";
import { queryKeys } from "@/lib/query";
import type { ApiSuccessResponse } from "@/lib/types";
import { headersMiddleware } from "@/middleware/headers-middleware";

// get user server fn
export const $getUser = createServerFn({
  method: "GET",
})
  .middleware([headersMiddleware])
  .handler(async ({ context }) => {
    try {
      const response = await axiosClient.get<ApiSuccessResponse<User>>(
        "/user/me",
        {
          headers: {
            ...context.headers,
            host: undefined,
          },
        },
      );

      return response.data.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  });
// get user query options
export const userQueryOptions = queryOptions({
  queryKey: queryKeys.user(),
  queryFn: $getUser,
});
