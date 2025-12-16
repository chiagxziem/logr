import Link from "next/link";

import { Button } from "@/components/ui/button";

const GuestPage = () => {
  return (
    <main className="flex flex-col items-start gap-4 py-32">
      <h1 className="font-jetbrains font-semibold">LOGR</h1>
      <p className="text-muted-foreground text-sm">
        Logr is an API logging and observability tool for developers. Capture,
        view, and analyze your API requests and responses in real time.
      </p>

      <Button
        className={"px-0"}
        nativeButton={false}
        render={<Link href={"/sign-in"} />}
        variant="link"
      >
        Sign in to continue
      </Button>
    </main>
  );
};

export default GuestPage;
