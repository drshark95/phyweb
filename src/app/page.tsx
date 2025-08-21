"use client";
import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Spectra.run — Single-file React prototype
 * - Landing → Topics → Lesson(사이드바+콘텐츠) 흐름
 * - 페이드 전환, 라운드 카드, 소프트 섀도우, 미니 토글 네비게이션
 * - TailwindCSS 필요(캔버스 미리보기에서 적용)
 */

export default function App() {
  type Step = "landing" | "topics" | "lesson";
  const [step, setStep] = useState<Step>("landing");
  const [topic, setTopic] = useState<string | null>(null);
  const [section, setSection] = useState<string>("intro");

  const topics = [
    { id: "atom-spectrum", title: "원자 스펙트럼", subtitle: "빛의 문법 읽기" },
    { id: "energy-band", title: "에너지띠", subtitle: "고체의 전자 상태" },
    { id: "em-wave", title: "전자기파", subtitle: "파동과 입자의 이중성" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <TopBar
        step={step}
        onBack={() => {
          if (step === "lesson") setStep("topics");
          else if (step === "topics") setStep("landing");
        }}
      />

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-10">
        <AnimatePresence mode="wait">
          {step === "landing" && (
            <Fade key="landing" routeKey="landing">
              <Landing onStart={() => setStep("topics")} />
            </Fade>
          )}

          {step === "topics" && (
            <Fade key="topics" routeKey="landing">
              <Topics
                topics={topics}
                onPick={(t) => {
                  setTopic(t.id);
                  setSection("intro");
                  setStep("lesson");
                }}
              />
            </Fade>
          )}

          {step === "lesson" && topic && (
            <Fade key="lesson" routeKey="landing">
              <Lesson
                topic={topic}
                title={topics.find((t) => t.id === topic)?.title || "레슨"}
                section={section}
                onSectionChange={setSection}
              />
            </Fade>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

function Fade({
  children,
  routeKey,
}: React.PropsWithChildren<{ routeKey?: React.Key }>) {
  return (
    <motion.div
      key={routeKey} // ← key는 여기서만 사용
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

function TopBar({ step, onBack }: { step: string; onBack: () => void }) {
  return (
    <div className="sticky top-0 z-40 w-full bg-white/70 backdrop-blur border-b border-slate-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {step !== "landing" && (
            <button
              onClick={onBack}
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

function Landing({ onStart }: { onStart: () => void }) {
  return (
    <section className="grid place-items-center py-24">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          한 차시를 10초 만에
          <span className="block bg-gradient-to-r from-slate-900 to-indigo-600 bg-clip-text text-transparent">
            실행·공유·측정
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-600">
          설치 없이 시작하는 과학 수업 웹 키트. 교사는 링크만, 학생은
          브라우저만.
        </p>
        <div className="mt-10">
          <button
            onClick={onStart}
            className="rounded-2xl bg-slate-900 px-8 py-3 text-white shadow-lg shadow-slate-900/10 hover:shadow-xl transition text-lg"
          >
            시작하기
          </button>
        </div>
      </div>
    </section>
  );
}

function Topics({
  topics,
  onPick,
}: {
  topics: { id: string; title: string; subtitle: string }[];
  onPick: (t: { id: string; title: string }) => void;
}) {
  return (
    <section>
      <header className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">토픽 선택</h2>
        <p className="text-slate-600">
          원하는 토픽을 선택하면 즉시 데모 레슨으로 이동합니다.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((t) => (
          <button
            key={t.id}
            onClick={() => onPick(t)}
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
          </button>
        ))}
      </div>
    </section>
  );
}

function Lesson({
  topic,
  title,
  section,
  onSectionChange,
}: {
  topic: string;
  title: string;
  section: string;
  onSectionChange: (id: string) => void;
}) {
  const toc = [
    { id: "intro", label: "도입" },
    { id: "observe", label: "관찰" },
    { id: "model", label: "모델·식" },
    { id: "formative", label: "형성체크" },
    { id: "wrap", label: "정리" },
  ];

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Sidebar */}
      <aside className="col-span-12 lg:col-span-3">
        <div className="sticky top-16 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 text-sm uppercase tracking-wider text-slate-400">
            Lesson
          </div>
          <h3 className="mb-4 text-xl font-semibold">{title}</h3>
          <nav className="flex flex-col gap-1">
            {toc.map((s) => (
              <button
                key={s.id}
                onClick={() => onSectionChange(s.id)}
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
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <Content topic={topic} section={section} />
        </div>
      </section>
    </div>
  );
}

function Content({ topic, section }: { topic: string; section: string }) {
  if (topic === "atom-spectrum") return <AtomSpectrum section={section} />;
  return (
    <div className="prose prose-slate max-w-none">
      <h2>준비 중</h2>
      <p>선택하신 토픽의 데모가 곧 추가됩니다.</p>
    </div>
  );
}

function AtomSpectrum({ section }: { section: string }) {
  return (
    <div className="prose prose-slate max-w-none">
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
            <em>한 문장:</em> “빛의 간격은 원자의 <strong>에너지 준위</strong>
            라는 문법을 드러낸다.”
          </p>
        </>
      )}

      {section === "observe" && (
        <>
          <h2>관찰 — 스펙트럼 기록</h2>
          <p>
            가상 분광기로 수소·네온·헬륨의 주요 선을 확인하고 표로 기록합니다.
          </p>
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
            <code>E_n = -13.6 Z^2 / n^2\, (eV)</code>로 근사합니다. 전이{" "}
            <code>n₂ → n₁</code>에 대해 방출 광자의 에너지는
            <code>ΔE = 13.6 Z^2 (1/n₁² - 1/n₂²)</code> 이고,{" "}
            <code>λ = hc/ΔE</code> 입니다.
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
          <h2>형성체크 — 3문항(재응답 허용)</h2>
          <FormativeQuiz />
        </>
      )}

      {section === "wrap" && (
        <>
          <h2>정리 — 한 문장</h2>
          <p>
            “선의 간격은 원자의 에너지 준위 문법이다. 전이가 클수록 빛은 더 짧은
            파장으로 나온다.”
          </p>
          <p className="text-sm text-slate-500">
            다음: Z가 커지면(He⁺) 문법은 어떻게 달라질까?
          </p>
        </>
      )}
    </div>
  );
}

function FormativeQuiz() {
  type Q3Option = "shorter" | "same" | "longer";

  const q3Options: { id: Q3Option; label: string }[] = [
    { id: "shorter", label: "짧아진다(ΔE↑ → λ↓)" },
    { id: "same", label: "변하지 않는다" },
    { id: "longer", label: "길어진다" },
  ];

  type Attempt = {
    itemId: string;
    try: number;
    correct: boolean;
    value?: string;
    time?: number;
    misconception?: string;
  };

  const [attempts, setAttempts] = React.useState<Attempt[]>([]);
  const [tryIndex, setTryIndex] = React.useState<1 | 2>(1);

  // 간단 채점 유틸
  const numOk = (val: string, target: number, tol: number) => {
    const v = Number(val.replace(",", "."));
    return Number.isFinite(v) && Math.abs(v - target) <= tol;
  };

  // Q1: 656.5 nm (±0.5)
  const [q1, setQ1] = React.useState("");
  // Q2: ΔE=2.856 eV (±0.05), λ=434.0 nm (±1.0)
  const [q2e, setQ2e] = React.useState("");
  const [q2l, setQ2l] = React.useState("");
  // Q3: 개념 선택형
  const [q3, setQ3] = React.useState<Q3Option | "">("");

  const grade = () => {
    const res: Attempt[] = [];

    // Q1
    const c1 = numOk(q1, 656.5, 0.5);
    res.push({
      itemId: "F1",
      try: tryIndex,
      correct: c1,
      value: q1,
      misconception: c1 ? undefined : "unit_or_value",
    });

    // Q2 (두 칸 모두 맞아야 정답)
    const c2e = numOk(q2e, 2.856, 0.05);
    const c2l = numOk(q2l, 434.0, 1.0);
    res.push({
      itemId: "F2",
      try: tryIndex,
      correct: c2e && c2l,
      value: `${q2e}, ${q2l}`,
      misconception:
        c2e && !c2l
          ? "lambda"
          : !c2e && c2l
          ? "energy"
          : !c2e && !c2l
          ? "both"
          : undefined,
    });

    // Q3
    const c3 = q3 === "shorter";
    res.push({
      itemId: "F3",
      try: tryIndex,
      correct: c3,
      value: q3,
      misconception: c3
        ? undefined
        : q3 === "longer"
        ? "inverse_relation"
        : "undecided",
    });

    setAttempts((prev) => {
      // 같은 tryIndex의 이전 기록 제거 후 추가(덮어쓰기 느낌)
      const filtered = prev.filter((a) => a.try !== tryIndex);
      return [...filtered, ...res];
    });
  };

  const pre = React.useMemo(() => {
    const a1 = attempts.filter((a) => a.try === 1);
    if (a1.length === 0) return null;
    const acc = a1.filter((a) => a.correct).length / 3;
    return acc;
  }, [attempts]);

  const post = React.useMemo(() => {
    const a2 = attempts.filter((a) => a.try === 2);
    if (a2.length === 0) return null;
    const acc = a2.filter((a) => a.correct).length / 3;
    return acc;
  }, [attempts]);

  const exportCSV = () => {
    const header = "item_id,try,correct,value,misconception\n";
    const rows = attempts
      .sort((a, b) => a.itemId.localeCompare(b.itemId) || a.try - b.try)
      .map(
        (a) =>
          `${a.itemId},${a.try},${a.correct ? 1 : 0},"${(
            a.value || ""
          ).replaceAll('"', '""')}",${a.misconception || ""}`
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "responses.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="not-prose">
      <div className="grid gap-6">
        {/* Try 토글 */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">시도</span>
          <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            {([1, 2] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTryIndex(t)}
                className={
                  "px-3 py-1.5 rounded-lg text-sm transition " +
                  (tryIndex === t
                    ? "bg-slate-900 text-white"
                    : "hover:bg-slate-50")
                }
              >
                {t}차
              </button>
            ))}
          </div>
          <button
            onClick={grade}
            className="ml-auto rounded-xl bg-indigo-600 px-4 py-2 text-white shadow hover:shadow-md"
          >
            채점하기
          </button>
        </div>

        {/* 문항 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-sm font-medium text-slate-500 mb-2">
            F1 · 단답
          </div>
          <div className="flex items-center gap-2">
            <span>수소 n₂=3→n₁=2 전이의 λ (nm):</span>
            <input
              className="rounded-lg border border-slate-300 px-3 py-1.5 outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="예: 656.5"
              value={q1}
              onChange={(e) => setQ1(e.target.value)}
              inputMode="decimal"
            />
            <span className="text-slate-400 text-sm">허용 오차 ±0.5</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-sm font-medium text-slate-500 mb-2">
            F2 · 계산(2칸)
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="flex items-center gap-2">
              <span>ΔE (eV):</span>
              <input
                className="rounded-lg border border-slate-300 px-3 py-1.5 outline-none focus:ring-2 focus:ring-indigo-200 w-full"
                placeholder="예: 2.856"
                value={q2e}
                onChange={(e) => setQ2e(e.target.value)}
                inputMode="decimal"
              />
            </label>
            <label className="flex items-center gap-2">
              <span>λ (nm):</span>
              <input
                className="rounded-lg border border-slate-300 px-3 py-1.5 outline-none focus:ring-2 focus:ring-indigo-200 w-full"
                placeholder="예: 434.0"
                value={q2l}
                onChange={(e) => setQ2l(e.target.value)}
                inputMode="decimal"
              />
            </label>
          </div>
          <div className="text-slate-400 text-sm mt-1">
            허용 오차: ΔE±0.05, λ±1.0
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-sm font-medium text-slate-500 mb-2">
            F3 · 개념
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {q3Options.map((opt) => (
              <label key={opt.id} className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="q3"
                  value={opt.id}
                  checked={q3 === opt.id}
                  onChange={() => setQ3(opt.id)}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 결과 카드 */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm text-slate-500">정답률(1차)</div>
            <div className="text-2xl font-semibold">
              {pre === null ? "—" : `${Math.round(pre * 100)}%`}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm text-slate-500">정답률(재응답)</div>
            <div className="text-2xl font-semibold">
              {post === null ? "—" : `${Math.round(post * 100)}%`}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm text-slate-500">향상도</div>
            <div className="text-2xl font-semibold">
              {pre !== null && post !== null
                ? `${Math.round((post - pre) * 100)} pp`
                : "—"}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={exportCSV}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm hover:shadow"
          >
            CSV 내보내기
          </button>
          <button
            onClick={() => {
              setAttempts([]);
              setTryIndex(1);
              setQ1("");
              setQ2e("");
              setQ2l("");
              setQ3("");
            }}
            className="rounded-xl bg-slate-900 px-4 py-2 text-white shadow hover:shadow-md"
          >
            리셋
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white/60 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-500 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div>© {new Date().getFullYear()} Spectra.run — Demo</div>
        <div className="flex flex-wrap gap-3">
          <span className="rounded-full bg-slate-100 px-3 py-1">
            페이드 전환
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1">
            토픽 → 레슨
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1">
            사이드바 네비
          </span>
        </div>
      </div>
    </footer>
  );
}
