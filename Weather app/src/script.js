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

let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
if (hour < 10) {
  hour = `0{hour}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentDay.innerHTML = day;
currentTime.innerHTML = `${hour}:${minutes}`;

//search bar
function showWeather(response) {
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#temp");
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
  hiLoElement.innerHTML = hiLo;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
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
let searchBar = document.querySelector("#search");
searchBar.addEventListener("submit", handleSubmit);

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
  let temperature = currentTemp.innerHTML;
  currentTemp.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}
function cToF(event) {
  event.preventDefault();
  currentTemp.innerHTML = 84;
  fTemp.innerHTML = "<strong>F</strong>";
}

let fTemp = document.querySelector("#fTemp");
let cTemp = document.querySelector("#cTemp");
let currentTemp = document.querySelector("#temp");
cTemp.addEventListener("click", fToC);
fTemp.addEventListener("click", cToF);

search("New York");
