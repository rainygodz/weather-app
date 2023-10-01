const getLocationWeather = async (location) => {
  const API_KEY = 'ea842fa0cfae4a50af1122219232709';
  const URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`;
  const response = await fetch(URL);
  const currentWeather = await response.json();
  return currentWeather.current;
};

const processJsonData = async (data) => {
  const currentWeather = {
    date: data.last_updated.split(' ')[1],
    text: data.condition.text,
    icon: `https:${data.condition.icon}`,
    tempC: Math.floor(data.temp_c),
    feelslikeC: data.feelslike_c,
    tempF: Math.floor(data.temp_f),
    feelslikeF: data.feelslike_f,
    wind: `${data.wind_kph} kph`,
    precipitation: `${data.precip_mm} mm`,
  };

  return currentWeather;
};

let tempF;
let tempC;

const displayCurrentWeather = async (location) => {
  const errorCard = document.querySelector('.error-card');
  errorCard.style.display = 'none';
  const weatherCard = document.querySelector('.weather-card');
  weatherCard.style.display = 'none';

  try {
    const data = await getLocationWeather(location);
    const currentWeather = await processJsonData(data);

    tempF = currentWeather.tempF;
    tempC = currentWeather.tempC;

    const weatherCard = document.querySelector('.weather-card');
    const icon = document.querySelector('#icon');
    const temp = document.querySelector('.temperature > h2');
    const precipitation = document.querySelector('#precipitation');
    const wind = document.querySelector('#wind');
    const weatherText = document.querySelector('.weather-text');
    const weatherTitle = document.querySelector('.city-title');

    weatherTitle.textContent = `Current weather in ${location}`;
    icon.src = currentWeather.icon;
    temp.textContent = currentWeather.tempC;
    precipitation.textContent = `Precipitation: ${currentWeather.precipitation}`;
    wind.textContent = `Wind: ${currentWeather.wind}`;
    weatherText.textContent = currentWeather.text;

    weatherCard.style.display = 'flex';
  } catch (err) {
    const errorCard = document.querySelector('.error-card');
    errorCard.style.display = 'flex';
  }
};

const switchTempUnits = (event) => {
  const unit = event.srcElement;
  const unitId = unit['id'];
  const temp = document.querySelector('.temperature > h2');

  if (unitId == 'fahrenheit') {
    unit.classList.add('selected');
    document.getElementById('celcius').classList.remove('selected');
    temp.textContent = tempF;
  } else {
    unit.classList.add('selected');
    document.getElementById('fahrenheit').classList.remove('selected');
    temp.textContent = tempC;
  }
};

const fahrenheit = document.getElementById('fahrenheit');
const celcius = document.getElementById('celcius');
fahrenheit.addEventListener('click', switchTempUnits);
celcius.addEventListener('click', switchTempUnits);

const searchInput = document.querySelector('.search-field > input');
searchInput.addEventListener('keyup', (e) => {
  const city = searchInput.value;
  if (e.key === 'Enter' || e.keyCode === 13) {
    displayCurrentWeather(city);
  }
});
