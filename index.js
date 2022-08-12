async function GetWeatherData(location) {
  const weatherDataRaw = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=3300a32f8dd9d1fc070bc54499a5b81d`,
    { mode: "cors" }
  );
  const weatherDataJSON = await weatherDataRaw.json();
  return weatherDataJSON;
}

async function logWeatherData() {
  const bp = await GetWeatherData("Budapest");
  const l = await GetWeatherData("London");
  const vp = await GetWeatherData("Veszprém");
  //   const asd = await GetWeatherData("asd");
  console.log(bp);
  console.log(l);
  console.log(vp);
  //   console.log(asd);
}
logWeatherData();
