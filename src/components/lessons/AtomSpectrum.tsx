"use client";
import React from "react";
import FormativeQuiz from "../FormativeQuiz";

export default function AtomSpectrum() {
  const [section, setSection] = React.useState<
    "intro" | "observe" | "model" | "formative" | "wrap"
  >("intro");
  const toc = [
    { id: "intro", label: "도입" },
    { id: "observe", label: "관찰" },
    { id: "model", label: "모델·식" },
    { id: "formative", label: "형성체크" },
    { id: "wrap", label: "정리" },
  ] as const;

  return (
    <div className="grid grid-cols-12 gap-6">
      <aside className="col-span-12 lg:col-span-3">
        <div className="sticky top-16 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 text-sm uppercase tracking-wider text-slate-400">
            Lesson
          </div>
          <h3 className="mb-4 text-xl font-semibold">원자 스펙트럼</h3>
          <nav className="flex flex-col gap-1">
            {toc.map((s) => (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className={
                  "rounded-xl px-3 py-2 text-left transition " +
                  (section === s.id
                    ? "bg-slate-900 text-white shadow-sm"
                    : "hover:bg-slate-50 text-slate-700")
                }
              >
                {s.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <section className="col-span-12 lg:col-span-9">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm prose prose-slate max-w-none">
          {section === "intro" && (
            <>
              <h2>도입 — 빛의 문법 읽기</h2>
              <p>
                네온사인과 수소 방전관의 빛을 분해하면 무지개 띠가 아니라{" "}
                <strong>선</strong>으로 나타납니다. 왜 띄엄띄엄일까요?
              </p>
              <ul>
                <li>핵심 질문: 모든 빛은 연속적인가?</li>
                <li>관찰 목표: 원소마다 선의 위치가 다름을 확인</li>
              </ul>
              <p>
                <em>한 문장:</em> “빛의 간격은 원자의{" "}
                <strong>에너지 준위</strong>라는 문법을 드러낸다.”
              </p>
            </>
          )}
          {section === "observe" && (
            <>
              <h2>관찰 — 스펙트럼 기록</h2>
              <table>
                <thead>
                  <tr>
                    <th>원소</th>
                    <th>선 색</th>
                    <th>파장 (nm)</th>
                    <th>강도</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>H</td>
                    <td>적</td>
                    <td>656</td>
                    <td>★ ★ ☆</td>
                  </tr>
                  <tr>
                    <td>H</td>
                    <td>청록</td>
                    <td>486</td>
                    <td>★ ★</td>
                  </tr>
                  <tr>
                    <td>H</td>
                    <td>청자주</td>
                    <td>434</td>
                    <td>★</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm text-slate-500">
                ※ 실제 수치는 장비에 따라 다소 차이
              </p>
            </>
          )}
          {section === "model" && (
            <>
              <h2>모델·식 — 전이와 파장</h2>
              <p>
                보어 모형에서 에너지 준위는{" "}
                <code>E_n = -13.6 Z^2 / n^2 (eV)</code>. 전이{" "}
                <code>n₂ → n₁</code>에 대한 방출 에너지는{" "}
                <code>ΔE = 13.6 Z^2 (1/n₁² - 1/n₂²)</code>,{" "}
                <code>λ = hc/ΔE</code>.
              </p>
              <div className="rounded-xl bg-slate-50 p-4">
                <strong>예제</strong> (Balmer, H: Z=1). <br />
                n₂=3 → n₁=2:
                <ul>
                  <li>ΔE = 13.6 (1/2² − 1/3²) ≈ 1.889 eV</li>
                  <li>λ = 1240 / 1.889 ≈ 656.3 nm</li>
                </ul>
              </div>
            </>
          )}
          {section === "formative" && (
            <>
              <h2>형성체크 — 3문항</h2>
              <FormativeQuiz />
            </>
          )}
          {section === "wrap" && (
            <>
              <h2>정리 — 한 문장</h2>
              <p>
                “선의 간격은 원자의 에너지 준위 문법이다. 전이가 클수록 빛은 더
                짧은 파장으로 나온다.”
              </p>
              <p className="text-sm text-slate-500">
                다음: Z가 커지면(He⁺) 문법은 어떻게 달라질까?
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
