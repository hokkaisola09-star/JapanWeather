export class WeatherInfo {
    constructor(weatherInfoJSON) {
        this._weatherInfoJSON = weatherInfoJSON;
    }
    get cityName() {
        return this._weatherInfoJSON.name;
    }
    get latitude() {
        return this._weatherInfoJSON.coord.lat;
    }
    get longitude() {
        return this._weatherInfoJSON.coord.lon;
    }
    get weatherDesc() {
        return this._weatherInfoJSON.weather[0].description;
    }
    get temp() {
        return this._weatherInfoJSON.main.temp;
    }
    get humidity() {
        return this._weatherInfoJSON.main.humidity;
    }
    get iconId() {
        return this._weatherInfoJSON.weather[0].icon;
    }
}
