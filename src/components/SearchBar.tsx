"use client";

import { debounce } from "@/lib/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [search, setSearch] = useState("");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const handleSearch = useCallback(
    debounce((search: string) => {
      router.push(pathname + "?" + createQueryString("search", search));
    }, 500),
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    handleSearch(e.target.value);
  };

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  return (
    <div className="">
      <input
        type="text"
        placeholder="Search"
        className="w-full mr-10 rounded p-2 "
        onChange={handleChange}
        value={search}
      />
    </div>
  );
}
