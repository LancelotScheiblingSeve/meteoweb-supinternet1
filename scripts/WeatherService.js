(function(exports) {

    const API_KEY = 'e868747d83176ba6ec5d9ce6d81423f0';
    const API_ENDPOINT = '//api.openweathermap.org/data/2.5';

    exports.WeatherService = {
        getWeatherByCity(cityName) {
            cityName = encodeURIComponent(cityName);
            return fetch(`${API_ENDPOINT}/weather?units=metric&lang=fr&APPID=${API_KEY}&q=${cityName}`)
                    .then(response => response.json());
        },
    };

})(window);