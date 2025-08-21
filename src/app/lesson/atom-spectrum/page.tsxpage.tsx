"use client";
import { useParams } from "next/navigation";
import Fade from "@/components/Fade";
import TopBar from "@/components/TopBar";
import AtomSpectrum from "@/components/lessons/AtomSpectrum";

const titles: Record<string, string> = {
  "atom-spectrum": "원자 스펙트럼",
  "energy-band": "에너지띠",
  "em-wave": "전자기파",
};

export default function LessonPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const title = titles[slug] || "레슨";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <TopBar showBack />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-10">
        <Fade routeKey={`lesson-${slug}`}>
          {slug === "atom-spectrum" ? (
            <AtomSpectrum />
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm prose prose-slate max-w-none">
              <h2>{title}</h2>
              <p>해당 토픽의 데모는 곧 추가됩니다.</p>
            </div>
          )}
        </Fade>
      </main>
    </div>
  );
}
