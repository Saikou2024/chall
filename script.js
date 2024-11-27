const api ='811a9832dd3317652199e877ef7b05ee'
const tempP = document.getElementById('temprature')
const tempIcon = document.getElementById('tempratureIcon')
const tempDesc = document.getElementById('tempratureDescription')

const getCoord = async (city) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api}`;
    

    let data = await fetch(url,{
        method:'GET'
    }).then (res => {
        return res.json()
    });
    console.log(data[0])
    return data[0]
}

const getWeather = async () => {
    const coord = await getCoord('New York');
    const lon = coord.lon;
    const lat = coord.lat;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&units=metric`;
    console.log(lat, lon);
    

    let weather = await fetch(url, { 
        method: 'GET'
    }).then(res => {
        return res.json()
    });
    console.log(weather);
    
    const iconcode = weather.weather[0].icon;
    const iconurl = `http://openweathermap.org/img/wn/${iconcode}@2x.png`;
    tempIcon.src = iconurl;
    tempDesc.innerText = weather.weather[0].description;
    tempP.innerText = Math.floor(weather.main.temp);
    console.log(weather) 
}
getWeather()