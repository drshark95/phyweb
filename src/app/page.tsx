"use client";
import Link from "next/link";
import Fade from "@/components/Fade";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-10">
        <Fade routeKey="landing">
          <section className="grid place-items-center py-24 text-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                물리학, 주제 별로
                <span className="block bg-gradient-to-r from-slate-900 to-indigo-600 bg-clip-text text-transparent">
                  조작·이해·확인
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-slate-600">
                설치 없이 시작하는 과학 수업. 교사는 링크만, 학생은 브라우저만.
              </p>
              <div className="mt-10">
                <Link
                  href="/topics"
                  className="rounded-2xl bg-slate-900 px-8 py-3 text-white shadow-lg shadow-slate-900/10 hover:shadow-xl transition text-lg inline-block"
                >
                  시작하기
                </Link>
              </div>
            </div>
          </section>
        </Fade>
      </main>
    </div>
  );
}
