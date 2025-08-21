"use client";
import React from "react";

type Attempt = {
  itemId: string;
  try: number;
  correct: boolean;
  value?: string;
  time?: number;
  misconception?: string;
};
type Q3Option = "shorter" | "same" | "longer";
const q3Options: { id: Q3Option; label: string }[] = [
  { id: "shorter", label: "짧아진다(ΔE↑ → λ↓)" },
  { id: "same", label: "변하지 않는다" },
  { id: "longer", label: "길어진다" },
];

export default function FormativeQuiz() {
  const [attempts, setAttempts] = React.useState<Attempt[]>([]);
  const [tryIndex, setTryIndex] = React.useState<1 | 2>(1);
  const numOk = (val: string, target: number, tol: number) => {
    const v = Number(val.replace(",", "."));
    return Number.isFinite(v) && Math.abs(v - target) <= tol;
  };
  const [q1, setQ1] = React.useState("");
  const [q2e, setQ2e] = React.useState("");
  const [q2l, setQ2l] = React.useState("");
  const [q3, setQ3] = React.useState<Q3Option | "">("");

  const grade = () => {
    const res: Attempt[] = [];
    const c1 = numOk(q1, 656.5, 0.5);
    res.push({
      itemId: "F1",
      try: tryIndex,
      correct: c1,
      value: q1,
      misconception: c1 ? undefined : "unit_or_value",
    });
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
    const c3 = q3 === "shorter";
    res.push({
      itemId: "F3",
      try: tryIndex,
      correct: c3,
      value: q3 || "",
      misconception: c3 ? undefined : "inverse_relation",
    });
    setAttempts((prev) => {
      const filtered = prev.filter((a) => a.try !== tryIndex);
      return [...filtered, ...res];
    });
  };

  const pre = React.useMemo(() => {
    const a1 = attempts.filter((a) => a.try === 1);
    if (a1.length === 0) return null;
    return a1.filter((a) => a.correct).length / 3;
  }, [attempts]);
  const post = React.useMemo(() => {
    const a2 = attempts.filter((a) => a.try === 2);
    if (a2.length === 0) return null;
    return a2.filter((a) => a.correct).length / 3;
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
    const el = document.createElement("a");
    el.href = url;
    el.download = "responses.csv";
    el.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="not-prose">
      <div className="grid gap-6">
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
