"use client";

import { useEffect, useState } from "react";
import WeatherCard from "@/components/WeatherCard";
import { cities } from "@/lib/cities";
import type { WeatherResponse } from "@/lib/types";

export default function Home() {
  // data: /api/weather の結果。取得前は null。値が変わると React が画面を描き直す
  const [data, setData] = useState<WeatherResponse | null>(null);
  // hasError: /api/weather 自体の呼び出しに失敗したとき true(通信エラー、サーバーの 500 など)
  const [hasError, setHasError] = useState(false);

  // 画面が最初に表示されたとき(依存配列が [] なので1回だけ)、天気を取りに行く
  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/weather");
        // fetch は 404 や 500 でも例外にならないので、ok を自分で確かめて失敗扱いにする
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        setData(await response.json());
      } catch {
        setHasError(true);
      }
    }
    load();
  }, []);

  // 更新時刻の表示用の文字列。取得前は null
  const updatedText = data
    ? new Date(data.updatedAt).toLocaleString("ja-JP", { dateStyle: "medium", timeStyle: "short" })
    : null;

  // scale: 2000px の舞台を画面幅に合わせる倍率(旧版の index.html 末尾の script と同じ考え方)
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function fit() {
      setScale(Math.min(1, document.documentElement.clientWidth / 2000));
    }
    fit();
    window.addEventListener("resize", fit);
    // 画面を閉じるとき(アンマウント時)に、登録したイベントを外す後始末
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <>
      {/* relative z-10: 下の地図の舞台(負の margin で上に食い込む)より手前に出す */}
      <header className="relative z-10 px-4 py-4 text-center text-gray-800">
        <h1 className="text-3xl font-bold">全国天気</h1>
        <p className="mt-1 text-sm">
          データ取得元:
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            OpenWeatherMap
          </a>
          <span className="ml-4">更新: {updatedText ?? "取得中…"}</span>
        </p>
        {hasError && (
          // role="alert" は、スクリーンリーダーに「エラーが出た」と伝える印
          <p role="alert" className="mt-2 font-medium text-red-700">
            天気データを取得できませんでした。時間をおいて再読み込みしてください。
          </p>
        )}
      </header>

      <main
        className="relative -mt-50 mx-auto flex items-center justify-center w-[2000px] h-[2000px]"
        style={{ zoom: scale }}
      >
        {cities.map((city) => (
          // map で並べるときは、要素を見分けるための key が必要
          <WeatherCard
            key={city.id}
            city={city}
            weather={data?.weathers.find((w) => w.id === city.id)}
            // 全体の失敗、または、その都市だけ取得できなかったとき
            failed={hasError || (data?.failedIds.includes(city.id) ?? false)}
          />
        ))}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/chizu.png" alt="日本地図" className="w-375" />
      </main>
    </>
  );
}
