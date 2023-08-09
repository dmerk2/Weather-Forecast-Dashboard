const recentSearches = document.getElementById("recentSearches");
const cityName = document.getElementById("cityName");
const search = document.getElementById("search");
const clear = document.getElementById("clear");
const forecastContainer = document.querySelector(".forecast-container");
const weatherContainer = document.querySelector(".weather-container");

let cities = [];

// Create a button for each city searched
const getHistory = (searchHistory) => {
  const btn = document.createElement("button");
  btn.setAttribute("class", "btn btn-warning");
  btn.textContent = searchHistory;
  recentSearches.append(btn);
};

// Render local storage
let searchHistory = JSON.parse(localStorage.getItem("city")) || [];
for (let i = 0; i < searchHistory.length; i++) {
  getHistory(searchHistory[i]);
}

// Save the city searched in the local storage
const saveToLocalStorage = (city) => {
  cities = JSON.parse(localStorage.getItem("city")) || [];
  if (!cities.includes(city)) {
    cities.push(city);
    localStorage.setItem("city", JSON.stringify(cities));
    getHistory(city);
  }
};

// Function to get current weather from input from user for city
const getWeather = (city) => {
  let apiKey = "b1434cc4b4c38161215a67768fa4f514";
  let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  // Use fetch to create a request from API 
  fetch(requestUrl)
    .then(function (response) {
      // Alert if valid city is not entered
      if (!response.ok) {
        alert("Please enter valid city name");
        return;
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // Pull lat and lon from current city that is searched
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      getForecast(lat, lon);
      displayWeather(data);
    });
};

// Get 5 day forecast from city that is searched 
const getForecast = (lat, lon) => {
  let apiKey = "b1434cc4b4c38161215a67768fa4f514";
  let requestUrl2 = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  fetch(requestUrl2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayForecast(data.list);
    });
};

// Dynamically create cards to display weather
const displayWeather = (data) => {
  weatherContainer.innerHTML = "";
  const cards = document.createElement("div");
  const cardHeader = document.createElement("div");
  const cardBody = document.createElement("div");
  cards.setAttribute("class", "card");
  cardHeader.setAttribute("class", "card-header");
  cardBody.setAttribute("class", "card-body");
  const span = document.createElement("span");
  const icon = document.createElement("img");
  const temp = document.createElement("p");
  const humidity = document.createElement("p");
  const wind = document.createElement("p");
  const h4 = document.createElement("h4");
  const h6 = document.createElement("h6");
  icon.setAttribute(
    "src",
    "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
  );
  temp.textContent = `Temperature: ${data.main.temp} °F`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  wind.textContent = `Wind Speed: ${data.wind.speed} MPH`;
  h4.textContent = data.name;
  h6.textContent = new Date(data.dt * 1000).toDateString();

  span.append(icon);
  h4.append(span);
  cardHeader.append(h4, h6);
  cardBody.append(temp, humidity, wind);
  cards.append(cardHeader, cardBody);
  weatherContainer.append(cards);
};

// Dynamically create cards to display forecast cards
const displayForecast = (data) => {
  forecastContainer.innerHTML = "";
  for (let i = 1; i < 6; i++) {
    const cards = document.createElement("div");
    const cardHeader = document.createElement("div");
    const cardBody = document.createElement("div");
    const col = document.createElement("div");
    col.setAttribute("class", "col-lg col-md-4 col-sm-6");
    cards.setAttribute("class", "card");
    cardHeader.setAttribute("class", "card-header");
    cardBody.setAttribute("class", "card-body");
    const span = document.createElement("span");
    const icon = document.createElement("img");
    const temp = document.createElement("p");
    const humidity = document.createElement("p");
    const wind = document.createElement("p");
    const h6 = document.createElement("h6");
    icon.setAttribute(
      "src",
      "https://openweathermap.org/img/w/" + data[i].weather[0].icon + ".png"
    );
    temp.textContent = `Temperature: ${data[i].temp.day} °F`;
    humidity.textContent = `Humidity: ${data[i].humidity}%`;
    wind.textContent = `Wind Speed: ${data[i].speed} MPH`;
    h6.textContent = new Date(data[i].dt * 1000).toDateString();
    span.append(icon);
    h6.append(span);
    cardHeader.append(h6);
    cardBody.append(temp, humidity, wind);
    cards.append(cardHeader, cardBody);
    col.append(cards);
    forecastContainer.append(col);
  }
};

// Event to listen for when search button is clicked
search.addEventListener("click", () => {
  let citySearched = cityName.value;
  if (!citySearched) {
    alert("Please enter a city");
    return;
  }
  saveToLocalStorage(citySearched);
  getWeather(citySearched);
});

// Show current weather and forecast data when clicking on a previously searched city
recentSearches.addEventListener("click", (e) => {
  e.preventDefault();
  weatherContainer.innerHTML = "";
  forecastContainer.innerHTML = "";
  const cityClicked = this.event.target.textContent;
  getWeather(cityClicked);
});

// Clear local storage and clear recent searches
clear.addEventListener("click", () => {
  localStorage.clear();
  recentSearches.textContent = "";
});
