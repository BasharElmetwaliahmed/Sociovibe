'use client'
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import Follower from "./Follower";

function ProfileFollowers({ followers }) {
  return (
    <Swiper spaceBetween={3} slidesPerView={5} >
      {followers.map((follower) => (
        <SwiperSlide key={follower.id}>
          <Link href={`/profile/${follower.id}`} className="block w-20 h-20">
            <Follower follower={follower} />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ProfileFollowers;
