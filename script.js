document.addEventListener('DOMContentLoaded', function () {
  const apiKey = '2caf547aba81d7842198ba305804ee91';
  const defaultCity = 'coimbatore';

  // Function to make a fetch request using Promise
  const fetchData = (url) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  };

  // Function to update UI with weather information
  const updateUI = (weatherData) => {
    const weatherInfoDiv = document.getElementById('weatherInfo');
    weatherInfoDiv.innerHTML = ''; // Clear previous data
console.log(weatherData);
    // Creating elements to display weather information
    const cityNameElement = document.createElement('h2');
    cityNameElement.textContent = `City: ${weatherData.name}`;

    const temperatureElement = document.createElement('p');
    temperatureElement.textContent = `Temperature: ${weatherData.main.temp} °C`;

    const humidityElement = document.createElement('p');
    humidityElement.textContent = `Humidity: ${weatherData.main.humidity}%`;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = `Description: ${weatherData.weather[0].description}`;

    const dateTimeElement = document.createElement('p');
    const dateTime = new Date(weatherData.dt * 1000); // Convert timestamp to date
    dateTimeElement.textContent = `Date and Time: ${dateTime.toLocaleString()}`;
    
function updateClock() {
    const dateTime = new Date();
    const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
};
    dateTimeElement.textContent = `${dateTime.toLocaleString('en-US', options)}`;
}
    
    // Update the clock every second (1000 milliseconds)
    setInterval(updateClock, 1000);
    
    // Initial call to set the clock immediately
    updateClock();
    
    dateTimeElement.classList.add('float-end');

    // Appending elements to the weatherInfoDiv
    weatherInfoDiv.appendChild(dateTimeElement);
    weatherInfoDiv.appendChild(cityNameElement);
    weatherInfoDiv.appendChild(temperatureElement);
    weatherInfoDiv.appendChild(humidityElement);
    weatherInfoDiv.appendChild(descriptionElement);

  };

  // Function to handle the search button click
  const searchWeather = () => {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value.trim() || defaultCity;

    const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetchData(weatherAPIUrl)
      .then(data => updateUI(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  // Set default weather for Coimbatore
  searchWeather();

  // Event listener for the search button
  const searchBtn = document.getElementById('searchBtn');
  searchBtn.addEventListener('click', searchWeather);
});
