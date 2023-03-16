// Loader
const bodyElem = document.getElementsByTagName('body')[0];
const bodyContent = bodyElem.innerHTML;
const loaderContent = `
    <div style="width: 100%; height: 600px; display: flex; align-items: center; justify-content: center">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
`;
bodyElem.innerHTML = loaderContent;

// Loading weather
const cities = [
    {name: 'London', id: '2643743'},
    {name: 'Kyiv', id: '703448'},
    {name: 'Paris', id: '2988507'},
    {name: 'Madrid', id: '3117735'},
    {name: 'New York', id: '5128581'},
    {name: 'Amsterdam', id: '2759794'},
    {name: 'Lviv', id: '702550'},
    {name: 'Berlin', id: '2950159'},
    {name: 'Tokyo', id: '1850144'},
    {name: 'Pekin', id: '1816670'},
    {name: 'Rome', id: '3169070'},
];
const urls = cities.map(city => `https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=2a531d782bae853d10ea3c01caa5bb3c`);
Promise.all(urls.map(u => fetch(u))).then(responses =>
    Promise.all(responses.map(res => res.json()))
).then(citiesWeatherData => {
    setTimeout(function () {
        bodyElem.innerHTML = bodyContent;
        citiesWeatherData.forEach((data) => {
            console.log()
            const temp = data.main.temp - 273.15;
            const weather = data.weather[0].icon;
            document.getElementById(data.name).innerHTML = `${Math.round(temp)}&deg;C
            <img src = "http://openweathermap.org/img/wn/${weather}.png">`;
        })
    }, 5000);
});
