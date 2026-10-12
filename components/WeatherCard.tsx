import type { City } from "@/lib/cities";
import type { CityWeather } from "@/lib/types";
import { getHumidityIcon, getTempColor, getTempIcon, getWeatherIcon } from "@/lib/weatherStyle";

// 1都市分の表示。旧版では index.html に13回コピペしていた部分。
// props(city, weather)を受け取って見た目を返すだけの関数なので、中で状態は持たない。
type Props = {
  city: City;
  weather?: CityWeather; // まだ取得できていないとき(読み込み中・失敗)は undefined
  failed?: boolean; // weather がない理由が「取得に失敗した」のとき true(false なら読み込み中)
};

export default function WeatherCard({ city, weather, failed = false }: Props) {
  const weatherIcon = weather ? getWeatherIcon(weather.iconId) : undefined;
  // 「名古屋」「鹿児島」のような3文字の名前は、余白を詰めないと折り返してしまう
  const isLongName = city.name.length >= 3;

  return (
    <div
      className={`absolute w-[320px] px-7 py-4 rounded-xl shadow-lg ${city.cardBg}`}
      // top / left は数値が1都市ごとに違う。Tailwind のクラスは動的に作れないので style で渡す
      style={{ top: city.top, left: city.left }}
    >
      <div
        className={`flex justify-center items-center rounded-xl shadow-lg ${
          weather ? getTempColor(weather.temp) : ""
        }`}
      >
        <div className="bg-white/80 flex items-center px-3 my-4 rounded-xl">
          <h2 className={`text-4xl text-gray-800 font-medium ${isLongName ? "" : "px-2"}`}>
            {city.name}
          </h2>
          {/* 画像は public/ の小さな固定アイコンで、高さも自分で指定しているので <img> を使う */}
          {weather && weatherIcon && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={weatherIcon}
              alt={`${city.name}の天気:${weather.description}`}
              className={`h-25 ${isLongName ? "my-2" : "m-2"}`}
            />
          )}
        </div>
      </div>

      <div
        className={`flex items-center justify-center mt-4 py-2 px-4 rounded-xl text-xl text-white font-medium ${city.barBg}`}
      >
        {weather ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={getTempIcon(weather.temp)} alt="気温" className="h-[40px]" />
            <p className="ml-2">{Math.round(weather.temp * 10) / 10}℃</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={getHumidityIcon(weather.humidity)} alt="湿度" className="h-[40px] ml-8" />
            <p className="ml-2">{weather.humidity}％</p>
          </>
        ) : (
          <p>{failed ? "取得できませんでした" : "読み込み中…"}</p>
        )}
      </div>
    </div>
  );
}
