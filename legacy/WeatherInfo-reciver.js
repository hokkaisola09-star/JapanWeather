import { WeatherInfo } from "./WeatherInfo.js";
export async function receiveWeatherInfo(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    const weatherInfoJSON = await response.json();
    return new WeatherInfo(weatherInfoJSON);
}
