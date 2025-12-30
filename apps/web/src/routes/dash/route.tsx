import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dash")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="mx-auto flex max-w-lg flex-col justify-center px-4">
      <Outlet />
    </div>
  );
}
