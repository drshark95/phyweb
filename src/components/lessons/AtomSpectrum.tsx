'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useBottomBarTop } from '@/components/BottomBarProvider'
import AutoMath from '@/components/math/AutoMath'
import FormativeQuiz from '@/components/FormativeQuiz'
import { $, $$ } from '@/components/math/tags'

// ──────────────────────────────────────────────────────────────────────────────
// 📘 편집 가이드 (이 파일은 콘텐츠 입력용 메인 파일입니다)
// 1) 본문 입력 위치
//    - return 안에서 다음 다섯 개 CELL 구간을 찾아 편집하세요.
//      ▸ █ CELL A — 도입(INTRO)
//      ▸ █ CELL B — 관찰(OBSERVE)
//      ▸ █ CELL C — 모델·식(MODEL)
//      ▸ █ CELL D — 형성체크(FORMATIVE)
//      ▸ █ CELL E — 정리(WRAP)
//
// 2) 수식 입력
//    - 인라인:  {$`\\lambda = \\frac{hc}{\\Delta E}`}
//    - 블록:    {$$`\\int_0^\\infty e^{-x^2}\\,dx = \\frac{\\sqrt{\\pi}}{2}`}
//    - AutoMath가 감싼 범위에서 자동 렌더됩니다.
//
// 3) 표/이미지
//    - 표는 <table> 그대로 수정. 이미지 필요 시 <img src="/path" alt="..."/> 사용.
//
// 4) 네비게이션/바텀바
//    - 상·하단 내비 로직은 구성되어 있으므로 본문만 편집하시면 됩니다.
// ──────────────────────────────────────────────────────────────────────────────

