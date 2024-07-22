import Image from "next/image";

function ProfilePostImage({ image }) {
  return (
    <div className="relative w-[86px] h-[78px] ">
      <Image src={image?image : '/images.png'} priority={true} sizes={86}  fill className=" object-cover  " alt="post img" />
    </div>
  );
}

export default ProfilePostImage