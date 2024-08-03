"use client";
import { deletePostAction } from "@/app/_lib/action";
import { useFormStatus } from "react-dom";

import {
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
  ClipboardIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import Menus from "../Menus";
import SpinnerMini from "../SpinnerMini";
import { usePathname } from "next/navigation";

function PostMenu({ post: { id, text } }) {
  const pathname = usePathname();
  const path =
    pathname.split("/")[1] === "posts" && pathname.split("/").length == 3;

  return (
    <>
      <Menus>
        <Menus.Toggle id={id}>
          <EllipsisHorizontalIcon className="w-6 font-bold" />
        </Menus.Toggle>
        <Menus.List id={id}>
          {!path && (
            <form action={deletePostAction}>
              <input type="hidden" name="postId" value={id} />
              <input type="hidden" name="pathname" value={pathname} />
              <DeleteButton />
            </form>
          )}

          <Link href={`/posts/${id}/edit`}>
            <Menus.Button>
              <PencilIcon className="size-4" />
              edit
            </Menus.Button>
          </Link>
          {
            <Menus.Button
              click={() => {
                navigator.clipboard.writeText(
                  `${window.location.host}/posts/${id}`
                );
              }}>
              <ClipboardIcon className="size-4" />
              Copy
            </Menus.Button>
          }
        </Menus.List>
      </Menus>
    </>
  );
}

const DeleteButton = () => {
  const { pending } = useFormStatus();
  return (
    <Menus.Button disabled={pending} type="submit">
      {pending ? (
        <SpinnerMini />
      ) : (
        <>
          {" "}
          <TrashIcon className="size-4" />
          delete
        </>
      )}
    </Menus.Button>
  );
};
export default PostMenu;
