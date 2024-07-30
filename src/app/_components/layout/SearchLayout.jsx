"use client";
import { searchUsers } from "@/app/_lib/services";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import SearchFriends from "../SearchFriends";
import Spinner from "../Spinner";

function SearchLayout({ children }) {
  const searchParams = useSearchParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

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
  }, [searchParams]);
  if (loading) return <Spinner />;
  if (searchParams.get("search")) return <SearchFriends users={users} />;
  return children;
}

export default SearchLayout;
