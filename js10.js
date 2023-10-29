function getCurrentWeather(){
    let cityName = document.getElementById('cityInput').value;
    let apiKey = '914d39a80b88eee00ef5ef088127d56f'
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`

    
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();
    
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                let data = JSON.parse(request.responseText);
                displayWeatherInfo(data);
            } else if (request.status === 404) {
                alert("404 Not Found!");
            } else{
                alert("City Not Found!")
            }
        }
    }
    
    let bool = true;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=8&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
        if (bool) {
            const hourlyForecastElement = document.getElementById('hourlyForecast');

            const hourlyForecasts  = data.list.slice(0, 8);

            hourlyForecasts .forEach(hour => {
                const hourDate = new Date(hour.dt * 1000);
                const iconCode = hour.weather[0].icon;
                const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

                const Div = document.createElement('div');
                Div.innerHTML = `
                    <img src="${iconUrl}" alt="Weather Icon">
                    <p>${hourDate.toLocaleTimeString()}: <b>${hour.main.temp}°C</b></p>
                    <b>${hour.weather[0].description}</b>
                `;
                hourlyForecastElement.appendChild(Div);
            });
        } else {
            const hourlyForecastElement = document.getElementById('hourlyForecast');
            hourlyForecastElement.innerHTML = '';
        }
    })
    .catch(error => {
        console.error('Error fetching hourly forecast data:', error);
        const hourlyForecastElement = document.getElementById('hourlyForecast');
        hourlyForecastElement.innerHTML = '';
    });
}




function displayWeatherInfo(data){
    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const date = new Date(data.dt * 1000);
    const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

    const minTemp = data.main.temp_min;
    const maxTemp = data.main.temp_max;
    const windSpeed = data.wind.speed;


    const cityname = document.getElementById('city-name');
    const weatherIcon = document.getElementById('weather-icon');
    const weatherDescription = document.getElementById('weatherDescription');
    const temperatureElement = document.getElementById('temperature');
    const dateElement = document.getElementById('date');

    const minTempElement = document.getElementById('minTemp');
    const maxTempElement = document.getElementById('maxTemp');
    const windSpeedElement = document.getElementById('windSpeed');

    cityname.textContent = cityName;
    weatherIcon.src = `http://openweathermap.org/img/w/${iconCode}.png`;
    temperatureElement.textContent = `${temperature.toFixed(2)}°C`;
    weatherDescription.textContent = description;
    dateElement.textContent = `${formattedDate}`;
    minTempElement.textContent = `${minTemp.toFixed(2)}°C`;
    maxTempElement.textContent = `${maxTemp.toFixed(2)}°C`;
    windSpeedElement.textContent = `${windSpeed} km/h`;
}







