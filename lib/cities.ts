// 13都市の情報をまとめたデータ。
// 旧版では index.html(位置・色)、main.ts(API用の名前)、<h1>(表示名)に散らばっていた。

export type City = {
  id: string; // 英字のID。React の key や API 応答との対応に使う
  name: string; // 画面に出す名前
  lat: number; // 緯度(OpenWeatherMap に渡す)
  lon: number; // 経度(OpenWeatherMap に渡す)
  top: number; // 地図上の位置(px)。旧版の 2000px 四方の画面が基準
  left: number;
  // Tailwind は文字列をそのまま探してクラスを作るので、クラス名は途中で組み立てず丸ごと書く
  cardBg: string; // カード全体の背景色
  barBg: string; // 気温・湿度を表示する帯の背景色
};

export const cities: City[] = [
  {
    id: "asahikawa",
    name: "旭川",
    lat: 43.7706,
    lon: 142.365,
    top: 250,
    left: 1400,
    cardBg: "bg-[#C3890C]/40",
    barBg: "bg-[#C3890C]/90",
  },
  {
    id: "sapporo",
    name: "札幌",
    lat: 43.0618,
    lon: 141.3545,
    top: 330,
    left: 1000,
    cardBg: "bg-[#C3890C]/40",
    barBg: "bg-[#C3890C]/90",
  },
  {
    id: "aomori",
    name: "青森",
    lat: 40.8244,
    lon: 140.74,
    top: 550,
    left: 1350,
    cardBg: "bg-sky-600/40",
    barBg: "bg-sky-600/90",
  },
  {
    id: "sendai",
    name: "仙台",
    lat: 38.2682,
    lon: 140.8694,
    top: 850,
    left: 1400,
    cardBg: "bg-sky-600/40",
    barBg: "bg-sky-600/90",
  },
  {
    id: "tokyo",
    name: "東京",
    lat: 35.6895,
    lon: 139.6917,
    top: 1150,
    left: 1350,
    cardBg: "bg-red-500/40",
    barBg: "bg-red-500/70",
  },
  {
    id: "niigata",
    name: "新潟",
    lat: 37.9161,
    lon: 139.0364,
    top: 680,
    left: 900,
    cardBg: "bg-lime-600/40",
    barBg: "bg-lime-600/90",
  },
  {
    id: "nagoya",
    name: "名古屋",
    lat: 35.1815,
    lon: 136.9066,
    top: 1300,
    left: 970,
    cardBg: "bg-lime-600/40",
    barBg: "bg-lime-600/90",
  },
  {
    id: "osaka",
    name: "大阪",
    lat: 34.6937,
    lon: 135.5023,
    top: 1000,
    left: 850,
    cardBg: "bg-yellow-500/40",
    barBg: "bg-yellow-500/90",
  },
  {
    id: "hiroshima",
    name: "広島",
    lat: 34.3853,
    lon: 132.4553,
    top: 950,
    left: 480,
    cardBg: "bg-purple-500/40",
    barBg: "bg-purple-500/90",
  },
  {
    id: "kochi",
    name: "高知",
    lat: 33.5597,
    lon: 133.5311,
    top: 1400,
    left: 600,
    cardBg: "bg-orange-600/40",
    barBg: "bg-orange-600/90",
  },
  {
    id: "fukuoka",
    name: "福岡",
    lat: 33.5904,
    lon: 130.4017,
    top: 1080,
    left: 110,
    cardBg: "bg-indigo-500/40",
    barBg: "bg-indigo-500/90",
  },
  {
    id: "kagoshima",
    name: "鹿児島",
    lat: 31.5966,
    lon: 130.5571,
    top: 1380,
    left: 170,
    cardBg: "bg-indigo-500/40",
    barBg: "bg-indigo-500/90",
  },
  {
    id: "naha",
    name: "那覇",
    lat: 26.2124,
    lon: 127.6809,
    top: 1700,
    left: 300,
    cardBg: "bg-rose-400/40",
    barBg: "bg-rose-400/90",
  },
];
