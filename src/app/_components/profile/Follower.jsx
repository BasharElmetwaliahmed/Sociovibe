import Image from "next/image";
function Follower({ follower }) {
  return (
    <div className="flex flex-col w-full h-full items-center gap-2">
      <div className="w-16 h-16 relative">
        <Image
          src={follower.avatar}
          sizes={64}
          className="object-cover rounded-full"
          fill
          alt={follower.fullName}
        />
      </div>
      <h4 className="text-xs font-semibold">
        {follower.fullName.split(" ")[0]}
      </h4>
    </div>
  );
}

export default Follower;
