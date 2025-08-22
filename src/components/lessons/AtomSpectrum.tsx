"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useBottomBarTop } from "@/components/BottomBarProvider";

// 컴포넌트 밖: TOC 상수(참조 안정)
const TOC = [
  { id: "intro", label: "도입" },
  { id: "observe", label: "관찰" },
  { id: "model", label: "모델·식" },
  { id: "formative", label: "형성체크" },
  { id: "wrap", label: "정리" },
] as const;
type SectionId = (typeof TOC)[number]["id"];

export default function AtomSpectrum() {
  const [section, setSection] = React.useState<SectionId>("intro");
  const router = useRouter();

  // 마지막 섹션에서 눌렀을 때 토픽 목록으로 이동
  const handleComplete = React.useCallback(() => {
    router.push("/topics"); // 항상 토픽 선택 페이지로
    // router.back()                 // ← “뒤로”처럼 동작시키고 싶으면 이 줄로 바꿔도 됩니다.
  }, [router]);

  // 상단 행(이전/다음) 컨트롤: 섹션 변경시에만 재생성
  const topControls = React.useMemo(() => {
    const idx = Math.max(
      0,
      TOC.findIndex((s) => s.id === section)
    );
    const prev = idx > 0 ? TOC[idx - 1] : null;
    const next = idx < TOC.length - 1 ? TOC[idx + 1] : null;

    return (
      <div className="flex items-center gap-3">
        <button
          onClick={() => prev && setSection(prev.id)}
          disabled={!prev}
          className={
            "rounded-xl px-3 py-1.5 border text-sm shadow-sm " +
            (prev
              ? "bg-white hover:shadow border-slate-200"
              : "bg-slate-100 text-slate-400 cursor-not-allowed")
          }
        >
          ← 이전: {prev ? prev.label : "없음"}
        </button>
        <div className="ml-1 text-sm text-slate-600">
          섹션 {idx + 1} / {TOC.length} · <strong>{TOC[idx].label}</strong>
        </div>
        <div className="ml-auto">
          {next ? (
            <button
              onClick={() => setSection(next.id)}
              className="rounded-xl bg-slate-900 px-3 py-1.5 text-white text-sm shadow hover:shadow-md"
            >
              다음: {next.label} →
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="rounded-xl bg-indigo-600 px-3 py-1.5 text-white text-sm shadow hover:shadow-md"
            >
              학습완료
            </button>
          )}
        </div>
      </div>
    );
  }, [section, handleComplete]);

  // 섹션이 바뀔 때만 BottomBar 상단행 주입
  useBottomBarTop(topControls, [section]);

  // 방향키로 섹션 이동 (입력 중일 땐 무시)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // 인풋/텍스트영역/콘텐츠에디터 포커스면 키 내비게이션 차단
      const el = e.target as HTMLElement | null;
      const tag = el?.tagName?.toLowerCase();
      const typing =
        tag === "input" || tag === "textarea" || el?.isContentEditable;

      if (typing) return;

      const idx = TOC.findIndex((s) => s.id === section);
      if (idx < 0) return;

      if (e.key === "ArrowLeft" && idx > 0) {
        e.preventDefault();
        setSection(TOC[idx - 1].id);
      }
      if (e.key === "ArrowRight" && idx < TOC.length - 1) {
        e.preventDefault();
        setSection(TOC[idx + 1].id);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [section]);

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Sidebar */}
      <aside className="col-span-12 lg:col-span-3">
        <div className="sticky top-16 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 text-sm uppercase tracking-wider text-slate-400">
            Lesson
          </div>
          <h3 className="mb-4 text-xl font-semibold">원자 스펙트럼</h3>
          <nav className="flex flex-col gap-1">
            {TOC.map((s) => (
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

      {/* Content */}
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
                ※ 실제 수치는 장비에 따라 차이
              </p>
            </>
          )}

          {section === "model" && (
            <>
              <h2>모델·식 — 전이와 파장</h2>
              <p>
                보어 모형: <code>E_n = -13.6 Z^2 / n^2</code> (eV), 전이{" "}
                <code>n₂→n₁</code>의 방출 에너지는
                <code> ΔE = 13.6 Z^2 (1/n₁² - 1/n₂²) </code>,{" "}
                <code>λ = hc/ΔE</code>.
              </p>
              <div className="rounded-xl bg-slate-50 p-4">
                <strong>예제</strong> (Balmer, H: Z=1). n₂=3 → n₁=2:
                <ul>
                  <li>ΔE ≈ 1.889 eV</li>
                  <li>λ ≈ 656.3 nm</li>
                </ul>
              </div>
            </>
          )}

          {section === "formative" && (
            <>
              <h2>형성체크 — 3문항</h2>
              {/* FormativeQuiz 컴포넌트 넣으셨다면 여기 삽입 */}
            </>
          )}

          {section === "wrap" && (
            <>
              <h2>정리 — 한 문장</h2>
              <p>
                “선의 간격은 원자의 에너지 준위 문법이다. 전이가 클수록 파장은
                더 짧아진다.”
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
