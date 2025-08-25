"use client";
import Link from "next/link";
import Fade from "@/components/Fade";
import AutoMath from "@/components/math/AutoMath";

const topics = [
  {
    id: "atom-spectrum",
    title: "원자 스펙트럼",
    subtitle: "빛의 문법 읽기",
  },
  {
    id: "energy-band",
    title: "에너지띠",
    subtitle: "고체의 전자 상태 (준비 중)",
  },
  {
    id: "em-wave",
    title: "전자기파",
    subtitle: "파동과 입자의 이중성 (준비 중)",
  },
];

export default function TopicsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-10">
        <Fade routeKey="topics">
          <header className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Topics</h2>
            <p className="text-slate-600">
              원하는 토픽을 선택하면 즉시 데모 레슨으로 이동합니다.
            </p>
          </header>
          <AutoMath trigger="topics">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topics.map((t) => (
                <Link
                  key={t.id}
                  href={`/lesson/${t.id}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
                >
                  <div className="text-sm uppercase tracking-wide text-slate-400">
                    Physics
                  </div>
                  <div className="mt-1 text-xl font-semibold">{t.title}</div>
                  <div className="text-slate-500">{t.subtitle}</div>
                  <div className="mt-6 inline-flex items-center gap-2 text-indigo-600 font-medium">
                    들어가기{" "}
                    <span className="opacity-0 group-hover:opacity-100 transition">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </AutoMath>
        </Fade>
      </main>
    </div>
  );
}
