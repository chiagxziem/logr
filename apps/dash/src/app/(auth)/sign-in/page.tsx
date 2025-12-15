import { Button } from "@/components/ui/button";

const SignInPage = () => {
  return (
    <main className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-jetbrains font-semibold">SIGN IN TO LOGR</h1>
        <p className="text-muted-foreground text-sm">
          Welcome back! Please sign in to your account.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Button size={"lg"}>Default</Button>
        <Button size={"lg"} variant={"outline"}>
          Outline
        </Button>
        <Button size={"lg"} variant={"secondary"}>
          Secondary
        </Button>
        <Button size={"lg"} variant={"ghost"}>
          Ghost
        </Button>
        <Button size={"lg"} variant={"destructive"}>
          Destructive
        </Button>
        <Button size={"lg"} variant={"link"}>
          Link
        </Button>
      </div>
    </main>
  );
};

export default SignInPage;
