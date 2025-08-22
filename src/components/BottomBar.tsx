"use client";
import React from "react";

export default function BottomBar({
  top,
  footerLeft,
  footerCenter,
  footerRight,
}: {
  top?: React.ReactNode;
  footerLeft: React.ReactNode;
  footerCenter?: React.ReactNode;
  footerRight?: React.ReactNode;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      {top && (
        <div className="border-b border-slate-200/70">
          <div className="mx-auto max-w-6xl px-4 py-2">{top}</div>
        </div>
      )}
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3 pb-[env(safe-area-inset-bottom)]">
        <div className="flex-1 min-w-0 text-sm text-slate-600 truncate">
          {footerLeft}
        </div>
        <div className="hidden sm:flex justify-center text-sm text-slate-500 truncate">
          {footerCenter}
        </div>
        <div className="flex-1 flex justify-end">{footerRight}</div>
      </div>
    </div>
  );
}
