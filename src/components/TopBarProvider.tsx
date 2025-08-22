"use client";
import React from "react";
import { usePathname, useParams } from "next/navigation";
import TopBarShell from "./TopBarShell";

const titles: Record<string, string> = {
  "atom-spectrum": "원자 스펙트럼",
  "energy-band": "에너지띠",
  "em-wave": "전자기파",
};

type TBState = {
  title?: React.ReactNode;
  showBack?: boolean;
  leftExtra?: React.ReactNode;
  right?: React.ReactNode;
};

const TopBarCtx = React.createContext<{
  set: React.Dispatch<React.SetStateAction<TBState>>;
}>({ set: () => {} });

export function TopBarProvider({
  children,
  brand = "WooPhysics",
}: {
  children: React.ReactNode;
  brand?: string;
}) {
  const pathname = usePathname();
  const params = useParams() as { slug?: string | string[] } | null;
  const raw = params?.slug;
  const slug = Array.isArray(raw) ? raw?.[0] : raw;

  const base: TBState = React.useMemo(() => {
    if (pathname === "/") return { title: brand, showBack: false };
    if (pathname?.startsWith("/topics"))
      return { title: "토픽 선택", showBack: true };
    if (pathname?.startsWith("/lesson/"))
      return { title: titles[slug ?? ""] ?? "레슨", showBack: true };
    return { title: brand, showBack: false };
  }, [pathname, slug, brand]);

  const [overrides, set] = React.useState<TBState>({});
  const merged = { ...base, ...overrides };

  return (
    <TopBarCtx.Provider value={{ set }}>
      {children}
      <TopBarShell
        title={merged.title}
        showBack={!!merged.showBack}
        leftExtra={merged.leftExtra}
        right={merged.right}
      />
    </TopBarCtx.Provider>
  );
}

// (선택) 특정 페이지에서만 우측 버튼/특수 타이틀 넣고 싶을 때 사용
export function useTopBar(config: TBState) {
  const { set } = React.useContext(TopBarCtx);
  React.useEffect(() => {
    set((prev) => ({ ...prev, ...config }));
    return () => set({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.title, config.showBack, config.leftExtra, config.right]);
}
