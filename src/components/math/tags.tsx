import React from "react";

/** 템플릿 리터럴로 라텍스를 입력하면 $…$/$$…$$로 감싸 반환하는 태그 함수들
 *  사용 예:
 *    인라인  → {$`\\lambda = \\frac{hc}{\\Delta E}`}
 *    블록    → {$$`\\int_0^\\infty e^{-x^2}\,dx = \\frac{\\sqrt{\\pi}}{2}`}
 *
 *  주의: AutoMath(KaTeX auto-render)로 감싸진 영역 안에서 사용하세요.
 */
export type MathTagFn = (
  strings: TemplateStringsArray,
  ...expr: Array<string | number | boolean>
) => React.ReactElement;

export const $: MathTagFn = (s, ...e) => (
  <span>{`$${String.raw(s, ...e)}$`}</span>
);
export const $$: MathTagFn = (s, ...e) => (
  <div>{`$$${String.raw(s, ...e)}$$`}</div>
);
