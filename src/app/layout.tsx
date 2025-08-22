import "./globals.css";
import type { Metadata } from "next";
import { TopBarProvider } from "@/components/TopBarProvider";
import { BottomBarProvider } from "@/components/BottomBarProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://phyweb-ten.vercel.app"),
  title: {
    default: '"WooPhysics',
    template: '%s | "WooPhysics', // 하위 페이지가 제목 지정 시 자동으로 뒤에 브랜드 붙음
  },
  description: "과학 수업 웹 키트",
  openGraph: {
    title: '"WooPhysics',
    description: "과학 수업 웹 키트",
    url: "/",
    siteName: '"WooPhysics',
    images: ["/og.png"], // /public/og.png 준비해두면 공유 카드에 썸네일 표시
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900 pt-14 pb-28">
        <TopBarProvider brand="WooPhysics">
          <BottomBarProvider
            email="drshark@snu.ac.kr"
            brand="WooPhysics"
            centerNote={<span className="text-sm">데모 환경</span>}
          >
            {children}
          </BottomBarProvider>
        </TopBarProvider>
      </body>
    </html>
  );
}
