import { DateTime } from "luxon";
const API_KEY = "d0162c175744e79a2f6b372738b29d54";
// https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric
// https://api.openweathermap.org/data/2.5/weather?q=Garhwa,IN&units=metric&appid=d0162c175744e79a2f6b372738b29d54
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// The getWeatherData function takes two parameters: infoType and searchParams. It constructs a URL to the OpenWeatherMap API
// based on the provided parameters, then fetches the weather data and returns it as a JSON object.
const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  console.log(url);
  return fetch(url).then((res) => res.json());
};

//  This function is used to transform the raw API response into a more usable format.
const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

// formatForecastWeather takes weather data, extracts timezone, daily, and hourly forecasts, 
// then formats the hourly forecast for the next 5 hours with local time, temperature, and weather icon, returning an object with these formatted values.

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
 
  hourly = hourly.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

// retrieves and formats current weather data based on given search 
// parameters, then logs the formatted data and returns it as an object.
const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;
  console.log(formattedCurrentWeather);
  return {
    ...formattedCurrentWeather,
  };
};

// npm i luxon
// it returns the formatted date and time string.
const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

//  It constructs the URL with the OpenWeatherMap API and the specific icon
//  code to retrieve the corresponding weather icon image.
const iconURLFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconURLFromCode };
