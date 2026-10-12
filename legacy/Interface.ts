// 天気情報JSONのデータ形式を定義したインターフェース
export interface WeatherInfoJSON {
    // 地理座標
    coord: {
        lon: number, // 経度
        lat: number // 緯度
    },
    // 天気情報
    weather: [
        {
            id: number, // 天気条件ID
            main: string, // 天気の状態グループ
            description: string, // 天気の状態
            icon: string // 天気アイコンID
        }
    ],
    base: string, // 観測データの取得元
    main: {
        temp: number, // 気温（標準はケルビン）
        feels_like: number, // 体感温度
        temp_min: number, // 現在観測地点における最低温度
        temp_max: number, // 現在観測地点における最高温度
        pressure: number, // 海面気圧（hPa）
        humidity: number, // 湿度（%）
        sea_level: number, // 海抜
        grnd_level: number // 観測地点の実際の地上気圧
    },
    visibility: number, // 視界（メートル単位）
    wind: {
        speed: number, // 風速
        deg: number, // 風向（度）
        gust: number // 突風
    },
    clouds: {
        all: number // 雲量（％）
    },
    dt: number, // データ計算時刻
    sys: {
        type: number, // 内部パラメータ
        id: number, // 内部パラメータ
        country: string, // 国コード
        sunrise: number, // 日の出時刻
        sunset: number // 日の入り時刻
    },
    timezone: number, // UTCからのシフト量（秒）
    id: number, // 都市ID
    name: string, // 都市名
    cod: number // 内部パラメータ
}