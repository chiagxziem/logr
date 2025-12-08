import { cn } from "@/lib/utils";
import { archivo, jetbrains } from "@/styles/fonts";
import "@/styles/globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Logr",
  description: "Logr - An API Observability tool for developers.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html className="dark" lang="en">
      <body className={cn(jetbrains.variable, archivo.variable)}>
        <div className="relative isolate min-h-svh bg-background font-archivo text-foreground antialiased **:outline-transparent **:outline-offset-1">
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
