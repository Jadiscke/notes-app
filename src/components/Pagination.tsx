"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

function getNextPages(totalPages: number, actualPage: number): number[] {
  const nextPages = [];
  for (let i = actualPage + 1; i <= totalPages && i <= actualPage + 3; i++) {
    if (i > actualPage) {
      nextPages.push(i);
    }
  }
  return nextPages;
}

function getPreviousPages(actualPage: number): number[] {
  const previousPages = [];
  for (let i = actualPage; i > actualPage - 3 && i > 0; i--) {
    if (i < actualPage) {
      previousPages.push(i);
    }
  }
  return previousPages.reverse();
}

export default function Pagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    if (searchParams.get("page") === null) {
      router.push(pathname + "?" + createQueryString("page", "1"));
    }
  }, [createQueryString, pathname, router, searchParams]);

  const actualPage = Number(searchParams.get("page"));
  const nextPages = getNextPages(totalPages, actualPage);
  const previousPages = getPreviousPages(actualPage);

  return (
  <div className="grid grid-cols-[1fr_auto_1fr] gap-2 pb-4 justify-center items-center flex-row">
      <div className="flex justify-center items-center gap-2 flex-row">
        {previousPages.length > 0 && (
          <Link
            href={
              pathname +
              "?" +
              createQueryString("page", (Number(actualPage) - 1).toString())
            }
          >
            <ChevronLeft size={20} />
          </Link>
        )}
        {previousPages.map((page) => (
          <Link
            href={pathname + "?" + createQueryString("page", page.toString())}
            key={page}
          >
            {page}
          </Link>
        ))}
      </div>
      <div className="flex justify-center  items-center flex-row">
        {<p className="font-bold"> {actualPage} </p>}
      </div>
      <div className="flex gap-2 items-center justify-center flex-row">
        {nextPages.map((page) => (
          <Link
            href={pathname + "?" + createQueryString("page", page.toString())}
            key={page}
          >
            {page}
          </Link>
        ))}
        {nextPages.length > 0 && (
          <Link
            href={
              pathname +
              "?" +
              createQueryString("page", (Number(actualPage) + 1).toString())
            }
          >
            <ChevronRight size={20} />
          </Link>
        )}
      </div>
    </div>
  );
}
