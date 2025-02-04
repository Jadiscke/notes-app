"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className="bg-black text-white p-2 rounded"
      onClick={() => router.back()}
    >
      <ArrowLeftIcon size={20} data-testid="arrow-left-icon" />
    </button>
  );
}
