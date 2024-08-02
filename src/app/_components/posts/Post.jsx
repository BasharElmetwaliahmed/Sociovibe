import Image from "next/image";
import Link from "next/link";
import Comments from "./Comments";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostText from "./PostText";

function Post({ post }) {
  return (
    <div className="py-4 px-4 md:px-8 bg-lightDark rounded-md">
      <PostHeader post={post} />
      <Link href={`/posts/${post?.id}`}>
        {post.text && <PostText text={post.text} />}
      </Link>
      <PostImage post={post} />
      <PostFooter post={post} />
      <Comments id={post.id} />

    </div>
  );
}

export default Post;
