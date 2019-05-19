const formSearch    = document.getElementById('formSearch');
const inputCityName = document.getElementById('ville');
const results       = document.getElementById('results');

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
