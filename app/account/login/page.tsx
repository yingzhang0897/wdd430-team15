import { signIn } from "@/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const { callbackUrl, error } = params;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-600 px-4 py-12">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Sign in</h1>
          <p className="text-sm text-gray-500">
            Use your GitHub account to access your dashboard and manage your shop.
          </p>
        </div>

        <form
          className="space-y-4"
          action={async () => {
            "use server";
            await signIn("github", {
              redirectTo: callbackUrl ?? "/dashboard/seller",
            });
          }}
        >
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Continue with GitHub
          </button>
        </form>

        {error && (
          <p className="text-sm text-red-600 text-center">
            {getErrorMessage(error)}
          </p>
        )}

        <p className="text-xs text-gray-500 text-center">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </main>
  );
}

function getErrorMessage(error: string) {
  switch (error) {
    case "OAuthAccountNotLinked":
      return "Please sign in with the account you originally used.";
    default:
      return "Unable to sign in. Please try again.";
  }
}
