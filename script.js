function getWeather() {
    const apiKey = '3028476b81b1814645cefa4461568678';
    const location = document.getElementById('locationInput').value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');
            if (data.cod === 200) {
                const { name, weather, main, wind, sys, visibility } = data;
                const { description } = weather[0];
                const { temp, feels_like, humidity } = main;
                const { speed, deg } = wind;
                const { sunrise, sunset } = sys;
                weatherInfo.innerHTML = `
                    <h3>${name}</h3>
                    <table>
                        <tr><td>Weather:</td><td>  ${description} ${getEmojiForWeather(description)}</td></tr>
                        <tr><td>Temperature:</td><td>  ${temp}°C ${getEmojiForTemperature(temp)}</td></tr>
                        <tr><td>Feels like:</td><td>${feels_like}°C ${getEmojiForTemperature(feels_like)}</td></tr>
                        <tr><td>Humidity:</td><td>${humidity}% ${getEmojiForHumidity(humidity)}</td></tr>
                        <tr><td>Wind:</td><td>${speed} m/s ${getWindDirection(deg)}</td></tr>
                        <tr><td>Visibility:</td><td>${visibility / 1000} km</td></tr>
                        <tr><td>Sunrise:</td><td>${formatTime(sunrise)} 🌅</td></tr>
                        <tr><td>Sunset:</td><td>${formatTime(sunset)} 🌇</td></tr>
                    </table>
                `;
            } else {
                weatherInfo.innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}


function getWindDirection(degree) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degree / 45) % 8;
    return directions[index];
}

function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

function getEmojiForWeather(weatherDescription) {
    switch (weatherDescription.toLowerCase()) {
        case 'clear':
            return '☀️';
        case 'clouds':
            return '☁️';
        case 'rain':
            return '🌧️';
        case 'drizzle':
            return '🌧️';
        case 'thunderstorm':
            return '⛈️';
        case 'snow':
            return '❄️';
        default:
            return '';
    }
}

function getEmojiForTemperature(temperature) {
    if (temperature >= 30) {
        return '🔥';
    } else if (temperature <= 10) {
        return '❄️';
    } else {
        return '';
    }
}

function getEmojiForHumidity(humidity) {
    if (humidity >= 70) {
        return '💧';
    } else {
        return '';
    }
}
