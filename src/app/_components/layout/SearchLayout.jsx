"use client";
import { searchUsers } from "@/app/_lib/services";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SearchFriends from "../SearchFriends";
import Spinner from "../Spinner";

function SearchLayout({ children }) {
  const searchParams = useSearchParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const changeUsers = async (search) => {
    setLoading(true);
    try {
      const fetchedUsers = await searchUsers(search);
      setUsers(fetchedUsers);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (searchParams.get("search")) changeUsers(searchParams.get("search"));
  }, [searchParams, pathname]);
  if (loading)
    return (
      <div className="h-layout flex justify-center items-center">
        <Spinner />
      </div>
    );

  if (searchParams.get("search")) return <SearchFriends  users={users} />;
  return children;
}

export default SearchLayout;
