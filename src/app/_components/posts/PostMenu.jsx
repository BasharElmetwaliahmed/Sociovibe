"use client";
import { deletePostAction } from "@/app/_lib/action";
import {
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
  ClipboardIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import Menus from "../Menus";

function PostMenu({ post: { id, text } }) {
  return (
    <>
      <Menus>
        <Menus.Toggle id={id}>
          <EllipsisHorizontalIcon className="w-6 font-bold" />
        </Menus.Toggle>
        <Menus.List id={id}>
          <form action={deletePostAction}>
            <Menus.Button as="button" type="submit">
              <input type="hidden" name="postId" value={id} />
              <TrashIcon className="size-4" />
              delete
            </Menus.Button>
          </form>

          <Link href={`posts/${id}/edit`}>
            <Menus.Button>
              <PencilIcon className="size-4" />
              edit
            </Menus.Button>
          </Link>
          {text && (
            <Menus.Button
              click={() => {
                navigator.clipboard.writeText(
                  `${window.location.host}/posts/${id}`
                );
              }}>
              <ClipboardIcon className="size-4" />
              Copy
            </Menus.Button>
          )}
        </Menus.List>
      </Menus>
    </>
  );
}

export default PostMenu;
