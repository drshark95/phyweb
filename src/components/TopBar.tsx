"use client";
import { useRouter } from "next/navigation";

export default function TopBar({ showBack = false }: { showBack?: boolean }) {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-40 w-full bg-white/70 backdrop-blur border-b border-slate-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => router.back()}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm shadow-sm hover:shadow transition"
            >
              ← 뒤로
            </button>
          )}
          <span className="text-lg font-semibold tracking-tight">
            Spectra.run
          </span>
        </div>
        <div className="text-sm text-slate-500">MVP 데모 · 우님 전용</div>
      </div>
    </div>
  );
}
