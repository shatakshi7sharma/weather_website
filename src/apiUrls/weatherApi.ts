export const weatherApi = {
    getCitywiseWeather : (city:string) =>`https://api.weatherapi.com/v1/forecast.json?key=7c5e8a6bf11f4ade8c5162751230703&q=${city}&days=5`
}
weatherApi.getCitywiseWeather