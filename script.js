const getLocationWeather = async (location) => {
  const API_KEY = 'ea842fa0cfae4a50af1122219232709';
  const URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`;
  const response = await fetch(URL);
  const currentWeather = await response.json();
  return currentWeather.current;
};

const processJsonData = async (data) => {
  const currentWeather = {
    date: data.last_updated,
    text: data.condition.text,
    icon: data.condition.icon,
    tempC: data.temp_c,
    feelslikeC: data.feelslike_c,
    tempF: data.temp_f,
    feelslikeF: data.feelslike_f,
    wind: `${data.wind_kph}kph`,
  };

  return currentWeather;
};

const displayCurrentWeather = async () => {
  const data = await getLocationWeather('London');
  const currentWeather = await processJsonData(data);

  console.log(currentWeather);
};

displayCurrentWeather();
