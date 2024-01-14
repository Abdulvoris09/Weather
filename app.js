const KEY = '96b947a45d33d7dc1c49af3203966408';
const elForm = document.querySelector('#form')
const elCityInput = document.querySelector('#city-input')
const elWeatherInfo = document.querySelector('#weather-info')

const getData = async function (city) {
    const base = `https://api.openweathermap.org/data/2.5/weather`
    const query = `?q=${city}&units=metric&appid=${KEY}`

    const request = await fetch(base + query);
    const data = await request.json()
    return data
}

const getWeather = async function (city) {
    const data = await getData(city);

    return data
}


const update = function (weather) {
    let timezone = weather.timezone;
    let sunrise = weather.sys.sunrise;
    let sunset = weather.sys.sunset;

    let timeSunrise = moment.utc(sunrise, 'X').add(timezone, 'seconds').format('HH:mm a');
    let timeSunset = moment.utc(sunset, 'X').add(timezone, 'seconds').format('HH:mm a');
    elCityInput.value = "";

    if (weather.name) {
        elWeatherInfo.innerHTML = `
        <!-- Shaxar -->
        <!-- 1 -->
       <div id="wt" class="flex mr-[55px] text-white">
       <div>
       <div class="flex">
       <img class="mr-40 text-7xl w-[350px]" src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="" width="100" height="100">
       <div class="ml-[65px]">
       <h1 class="text-[55px]">Today</h1>
       <center class="flex">
       <h1 class="flex text-[35px] w-60">${weather.weather[0].main}: <p class="text-red-500 font-normal"> ${Math.floor(weather.main.temp)}C</p></h1>
    </center>
    <div id="kt">
    <p class="text-white flex text-[25px]"><img class="w-[25px]" src="./img/wind2.svg" alt=""><span>:</span>${weather.wind.speed} km/h</p></div>
    <div class="">
    <p class="text-[25px] flex text-white"><img class="w-[25px]" src="./img/weather-icon-png-11063.png" alt=""><span>: ${timeSunrise}</p>
      <p class="text-white flex text-[25px]"><img class="w-[25px]" src="./img/namlik.webp" alt=""><span>: ${weather.main.humidity}%</p>
      <p class="text-[25px] flex text-white"><img class="w-[20px] h-5" src="./img/Sunrise.jpg" alt=""><span>: ${timeSunset}</p>
      <p class="text-[25px] flex text-white"><img class="w-[25px]" src="./img/flag.jpg.crdownload" alt=""><span>: ${weather.name}</p>
      </div>
      </div>
       </div>
       `
    }
    else {
        alert("Hato")
    }
}
elForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const cityName = elCityInput.value.trim()
    getData(cityName).then((data) => update(data))
});