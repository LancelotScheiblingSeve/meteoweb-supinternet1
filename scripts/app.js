moment.locale('fr');

const formSearch      = document.getElementById('formSearch');
const inputCityName   = document.getElementById('ville');
const weatherResults  = document.getElementById('weather-results');
const forecastResults = document.getElementById('forecast-results');

formSearch.addEventListener('submit', event => {
    event.preventDefault();

    const city = inputCityName.value;

    WeatherService.getWeatherByCity(city).then(weather => {
        weatherResults.innerHTML = `<div class="card" style="width: 22rem;">
                                <div class="card-body">
                                    ${weather.weather.map(w => (
                                        `<img src="http://openweathermap.org/img/w/${w.icon}.png" alt="${w.description}" class="float-right">`
                                    )).join('')}
                                    <h5 class="card-title">${weather.name}, ${weather.sys.country}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">
                                        ${weather.weather.map(w => (
                                            `<strong>${w.description}</strong>`
                                        )).join(', ')}
                                        <br>
                                    </h6>
                                    <p class="card-text">Temperature : ${weather.main.temp}°C</p>
                                    <a href="#" class="card-link" id="previsions" data-city-id="${weather.id}">Afficher les prévisions</a>
                                </div>
                            </div>`;
    });
});

weatherResults.addEventListener('click', function(event) {
    // Event Delegation
    if (!event.target || !event.target.matches('#previsions')) return;
    
    event.preventDefault();

    const cityId = event.target.dataset.cityId;

    WeatherService.getForecastById(cityId).then(forecast => {
        const forecastList = groupByDay(forecast.list);
        forecastResults.innerHTML = `${Object.keys(forecastList).map(date => (
                                        `<h3>${moment(+date).calendar()}</h3>
                                        <hr>
                                        <ul class="list-group d-flex flex-row justify-content-between mb-4">
                                            ${forecastList[date].map((weather) => (
                                                `<li class="d-flex flex-column justify-content-start align-items-center p-0">    
                                                    <span class="badge badge-primary badge-pill">${moment.unix(weather.dt).format('H')}h</span>
                                                    ${weather.weather.map(w => (
                                                        `<img src="http://openweathermap.org/img/w/${w.icon}.png" alt="${w.description}">`
                                                    )).join('')}
                                                    <span class="badge badge-light badge-pill">${weather.main.temp}°C</span>
                                                </li>`
                                            )).join('')}
                                        </ul>`
                                    )).filter(Boolean).join('')}`;
    })
});

function groupByDay(weatherList) {
    return weatherList.reduce((group, weather) => {
        const d = new Date(weather.dt * 1000);
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        if (!group[d.getTime()])
            group[d.getTime()] = [];

        group[d.getTime()].push(weather);
        return group;
    }, {});
}