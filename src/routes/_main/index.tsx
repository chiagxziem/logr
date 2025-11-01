import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/")({
  component: HomePage,
});

function HomePage() {
  return (
    <main className="flex h-full flex-col items-center justify-center font-roboto text-4xl">
      Logr
    </main>
  );
}
