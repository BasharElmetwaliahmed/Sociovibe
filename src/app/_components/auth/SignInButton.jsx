import { signUpAction } from "@/app/_lib/action";

// import { signUpAction } from "@/src/app/_lib/action";
function SignInButton() {
  return (
    <form action={signUpAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium text-white hover:bg-blue rounded-md transition-all duration-300">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
