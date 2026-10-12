// 気温・湿度・天気アイコンIDから、表示に使う色や画像を決める関数。
// 旧版の main.ts にあった長い if / else if の連鎖を、「しきい値の表」にまとめ直したもの。

// 気温ごとの背景色。「max 以下なら、この色」を上から順に探す。
// Tailwind はクラス名を文字列のまま探すので、クラス名は組み立てずに丸ごと書く。
const tempColors = [
  { max: 0, className: "bg-violet-700" },
  { max: 5, className: "bg-indigo-700" },
  { max: 10, className: "bg-blue-500" },
  { max: 15, className: "bg-[#00A9F2]" },
  { max: 20, className: "bg-[#00FFEA]" },
  { max: 25, className: "bg-[#87FF47]" },
  { max: 30, className: "bg-[#FFE100]" },
  { max: 35, className: "bg-[#FF4400]" },
  { max: Infinity, className: "bg-[#940000]" },
];

// 気温ごとの温度計アイコン
const tempIcons = [
  { max: 0, src: "/icon/ondo0.png" },
  { max: 10, src: "/icon/ondo10.png" },
  { max: 20, src: "/icon/ondo20.png" },
  { max: 30, src: "/icon/ondo30.png" },
  { max: Infinity, src: "/icon/ondo40.png" },
];

// 湿度ごとのアイコン。「max 未満なら、この画像」を上から順に探す。
const humidityIcons = [
  { max: 10, src: "/icon/situdo0.png" },
  { max: 30, src: "/icon/situdo10.png" },
  { max: 50, src: "/icon/situdo30.png" },
  { max: 70, src: "/icon/situdo50.png" },
  { max: 90, src: "/icon/situdo70.png" },
  { max: Infinity, src: "/icon/situdo90.png" },
];

// 天気アイコンID(OpenWeatherMap の "01d" など)と画像の対応。
// 01・02 は昼(d)と夜(n)で画像が違い、それ以外は昼夜共通なので数字2桁だけで引く。
const weatherIcons: { [key: string]: string } = {
  "01d": "/icon/01_hare.png",
  "01n": "/icon/01n_moon.png",
  "02d": "/icon/02_hare_kumori.png",
  "02n": "/icon/02n_kumori_tsuki.png",
  "03": "/icon/03_kumori.png",
  "04": "/icon/04_kumori.png",
  "09": "/icon/09_niwakaame.png",
  "10": "/icon/10_ame.png",
  "11": "/icon/11_kaminari.png",
  "13": "/icon/13_yuki.png",
  "50": "/icon/50_kiri.png",
};

export function getTempColor(temp: number): string {
  // find は「条件に合う最初の1つ」を返す。最後の行は Infinity なので必ず見つかる
  return tempColors.find((row) => temp <= row.max)!.className;
}

export function getTempIcon(temp: number): string {
  return tempIcons.find((row) => temp <= row.max)!.src;
}

export function getHumidityIcon(humidity: number): string {
  return humidityIcons.find((row) => humidity < row.max)!.src;
}

// 対応する画像がない ID のときは undefined を返す
export function getWeatherIcon(iconId: string): string | undefined {
  return weatherIcons[iconId] ?? weatherIcons[iconId.slice(0, 2)];
}
