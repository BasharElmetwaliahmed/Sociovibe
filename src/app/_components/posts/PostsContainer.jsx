import Post from "./Post";

function PostsContainer({posts}) {
   return (
     <div className="flex flex-col gap-4 my-4 ">
       {posts.map((post) => (
         <Post post={post} key={post.id} />
       ))}
     </div>
   );
}

export default PostsContainer