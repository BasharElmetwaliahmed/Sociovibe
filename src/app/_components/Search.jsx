"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const onSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (search.trim() === "") {
      params.delete("search");
    } else params.set("search", search);
    router.replace(`${pathname}?${params}`, {
      scroll: false,
    });
  };
  const searchChange = (e) => {
    if (e.target.value.trim() === "") {
      console.log(true);
      const params = new URLSearchParams(searchParams);
      params.delete("search");
      router.replace(`${pathname}?${params}`, {
        scroll: false,
      });
    }
    setSearch(e.target.value);
  };

  return (
    <form
      onSubmit={onSubmit}
      className=" text-lightBlue bg-lightDark  rounded-md  relative w-1/2 md:w-[300px] mx-2">
      <label
        htmlFor="search"
        className="absolute left-2 top-1/2 -translate-y-1/2">
        <MagnifyingGlassIcon className="w-6 " />
      </label>
      <input
        onChange={searchChange}
        value={search}
        type="text"
        placeholder="search for user"
        id="search"
        className="w-full bg-transparent py-2 pl-10 pr-4  border-2 border-transparent focus:border-blue focus:text-blue transition-all duration-300 rounded-md outline-none"
      />
    </form>
  );
}

export default Search;
