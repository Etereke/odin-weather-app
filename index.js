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

async function GetWeatherData(location) {
  const weatherDataRaw = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location.toLowerCase()}&APPID=3300a32f8dd9d1fc070bc54499a5b81d&units=metric`,
    { mode: "cors" }
  );
  const weatherDataJSON = await weatherDataRaw.json();
  return weatherDataJSON;
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

async function setImgSrc(weatherString) {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=3Fj8LpWa2cnlbDLNxNph937V1axOJ2XY&s=weather: ${weatherString}`,
    { mode: "cors" }
  );
  const gif = await response.json();
  img.src = gif.data.images.original.url;
}

function DisplayWeather() {
  city.textContent = weatherObj.city;
  temperature.textContent = fahren.checked
    ? weatherObj.GetTemperature(false) + " °F"
    : weatherObj.GetTemperature(true) + " °C";
  humidity.textContent = weatherObj.humidity;
  wind.textContent = weatherObj.wind + " m/s";
  weather.textContent = weatherObj.weather;
  img.hidden = false;
  setImgSrc(weatherObj.weather);
}

const input = document.querySelector("#city");
const weatherBtn = document.querySelector(".weather-btn");
const city = document.querySelector(".location");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weather = document.querySelector(".weather");
const img = document.querySelector(".illustration");
const checkBox = document.querySelector("#fahren");
let weatherObj;

weatherBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (input.validity.valueMissing) {
    alert("Choose a location!");
  } else {
    const weatherTempObj = await GetWeatherObject(input.value);
    if (weatherTempObj) {
      weatherObj = weatherTempObj;
      DisplayWeather();
    }
  }
});
