// /api/weather が返すデータの形。サーバー(route.ts)と画面の両方から使う。
// OpenWeatherMap の巨大な JSON から、画面に必要な項目だけを取り出したもの。

export type CityWeather = {
  id: string; // cities.ts の id と対応する
  temp: number; // 気温(℃)
  humidity: number; // 湿度(%)
  iconId: string; // 天気アイコンID("01d" など)
  description: string; // 天気の説明(「晴れ」など。代替テキストに使う)
};

export type WeatherResponse = {
  updatedAt: string; // 取得時刻(ISO 形式)
  weathers: CityWeather[]; // 取得できた都市
  failedIds: string[]; // 取得に失敗した都市の id
};
