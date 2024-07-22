import { signOutAction } from "@/app/_lib/action";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
function LogoutButton() {
  return (
    <form action={signOutAction}>
      <button
        className="flex gap-4 py-2 px-4 text-xl font-semibold items-center
              hover:bg-blue transition-all duration-300 hover:text-white rounded-md">
        <ArrowLeftStartOnRectangleIcon className="size-4" />
        <span> Logout</span>
      </button>
    </form>
  );
}

export default LogoutButton;
