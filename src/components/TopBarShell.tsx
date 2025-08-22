"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function TopBarShell({
  title,
  showBack = false,
  leftExtra,
  right,
}: {
  title?: React.ReactNode;
  showBack?: boolean;
  leftExtra?: React.ReactNode;
  right?: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-white/70 backdrop-blur border-b border-slate-100">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center flex-nowrap">
        {/* Left */}
        <div className="flex-1 min-w-0 flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => router.back()}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm shadow-sm hover:shadow transition"
            >
              ← 뒤로
            </button>
          )}
          {leftExtra ? (
            <div className="hidden sm:block truncate">{leftExtra}</div>
          ) : null}
        </div>
        {/* Center */}
        <div className="flex-none mx-auto max-w-[72%] truncate whitespace-nowrap text-base sm:text-lg font-semibold tracking-tight text-center">
          {title}
        </div>
        {/* Right */}
        <div className="flex-1 flex items-center justify-end gap-2">
          {right}
        </div>
      </div>
    </div>
  );
}
