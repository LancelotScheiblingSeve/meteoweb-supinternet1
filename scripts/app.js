const formSearch      = document.getElementById('formSearch');
const inputCityName   = document.getElementById('ville');
const results  = document.getElementById('results');

formSearch.addEventListener('submit', event => {
    event.preventDefault();

    const city = inputCityName.value;

    WeatherService.getWeatherByCity(city).then(weather => {
        results.innerHTML = `<div class="card" style="width: 22rem;">
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
        forecastResults.innerHTML = `<ul class="list-group list-group-flush">
                                ${forecast.list.map(weather => (
                                    `<li class="list-group-item d-flex justify-content-start align-items-center p-0">    
                                        <span class="badge badge-primary badge-pill">${moment.unix(weather.dt).calendar()}</span>
                                        ${weather.weather.map(w => (
                                            `<img src="http://openweathermap.org/img/w/${w.icon}.png" alt="${w.description}">`
                                        )).join('')}
                                        <span class="badge badge-light badge-pill">${weather.main.temp}°C</span>
                                    </li>`
                                )).join('')}
                            </ul>`;
    })
});
