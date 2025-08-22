"use client";
import React from "react";
import BottomBar from "./BottomBar";

type Ctx = {
  setTop: (node: React.ReactNode) => void;
};
const BottomBarContext = React.createContext<Ctx>({ setTop: () => {} });

export function BottomBarProvider({
  children,
  email,
  brand = "Spectra.run",
  centerNote,
  rightSlot,
}: {
  children: React.ReactNode;
  email: string;
  brand?: string;
  centerNote?: React.ReactNode;
  rightSlot?: React.ReactNode;
}) {
  const [top, setTop] = React.useState<React.ReactNode>(null);

  return (
    <BottomBarContext.Provider value={{ setTop }}>
      {children}
      <BottomBar
        top={top}
        footerLeft={
          <span>
            © {new Date().getFullYear()} {brand} · {email}
          </span>
        }
        footerCenter={centerNote}
        footerRight={rightSlot}
      />
    </BottomBarContext.Provider>
  );
}

/**
 * 레슨 등에서 BottomBar 상단행을 주입하는 훅
 * - content: 렌더링할 노드(메모이즈 권장)
 * - deps: 언제 갱신할지 제어(예: [section])
 */
export function useBottomBarTop(
  content: React.ReactNode,
  deps: React.DependencyList = []
) {
  const { setTop } = React.useContext(BottomBarContext);

  // 직전 노드를 기억해 동일 레퍼런스면 setState 생략(렌더 루프 방지)
  const lastRef = React.useRef<React.ReactNode>(null);

  React.useEffect(() => {
    if (lastRef.current !== content) {
      lastRef.current = content;
      setTop(content);
    }
    return () => {
      // 언마운트 시 깨끗이 비우기
      setTop(null);
      lastRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
