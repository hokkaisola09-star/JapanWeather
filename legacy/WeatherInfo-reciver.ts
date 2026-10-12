import { WeatherInfo } from "./WeatherInfo.ts";

export async function receiveWeatherInfo (url: string): Promise<WeatherInfo> {

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const weatherInfoJSON = await response.json();
  return new WeatherInfo(weatherInfoJSON);
}