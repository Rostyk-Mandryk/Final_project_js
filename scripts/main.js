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
        sectionRenderer();
        citiesWeatherData.forEach((data) => {
            const temp = data.main.temp - 273.15;
            const weather = data.weather[0].icon;
            document.getElementById(data.name).innerHTML = `${Math.round(temp)}&deg;C
            <img src = "http://openweathermap.org/img/wn/${weather}.png">`;
        })
    }, 5000);
});

const sectionRenderer = (section) => {
    fetch('../static/SERVICES.json')
    .then(response => response.json())
    .then(data => {
        renderSection(data, section);
    })
    .catch(error => console.error(error));
}

const renderSection = (data, inputSection) => {
    const cards = inputSection ? data.find(({section}) => section === inputSection).items
        : data.map((section) => section.items).map((items) => items[items.length - 1]);
    const container = document.getElementById('cards_container');
    container.innerHTML = '';
    cards.forEach((cardData) => {
        const card = cardBuilder(cardData);
        container.insertAdjacentHTML('beforeend', card);
    })
}

const cardBuilder = ({name, description, icon, background}) => {
    const baseClass = 'container_service_card_' + background;
    return `
        <div class="${baseClass}">
            <div class="${baseClass}_name">
                ${name}
            </div>
            <div class="${baseClass}_lor">
                ${description}
            </div>
            <div class="${baseClass}_photo">
                <img src="photo/${icon}" alt="image">
            </div>
        </div>
    `;
}


