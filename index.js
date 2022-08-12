async function GetWeatherData(location) {
  const weatherDataRaw = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location.toLowerCase()}&APPID=3300a32f8dd9d1fc070bc54499a5b81d&units=metric`,
    { mode: "cors" }
  );
  const weatherDataJSON = await weatherDataRaw.json();
  return weatherDataJSON;
}
class WeatherObject {
  constructor(city, temp, hum, wind, weather) {
    this.city = city;
    this.temperature = temp;
    this.humidity = hum;
    this.wind = wind;
    this.weather = weather;
  }
  GetTemperature(isCelsius) {
    if (isCelsius) {
      return this.temperature;
    } else {
      return this.temperature * 1.8 + 32;
    }
  }
}
async function GetWeatherObject(location) {
  const weatherDataJSON = await GetWeatherData(location);
  if (weatherDataJSON.cod === "404") {
    alert(weatherDataJSON.message);
    return null;
  } else {
    const weather = new WeatherObject(
      weatherDataJSON.name,
      weatherDataJSON.main.temp,
      weatherDataJSON.main.humidity,
      weatherDataJSON.wind.speed,
      weatherDataJSON.weather[0].description
    );
    return weather;
  }
}

async function logWeatherData() {
  const bp = await GetWeatherObject("Budapest");
  const l = await GetWeatherObject("London");
  const vp = await GetWeatherObject("Veszprém");
  const asd = await GetWeatherObject("asd");
  console.log(bp);
  console.log(l);
  console.log(vp);
  console.log(asd);
}
logWeatherData();
