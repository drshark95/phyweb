'use client'
import React from 'react'
import renderMathInElement from 'katex/contrib/auto-render'

type AutoMathProps = {
  children: React.ReactNode
  /** 수식 재스캔 트리거(섹션 id 등). 바뀔 때만 다시 렌더링 */
  trigger?: string | number | boolean
}

export default function AutoMath({ children, trigger }: AutoMathProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!ref.current) return
    renderMathInElement(ref.current, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\[', right: '\\]', display: true },
        { left: '\\(', right: '\\)', display: false },
      ],
      throwOnError: false,
    })
  }, [children, trigger]) // ✅ 정적 의존성: 경고 없음

  return <div ref={ref}>{children}</div>
}
