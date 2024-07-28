"use client";
import Image from "next/image";
import React from "react";
import Modal from "../Modal";

function PostImage({ post }) {
  return (
    <>
      {" "}
      {post?.image && (
        <Modal>
          <Modal.Open name={`${post.id}`}>
            <div className="relative w-full h-64 mt-4 cursor-pointer">
              <Image
                src={post.image}
                fill
                className="rounded-md object-cover"
                alt={`${post.id}`}
              />
            </div>
          </Modal.Open>
          <Modal.Window openName={`${post.id}`}>
            <div className="relative w-[300px] md:w-[900px] aspect-square">
              <Image
                src={post.image}
                fill
                className="rounded-md object-cover "
                alt={`${post.id}`}
              />
            </div>
          </Modal.Window>
        </Modal>
      )}
    </>
  );
}

export default PostImage;
