'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useBottomBarTop } from '@/components/BottomBarProvider'
import AutoMath from '@/components/math/AutoMath'
import FormativeQuiz from '@/components/FormativeQuiz'
import { $, $$ } from '@/components/math/tags'

// ──────────────────────────────────────────────────────────────────────────────
// 📘 콘텐츠 입력 템플릿 (본문만 교체하세요)
// - 다섯 개 CELL(도입/관찰/모델·식/형성체크/정리) 안쪽의 텍스트와 마크업만 수정.
// - 수식: 인라인 {$`E=mc^2`} / 블록 {$$`\\int_0^1 x^2 dx`}
// - 이미지: <img src="/path" alt="설명" className="rounded-xl border" />
// - 표: <table> 그대로 수정.
// ──────────────────────────────────────────────────────────────────────────────

const TOC = [
  { id: 'intro', label: '도입' },
  { id: 'observe', label: '관찰' },
  { id: 'model', label: '모델·식' },
  { id: 'formative', label: '형성체크' },
  { id: 'wrap', label: '정리' },
] as const
type SectionId = (typeof TOC)[number]['id']

export default function AtomSpectrum() {
  const [section, setSection] = React.useState<SectionId>('intro')
  const router = useRouter()

  const handleComplete = React.useCallback(() => {
    router.push('/topics')
  }, [router])

  const topControls = React.useMemo(() => {
    const idx = Math.max(
      0,
      TOC.findIndex((s) => s.id === section),
    )
    const prev = idx > 0 ? TOC[idx - 1] : null
    const next = idx < TOC.length - 1 ? TOC[idx + 1] : null

    return (
      <div className="flex items-center gap-3">
        <button
          onClick={() => prev && setSection(prev.id)}
          disabled={!prev}
          className={
            'rounded-xl px-3 py-1.5 border text-sm shadow-sm ' +
            (prev
              ? 'bg-white hover:shadow border-slate-200'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed')
          }
        >
          ← 이전: {prev ? prev.label : '없음'}
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
    )
  }, [section, handleComplete])

  useBottomBarTop(topControls, [section])

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null
      const tag = el?.tagName?.toLowerCase()
      const typing = tag === 'input' || tag === 'textarea' || el?.isContentEditable
      if (typing) return
      const idx = TOC.findIndex((s) => s.id === section)
      if (idx < 0) return
      if (e.key === 'ArrowLeft' && idx > 0) {
        e.preventDefault()
        setSection(TOC[idx - 1].id)
      }
      if (e.key === 'ArrowRight' && idx < TOC.length - 1) {
        e.preventDefault()
        setSection(TOC[idx + 1].id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [section])

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Sidebar */}
      <aside className="col-span-12 lg:col-span-3">
        <div className="sticky top-16 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 text-sm uppercase tracking-wider text-slate-400">Lesson</div>
          <h3 className="mb-4 text-xl font-semibold">원자 스펙트럼</h3>
          <nav className="flex flex-col gap-1">
            {TOC.map((s) => (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className={
                  'rounded-xl px-3 py-2 text-left transition ' +
                  (section === s.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'hover:bg-slate-50 text-slate-700')
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
          <AutoMath trigger={section}>
            {/* ────────────────────────────────────────────────────────────────
               █ CELL A — 도입(INTRO)
               ▸ 목적: 학습 배경·맥락 제시, 핵심 질문 제안, 학습 목표 명료화
               ▸ 가이드: ① 한 문장 요약 ② 핵심 질문 ③ 학습목표(3개 내외)
               ─────────────────────────────────────────────────────────────── */}
            {section === 'intro' && (
              <>
                <h2>도입 — 여기 제목을 입력하세요</h2>
                <p>
                  [한 문장 요약] 이 레슨은 무엇을, 왜 배우는가? 학생의 경험/직관과 연결하여
                  2–3문장으로 서술하세요. 필요 시 인라인 수식 예: {$`E=mc^2`}.
                </p>
                <ul>
                  <li>[핵심 질문] 수업이 답하려는 큰 질문 1</li>
                  <li>[학습 목표] 지식/기능/태도 관점의 목표 2</li>
                  <li>[선행 개념] 수업 전에 알고 오면 좋은 것 3</li>
                </ul>
                <blockquote>
                  교사 멘트(선택): 학생에게 건네는 한 문장 메시지. 예) “이 레슨의 모든 길은 ‘에너지
                  차이’로 통합니다.”
                </blockquote>
              </>
            )}

            {/* ────────────────────────────────────────────────────────────────
               █ CELL B — 관찰(OBSERVE)
               ▸ 목적: 공통 경험 만들기(관찰·실험·시뮬레이션·데모)
               ▸ 가이드: ① 활동 지시 ② 기록 양식(표) ③ 토의 프롬프트
               ─────────────────────────────────────────────────────────────── */}
            {section === 'observe' && (
              <>
                <h2>관찰 — 활동 제목을 입력하세요</h2>
                <p>
                  [활동 지시] 무엇을 관찰/조작/기록하는지 구체적으로 씁니다. 필요 시 이미지 삽입
                  또는 링크를 제공합니다.
                </p>

                {/* 필요 시 이미지
                <img src="/images/demo.png" alt="관찰 장면" className="rounded-xl border" />
                */}

                <table>
                  <thead>
                    <tr>
                      <th>변수/대상</th>
                      <th>관찰 포인트</th>
                      <th>값/차이</th>
                      <th>비고</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>[예: H]</td>
                      <td>[예: 선의 색]</td>
                      <td>[예: 656 nm]</td>
                      <td>—</td>
                    </tr>
                    <tr>
                      <td>[예: He]</td>
                      <td>[예: 선의 수]</td>
                      <td>[예: 3개]</td>
                      <td>—</td>
                    </tr>
                  </tbody>
                </table>

                <ul>
                  <li>[토의] 무엇이 같고, 무엇이 다른가?</li>
                  <li>[토의] 차이를 설명할 후보 개념은 무엇인가?</li>
                </ul>
              </>
            )}

            {/* ────────────────────────────────────────────────────────────────
               █ CELL C — 모델·식(MODEL)
               ▸ 목적: 관찰을 설명하는 개념·공식·표현(모델) 구성
               ▸ 가이드: ① 핵심 정의 ② 기본 식 ③ 예제 ④ 주의할 오개념
               ─────────────────────────────────────────────────────────────── */}
            {section === 'model' && (
              <>
                <h2>모델·식 — 핵심 개념/공식 제목</h2>

                <h3>핵심 정의</h3>
                <p>여기에 개념 정의를 씁니다. 인라인 수식 예: {$`n_2 \\to n_1`}.</p>

                <h3>기본 식</h3>
                <p>
                  [공식 1] {$`\\text{여기에 핵심식 1}`} · [공식 2] {$`\\text{여기에 핵심식 2}`} .
                </p>
                <div className="my-4">
                  {$$`\\boxed{\\text{여기에 블록 수식 예: }\\;\\lambda = \\tfrac{hc}{\\Delta E}}`}
                </div>

                <h3>예제</h3>
                <ol>
                  <li>예제 1: 문제 서술 → 풀이의 핵심 단계(2–3줄) → 최종 답</li>
                  <li>예제 2: 변형 상황(매개변수 바꾸기, 단위 환산 등)</li>
                </ol>

                <h3>오개념 주의</h3>
                <ul>
                  <li>오개념 A: [간단 진단 문장]</li>
                  <li>오개념 B: [간단 진단 문장]</li>
                </ul>
              </>
            )}

            {/* ────────────────────────────────────────────────────────────────
               █ CELL D — 형성체크(FORMATIVE)
               ▸ 목적: 수업 중 즉시 확인(정답률/오답군/재응답 향상)
               ▸ 가이드: 안내 문장 1–2줄 + (기본) FormativeQuiz 컴포넌트 사용
               ─────────────────────────────────────────────────────────────── */}
            {section === 'formative' && (
              <>
                <h2>형성체크 — 안내 문구를 입력하세요</h2>
                <p>
                  [안내] 아래 문항에 응답해 보세요. 필요하면 <em>FormativeQuiz</em> 구성요소를
                  교체하거나 문항/채점 기준을 편집하세요.
                </p>
                <FormativeQuiz />
              </>
            )}

            {/* ────────────────────────────────────────────────────────────────
               █ CELL E — 정리(WRAP)
               ▸ 목적: 한 문장 수렴, 다음 차시로의 연결 고리 제시
               ▸ 가이드: ① 한 문장 정리 ② 오늘의 문법 ③ 다음 질문
               ─────────────────────────────────────────────────────────────── */}
            {section === 'wrap' && (
              <>
                <h2>정리 — 한 문장 요약</h2>
                <p>[정리 문장] 오늘 배운 핵심 아이디어를 한 문장으로 수렴하세요.</p>
                <ul>
                  <li>
                    [오늘의 문법] 예: {$`\\Delta E \\uparrow \\Rightarrow \\lambda \\downarrow`}
                  </li>
                  <li>[다음 질문] 예: “핵전하가 커지면 이 문법은 어떻게 달라질까?”</li>
                </ul>
              </>
            )}
          </AutoMath>
        </div>
      </section>
    </div>
  )
}
