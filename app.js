window.addEventListener('load', ()=> {
    let long;
    let lat;
    const weather = {};
    weather.temperature = {
        unit : "celsius"
    }
    const KELVIN = 273;
    const iconElement = document.querySelector(".weather-icon");
    const tempElement = document.querySelector(".temperature-value p");
    const descElement = document.querySelector(".temperature-description p");
    const locationElement = document.querySelector(".location p");
    const notificationElement = document.querySelector(".notification");

function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(postion => {
            console.log(postion);
            long=postion.coords.longitude;
            lat = postion.coords.latitude;

            const proxy='https://cors-anywher.herokuapp.com';
            const api=`http://api.openweathermap.org/data/2.5/weather?lat=${(lat)}&lon=${(long)}&APPID=dfeb05f0d92bf839e1b6662ba45dd0be`;
            fetch(api)
            .then(response => {
                return response.json();
    
            })
            .then(data => {
                console.log(data);
                weather.temperature.value = Math.floor(data.main.temp - KELVIN);
                weather.description = data.weather[0].description;
                weather.iconId = data.weather[0].icon;
                weather.city = data.name;
                weather.country = data.sys.country;
                displayWeather();

            })
      
            
        })


    }
})