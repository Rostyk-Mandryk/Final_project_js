function refreshWeather() {
    const cities = [
        { name: 'London', id: '2643743' },
        { name: 'Kyiv', id: '703448' },
        { name: 'Paris', id: '2988507' },
        { name: 'Madrid', id: '3117735' },
        { name: 'New York', id: '5128581' },
        { name: 'Amsterdam', id: '2759794' },
        { name: 'Lviv', id: '702550' },
        { name: 'Berlin', id: '2950159' },
        { name: 'Tokyo', id: '1850144' },
        { name: 'Pekin', id: '1816670' },
        { name: 'Rome', id: '3169070' },
    ];

    cities.forEach(city => {
        const url = `https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=2a531d782bae853d10ea3c01caa5bb3c`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let temp = data.main.temp - 273.15;
                let weather = data.weather[0].icon;
                document.getElementById(city.name).innerHTML = `${Math.round(temp)}&deg;C
            <img src = "http://openweathermap.org/img/wn/${weather}.png">`;
                console.log(data);
            })
            .catch(error => console.log(error));
    });
}