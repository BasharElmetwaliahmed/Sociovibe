import FollowersFollowingContainer from "@/app/_components/FollowersFollowingContainer";
import SearchFriends from "@/app/_components/SearchFriends";
import { auth } from "@/app/_lib/auth";
import React from "react";
export const metadata = {
  title: "Following",
};
async function Page({ searchParams }) {
  const session = await auth();
  const following = session.user.following;
  const g = [
    {
      id: 2,
      fullName: "bashar bashar",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocKURgxYEvREmG60UXahNA24gy-Yag9UgXde3sTbwIdVY4kq8Q=s96-c",
    },
    {
      id: 3,
      fullName: "bashar bah",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocKURgxYEvREmG60UXahNA24gy-Yag9UgXde3sTbwIdVY4kq8Q=s96-c",
    },
    {
      id: 4,
      fullName: "bashar bashar",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocKURgxYEvREmG60UXahNA24gy-Yag9UgXde3sTbwIdVY4kq8Q=s96-c",
    },
    {
      id: 5,
      fullName: "bashar bashar",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocKURgxYEvREmG60UXahNA24gy-Yag9UgXde3sTbwIdVY4kq8Q=s96-c",
    },
    {
      id: 6,
      fullName: "bashar bashar",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocKURgxYEvREmG60UXahNA24gy-Yag9UgXde3sTbwIdVY4kq8Q=s96-c",
    },
    {
      id: 7,
      fullName: "bashar bashar",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocKURgxYEvREmG60UXahNA24gy-Yag9UgXde3sTbwIdVY4kq8Q=s96-c",
    },
    {
      id: 8,
      fullName: "bashar bashar",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocKURgxYEvREmG60UXahNA24gy-Yag9UgXde3sTbwIdVY4kq8Q=s96-c",
    },
    {
      id: 9,
      fullName: "bashar bashar",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocKURgxYEvREmG60UXahNA24gy-Yag9UgXde3sTbwIdVY4kq8Q=s96-c",
    },
    {
      id: 9,
      fullName: "bashar bashar",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocKURgxYEvREmG60UXahNA24gy-Yag9UgXde3sTbwIdVY4kq8Q=s96-c",
    },
    {
      id: 10,
      fullName: "bashar bashar",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocKURgxYEvREmG60UXahNA24gy-Yag9UgXde3sTbwIdVY4kq8Q=s96-c",
    },
    {
      id: 11,
      fullName: "bashar bashar",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocKURgxYEvREmG60UXahNA24gy-Yag9UgXde3sTbwIdVY4kq8Q=s96-c",
    },
    {
      id: 11,
      fullName: "bashar bashar",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocKURgxYEvREmG60UXahNA24gy-Yag9UgXde3sTbwIdVY4kq8Q=s96-c",
    },
    {
      id: 11,
      fullName: "bashar bashar",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocKURgxYEvREmG60UXahNA24gy-Yag9UgXde3sTbwIdVY4kq8Q=s96-c",
    },
    {
      id: 11,
      fullName: "bashar bashar",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocKURgxYEvREmG60UXahNA24gy-Yag9UgXde3sTbwIdVY4kq8Q=s96-c",
    },
  ];
  return (
    <div>
      {searchParams?.search ? (
        <SearchFriends search={searchParams.search} />
      ) : (
        <FollowersFollowingContainer
          items={g}
          following={g}
          label={"Following"}
        />
      )}
    </div>
  );
}

export default Page;
