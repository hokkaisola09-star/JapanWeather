import type { Metadata } from "next";
import { M_PLUS_1 } from "next/font/google";
import "./globals.css";

// 旧版と同じフォント(M PLUS 1)。next/font を使うと、ビルド時に取り込まれて高速に表示される
const mPlus1 = M_PLUS_1({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "全国天気",
  description: "全国13都市の現在の天気・気温・湿度を日本地図の上に表示します",
  robots: { index: false, follow: false }, // 旧版の noindex, nofollow を引き継ぐ
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={mPlus1.className}>
      <body className="bg-sky-200 tracking-wider">{children}</body>
    </html>
  );
}
