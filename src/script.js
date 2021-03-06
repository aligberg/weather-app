let now = new Date();

let currentDay = document.querySelector("#date");
let currentTime = document.querySelector("#time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
let minutes = now.getMinutes();
if (hour < 10) {
  hour = `0{hour}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentDay.innerHTML = `${day}, ${month} ${date} ${year}`;
currentTime.innerHTML = `${hour}:${minutes}`;

//forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    console.log(forecastDay);
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
            
              <div class="forecastDay">${formatDay(forecastDay.dt)}</div>
              <div class="forecastIcon my-1">
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" />
              </div>
              <div class="forecastTemp">
                <p>
                  <span class="forecastHigh">${Math.round(
                    forecastDay.temp.max
                  )}</span>˚/<span
                    class="forecastLow"
                    >${Math.round(forecastDay.temp.min)}</span
                  >˚
                </p>
              </div>
            
          </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "54cae2bb0d0b7168b158d795db1580ea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

//search bar
function showWeather(response) {
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#temp");
  fahrenheitTemp = response.data.main.temp;
  mainTemp.innerHTML = `${temperature}`;
  h2.innerHTML = response.data.name;

  console.log(response);
  let feelsLike = Math.round(response.data.main.feels_like);
  let feelsLikeElement = document.querySelector("#feelsLike");
  feelsLikeElement.innerHTML = `${feelsLike}˚F`;
  let hiLo = `${Math.round(response.data.main.temp_max)}˚/${Math.round(
    response.data.main.temp_min
  )}˚`;
  let hiLoElement = document.querySelector("#hi-lo");
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  hiLoElement.innerHTML = hiLo;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#current-conditions").innerHTML =
    response.data.weather[0].description;

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "54cae2bb0d0b7168b158d795db1580ea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("input").value;
  search(city);
}
let h2 = document.querySelector("#cityName");

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "54cae2bb0d0b7168b158d795db1580ea";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let locationButton = document.querySelector("#geolocation");
locationButton.addEventListener("click", getCurrentPosition);

//F/C
function fToC(event) {
  event.preventDefault();
  cTemp.classList.add("active");
  fTemp.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  let celciusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celciusTemp);
}

function cToF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  cTemp.classList.remove("active");
  fTemp.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitTemp = null;

let searchBar = document.querySelector("#search");
searchBar.addEventListener("submit", handleSubmit);

let fTemp = document.querySelector("#fTemp");
let cTemp = document.querySelector("#cTemp");
cTemp.addEventListener("click", fToC);
fTemp.addEventListener("click", cToF);
search("New York");
