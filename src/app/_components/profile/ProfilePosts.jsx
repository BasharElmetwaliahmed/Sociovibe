"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import ProfilePostImage from "./ProfilePostImage";

function ProfilePosts({ posts }) {
  return (
    <Swiper
      spaceBetween={2}
      slidesPerView={3}
      breakpoints={{
        640: {
          spaceBetween: 2,
          slidesPerView: 5,
        },
        768: {
          spaceBetween: 4,
          slidesPerView: 5,
        },
      }}>
      {posts.map((post) => (
        <SwiperSlide key={post.id}>
          <Link href={`/posts/${post.id}`}>
            <ProfilePostImage image={post?.image} />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ProfilePosts;
