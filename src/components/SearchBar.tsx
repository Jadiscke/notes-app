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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="flex flex-row justify-center items-center mr-4">
      <input
        type="text"
        placeholder="Search"
        className="w-full ml-4 rounded p-2 "
        onChange={handleChange}
        value={search}
      />
    </div>
  );
}
