import { Button } from "@/components/ui/button";

const SignInPage = () => {
  return (
    <main className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-bold text-2xl">Sign in to Logr</h1>
        <p className="font-normal text-muted-foreground">
          Welcome back! Please sign in to your account.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Button size={"lg"} variant={"outline"}>
          Continue with GitHub
        </Button>
        <Button size={"lg"} variant={"outline"}>
          Continue with Google
        </Button>
      </div>
    </main>
  );
};

export default SignInPage;
