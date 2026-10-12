import { cities, type City } from "@/lib/cities";
import type { CityWeather, WeatherResponse } from "@/lib/types";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";

// 1都市分の天気を取得し、画面に必要な項目だけを返す
async function fetchCityWeather(city: City, apiKey: string): Promise<CityWeather> {
  const params = new URLSearchParams({
    lat: String(city.lat),
    lon: String(city.lon),
    units: "metric",
    lang: "ja",
    appid: apiKey,
  });
  const response = await fetch(`${API_URL}?${params}`);
  if (!response.ok) {
    // URL(キーを含む)をエラーに入れないよう、ステータスだけを伝える
    throw new Error(`${city.id}: HTTP ${response.status}`);
  }
  const data = await response.json();
  return {
    id: city.id,
    temp: data.main.temp,
    humidity: data.main.humidity,
    iconId: data.weather[0].icon,
    description: data.weather[0].description,
  };
}

export async function GET() {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "サーバーにAPIキーが設定されていません" }, { status: 500 });
  }

  // 13都市を同時に取得する。1つ失敗しても他は使えるよう allSettled を使う
  const results = await Promise.allSettled(cities.map((city) => fetchCityWeather(city, apiKey)));

  const weathers: CityWeather[] = [];
  const failedIds: string[] = [];
  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      weathers.push(result.value);
    } else {
      failedIds.push(cities[i].id);
    }
  });

  const body: WeatherResponse = {
    updatedAt: new Date().toISOString(),
    weathers,
    failedIds,
  };
  return Response.json(body);
}
