let appId = '348ed86e6e87ace7571afcc665b9b4c2';
let units = 'metric';
let searchMethod;
function getSearchMethod(searchTerm){
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm){ // checking the total num and if every item in the searchTerm is a number
        searchMethod = 'zip';
    }
    else{
        searchMethod = 'q';
    }
}

function searchWeather(searchTerm){
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result=>{
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(resultFromServer){

    switch(resultFromServer.weather[0].main){
        case 'Clear':
            document.body.style.backgroundImage = 'url(sunny.jpg)';
            break;
        case 'Clouds':
            document.body.style.backgroundImage = 'url(cloudy.jpg)';
            break;
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url(raining.jpg)';
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url(windy.jpg)';
            break;
        case 'Snow':
            document.body.style.backgroundImage = 'url(snow.jpg)';
            break;
        default:
            break;
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImage');

    weatherIcon.src = 'https://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '@2x.png';

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
    windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + 'm/s'; 
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';

    setPositionForWeatherInfo();    
}

function setPositionForWeatherInfo(){
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 2}px)`;
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBotton').addEventListener('click', ()=>{
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm){
        searchWeather(searchTerm);
    }
});