// TOC 상수(참조 안정)
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

  // 마지막 섹션에서 "학습완료" → 토픽 목록으로 이동
  const handleComplete = React.useCallback(() => {
    router.push('/topics')
    // router.back()  // ← 브라우저 '뒤로'처럼 동작시키려면 이 줄로 교체
  }, [router])

  // BottomBar 상단행: 이전/다음 내비 + 상태표시
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

  // BottomBar 상단행 주입(섹션 바뀔 때만 갱신)
  useBottomBarTop(topControls, [section])

  // 방향키 섹션 내비(입력 중엔 비활성, 마지막 섹션에선 → 미동작)
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
          {/* ────────────────────────────────────────────────────────────────
             █ CELL A — 도입(INTRO)
             ▸ 이 섹션은 이야기의 ‘문을 여는’ 부분입니다.
             ▸ 텍스트, 간단한 수식(인라인), 핵심 질문/목표를 자유롭게 편집하세요.
             ─────────────────────────────────────────────────────────────── */}
          <AutoMath trigger={section}>
            {section === 'intro' && (
              <>
                {/* ▼▼▼▼▼ 여기부터 도입(문단/리스트/수식) 편집 ▼▼▼▼▼ */}
                <h2>도입 — 빛의 문법 읽기</h2>
                <p>
                  네온사인과 수소 방전관의 빛을 분해하면 무지개 띠가 아니라 <strong>선</strong>으로
                  나타납니다. 왜 띄엄띄엄일까요?
                </p>
                <ul>
                  <li>핵심 질문: 모든 빛은 연속적인가?</li>
                  <li>관찰 목표: 원소마다 선의 위치가 다름을 확인</li>
                </ul>
                <p>
                  <em>한 문장:</em> “빛의 간격은 원자의 <strong>에너지 준위</strong>라는 문법을
                  드러낸다.”
                </p>
                {/* ▲▲▲▲▲ 도입 편집 끝 ▲▲▲▲▲ */}
              </>
            )}

            {/* ────────────────────────────────────────────────────────────────
               █ CELL B — 관찰(OBSERVE)
               ▸ 스펙트럼 표/이미지/관찰 활동 안내를 넣으세요.
               ▸ 표는 <table> 그대로 수정, 이미지 추가 시 <img> 사용.
               ─────────────────────────────────────────────────────────────── */}
            {section === 'observe' && (
              <>
                {/* ▼▼▼▼▼ 여기부터 관찰 섹션 편집 ▼▼▼▼▼ */}
                <h2>관찰 — 스펙트럼 기록</h2>
                <p>가상 분광기로 수소·네온·헬륨의 주요 선을 확인하고 표로 기록합니다.</p>

                {/* 필요 시 이미지 삽입 예시:
                <img src="/spectrometer.png" alt="가상 분광기" className="rounded-xl border" />
                */}

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
                <p className="text-sm text-slate-500">※ 실제 수치는 장비에 따라 차이</p>
                {/* ▲▲▲▲▲ 관찰 편집 끝 ▲▲▲▲▲ */}
              </>
            )}

            {/* ────────────────────────────────────────────────────────────────
               █ CELL C — 모델·식(MODEL)
               ▸ 핵심 공식을 인라인/블록 수식으로 입력하세요.
               ▸ 인라인: {$`E = mc^2`}  /  블록: {$$`\\frac{1}{\\lambda}=\\cdots`}
               ─────────────────────────────────────────────────────────────── */}
            {section === 'model' && (
              <>
                {/* ▼▼▼▼▼ 여기부터 모델·식 섹션 편집 ▼▼▼▼▼ */}
                <h2>모델·식 — 전이와 파장</h2>
                <p>
                  보어 모형에서 에너지 준위는 {$`E_n = -13.6\,Z^2/n^2`} (eV)로 근사합니다. 전이{' '}
                  {$`n_2 \to n_1`}에 대해 방출 광자의 에너지는{' '}
                  {$`\Delta E = 13.6\,Z^2\!\left(\frac{1}{n_1^2} - \frac{1}{n_2^2}\right)`}, 파장은{' '}
                  {$`\lambda = \frac{hc}{\Delta E}`} 입니다.
                </p>

                <div className="rounded-xl bg-slate-50 p-4">
                  <strong>예제</strong> (Balmer, {$`Z=1`}). {$`n_2=3 \to n_1=2`}:
                  <ul>
                    <li>
                      {$`\Delta E = 13.6\!\left(\frac{1}{2^2}-\frac{1}{3^2}\right) \approx 1.889\ \mathrm{eV}`}
                    </li>
                    <li>{$`\lambda = \frac{1240}{1.889} \approx 656.3\ \mathrm{nm}`}</li>
                  </ul>
                </div>

                {/* 블록 수식 예시 필요 시 활성화
                {$$`\frac{1}{\lambda} = R_H\left(\frac{1}{n_1^2}-\frac{1}{n_2^2}\right)`}
                */}
                {/* ▲▲▲▲▲ 모델·식 편집 끝 ▲▲▲▲▲ */}
              </>
            )}

            {/* ────────────────────────────────────────────────────────────────
               █ CELL D — 형성체크(FORMATIVE)
               ▸ FormativeQuiz 컴포넌트(자동 채점) 영역입니다.
               ▸ 문항을 바꾸려면 FormativeQuiz 컴포넌트를 수정하세요.
               ─────────────────────────────────────────────────────────────── */}
            {section === 'formative' && (
              <>
                {/* ▼▼▼▼▼ 여기부터 형성체크 섹션 편집(설명/지시문만) ▼▼▼▼▼ */}
                <h2>형성체크 — 3문항</h2>
                <FormativeQuiz />
                {/* ▲▲▲▲▲ 형성체크 편집 끝 ▲▲▲▲▲ */}
              </>
            )}

            {/* ────────────────────────────────────────────────────────────────
               █ CELL E — 정리(WRAP)
               ▸ 수업을 한 문장으로 마무리하거나 다음 차시 연결 힌트를 적으세요.
               ▸ 필요 시 간단한 개념 화살표를 블록 수식으로 넣어도 좋습니다.
               ─────────────────────────────────────────────────────────────── */}
            {section === 'wrap' && (
              <>
                {/* ▼▼▼▼▼ 여기부터 정리 섹션 편집 ▼▼▼▼▼ */}
                <h2>정리 — 한 문장</h2>
                <p>
                  “선의 간격은 원자의 에너지 준위 문법이다. 전이가 클수록 빛은 더 짧은 파장으로
                  나온다.” {$$`\Delta E \uparrow \Rightarrow \lambda \downarrow`}
                </p>
                {/* ▲▲▲▲▲ 정리 편집 끝 ▲▲▲▲▲ */}
              </>
            )}
          </AutoMath>
        </div>
      </section>
    </div>
  )
}
