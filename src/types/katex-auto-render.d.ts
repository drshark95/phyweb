// src/types/katex-auto-render.d.ts
declare module "katex/contrib/auto-render" {
  type Delimiter = { left: string; right: string; display: boolean };

  interface RenderMathInElementOptions {
    delimiters?: Delimiter[];
    ignoredTags?: string[];
    ignoredClasses?: string[];
    errorCallback?: (msg: string, err: Error) => void;
    throwOnError?: boolean;
  }

  const renderMathInElement: (
    el: HTMLElement,
    options?: RenderMathInElementOptions
  ) => void;
  export default renderMathInElement;
}
