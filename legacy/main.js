import { receiveWeatherInfo } from "./WeatherInfo-reciver.js";
const weatherinfoUrl = "https://api.openweathermap.org/data/2.5/weather";
const weatherIcons = {
    "01d": "./icon/01_hare.png",
    "01n": "./icon/01n_moon.png",
    "02d": "./icon/02_hare_kumori.png",
    "02n": "./icon/02n_kumori_tsuki.png",
    "03": "./icon/03_kumori.png",
    "04": "./icon/04_kumori.png",
    "09": "./icon/09_niwakaame.png",
    "10": "./icon/10_ame.png",
    "11": "./icon/11_kaminari.png",
    "13": "./icon/13_yuki.png",
    "50": "./icon/50_kiri.png"
};
const queryNames = {
    Hirosima: "Hiroshima"
};
let params = {
    lang: "ja",
    q: "",
    appId: "(削除済みの旧キー)",
    units: "metric"
};
function render(city) {
    params.q = queryNames[city] ?? city;
    const queryParams = new URLSearchParams(params);
    const urlFull = `${weatherinfoUrl}?${queryParams}`;
    const promise = receiveWeatherInfo(urlFull);
    promise.then(function (weatherInfo) {
        // const text0 = `現在の${weatherInfo.cityName}の天気：${weatherInfo.weatherDesc}`
        const text1 = `${Math.round(weatherInfo.temp * 10) / 10}℃`;
        const text2 = `${weatherInfo.humidity}％`;
        const tempDiv2 = document.querySelector(`#temp-${city}-2`);
        // const message0 = document.querySelector(`#message-${city}-0`) as HTMLParagraphElement;
        const message1 = document.querySelector(`#message-${city}-1`);
        const message2 = document.querySelector(`#message-${city}-2`);
        const icon = document.querySelector(`#icon-${city}`);
        const ondo = document.querySelector(`#ondo-${city}`);
        const situdo = document.querySelector(`#situdo-${city}`);
        // message0.textContent = text0;
        message1.textContent = text1;
        message2.textContent = text2;
        // icon.src = `https://openweathermap.org/img/wn/${weatherInfo.iconId}@2x.png`;
        const iconPath = weatherIcons[weatherInfo.iconId] ?? weatherIcons[weatherInfo.iconId.slice(0, 2)];
        if (iconPath) {
            icon.src = iconPath;
        }
        if (weatherInfo.temp <= 0) {
            tempDiv2.classList.add("bg-violet-700");
        }
        else if (0 < weatherInfo.temp && weatherInfo.temp <= 5) {
            tempDiv2.classList.add("bg-indigo-700");
        }
        else if (5 < weatherInfo.temp && weatherInfo.temp <= 10) {
            tempDiv2.classList.add("bg-blue-500");
        }
        else if (10 < weatherInfo.temp && weatherInfo.temp <= 15) {
            tempDiv2.classList.add("bg-[#00A9F2]");
        }
        else if (15 < weatherInfo.temp && weatherInfo.temp <= 20) {
            tempDiv2.classList.add("bg-[#00FFEA]");
        }
        else if (20 < weatherInfo.temp && weatherInfo.temp <= 25) {
            tempDiv2.classList.add("bg-[#87FF47]");
        }
        else if (25 < weatherInfo.temp && weatherInfo.temp <= 30) {
            tempDiv2.classList.add("bg-[#FFE100]");
        }
        else if (30 < weatherInfo.temp && weatherInfo.temp <= 35) {
            tempDiv2.classList.add("bg-[#FF4400]");
        }
        else if (35 < weatherInfo.temp) {
            tempDiv2.classList.add("bg-[#940000]");
        }
        if (weatherInfo.temp <= 0) {
            ondo.src = `./icon/ondo0.png`;
        }
        else if (0 < weatherInfo.temp && weatherInfo.temp <= 10) {
            ondo.src = `./icon/ondo10.png`;
        }
        else if (10 < weatherInfo.temp && weatherInfo.temp <= 20) {
            ondo.src = `./icon/ondo20.png`;
        }
        else if (20 < weatherInfo.temp && weatherInfo.temp <= 30) {
            ondo.src = `./icon/ondo30.png`;
        }
        else if (30 < weatherInfo.temp) {
            ondo.src = `./icon/ondo40.png`;
        }
        if (0 <= weatherInfo.humidity && weatherInfo.humidity < 10) {
            situdo.src = `./icon/situdo0.png`;
        }
        else if (10 <= weatherInfo.humidity && weatherInfo.humidity < 30) {
            situdo.src = `./icon/situdo10.png`;
        }
        else if (30 <= weatherInfo.humidity && weatherInfo.humidity < 50) {
            situdo.src = `./icon/situdo30.png`;
        }
        else if (50 <= weatherInfo.humidity && weatherInfo.humidity < 70) {
            situdo.src = `./icon/situdo50.png`;
        }
        else if (70 <= weatherInfo.humidity && weatherInfo.humidity < 90) {
            situdo.src = `./icon/situdo70.png`;
        }
        else if (90 <= weatherInfo.humidity) {
            situdo.src = `./icon/situdo90.png`;
        }
    }).catch(function (error) {
        const text = `エラーが発生しました。\nエラー内容${error}`;
        const errorMes = document.querySelector(`#error-${city}`);
        errorMes.textContent = text;
    });
}
render("Asahikawa");
render("Sapporo");
render("Aomori");
render("Sendai");
render("Tokyo");
render("Niigata");
render("Osaka");
render("Nagoya");
render("Hirosima");
render("Kochi");
render("Fukuoka");
render("Kagoshima");
render("Naha");
