const apiKey = '1f07019e238b443b7b5e1f17c0c7dac6';  // Replace with your OpenWeatherMap API key
const getWeatherBtn = document.getElementById('getWeatherBtn');
const temperatureElement = document.getElementById('temperature');
const conditionsElement = document.getElementById('conditions');
const moodElement = document.getElementById('mood');
const locationElement = document.getElementById('location');

// Fetch weather data based on the user's location
async function getWeather() {
    // Get user location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Fetch weather data using OpenWeatherMap API
            const weatherData = await fetchWeatherData(lat, lon);
            
            // Display weather and mood-based insights
            displayWeather(weatherData);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Fetch weather data from the OpenWeatherMap API
async function fetchWeatherData(lat, lon) {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
            lat: lat,
            lon: lon,
            appid: apiKey,
            units: 'metric'  // Celsius
        }
    });
    return response.data;
}

// Display the weather information and mood-based suggestions
function displayWeather(data) {
    const { main, weather, name } = data;
    
    const temp = main.temp;
    const condition = weather[0].main;

    // Display temperature and conditions
    temperatureElement.textContent = `Temperature: ${temp}°C`;
    conditionsElement.textContent = `Conditions: ${condition}`;

    // Display mood-based suggestions
    let moodText = '';
    if (condition === 'Clear') {
        moodText = 'It\'s a sunny day! Perfect for a walk outside.';
    } else if (condition === 'Rain') {
        moodText = 'It\'s raining! A good day to stay cozy indoors with a book.';
    } else if (condition === 'Clouds') {
        moodText = 'It\'s cloudy! A calm day to relax or work.';
    } else {
        moodText = 'Enjoy the day, whatever the weather!';
    }
    moodElement.textContent = moodText;

    // Display location
    locationElement.textContent = `Location: ${name}`;
}

// Initialize the app with weather data
getWeatherBtn.addEventListener('click', getWeather);

// Load the weather data when the page loads
window.onload = () => {
    getWeather();
};
