import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import { fontsHref } from "@/lib/utils";
import appCss from "@/styles/app.css?url";
import fontsCss from "@/styles/fonts.css?url";

export interface AppRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<AppRouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content",
      },
      {
        title: "Logr",
        description: "API logging and error tracking tool for developers.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: fontsCss },
      {
        rel: "icon",
        href: "/favicons/favicon.ico",
      },
      ...fontsHref.map((href) => ({
        rel: "preload",
        href,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous" as const,
      })),
    ],
  }),
  component: () => (
    <RootDocument>
      <Outlet />
    </RootDocument>
  ),
});

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>

      <body className="min-h-dvh font-inter">
        <div className="relative isolate flex min-h-dvh flex-col bg-background text-neutral-800 text-sm antialiased **:outline-transparent **:outline-offset-2 selection:bg-lime-500 selection:text-neutral-950 dark:text-neutral-200">
          {children}
        </div>
        <Scripts />
      </body>
    </html>
  );
}
