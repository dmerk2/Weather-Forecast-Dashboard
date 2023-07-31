let dateEl = document.getElementById("date");
let recentSearches = document.getElementById("recentSearches");
let cityName = document.getElementById("cityName");
let search = document.getElementById("search");
let clear = document.getElementById("clear");
let city = document.getElementById("city");
let fdate1 = document.getElementById("fDate1");
fdate1.textContent = dayjs().add(1, 'day').format("M/D/YYYY")
let fdate2 = document.getElementById("fDate2");
fdate2.textContent = dayjs().add(2, 'day').format("M/D/YYYY")
let fdate3 = document.getElementById("fDate3");
fdate3.textContent = dayjs().add(3, 'day').format("M/D/YYYY")
let fdate4 = document.getElementById("fDate4");
fdate4.textContent = dayjs().add(4, 'day').format("M/D/YYYY")
let fdate5 = document.getElementById("fDate5");
fdate5.textContent = dayjs().add(5, 'day').format("M/D/YYYY")

dateEl.textContent = dayjs().format("M/D/YYYY");

const saveToLocalStorage = () => {
  let citySearched = cityName.value;
  localStorage.setItem("City", citySearched);
};

const renderLocalStorage = () => {
  let citySearched = cityName.value;
  localStorage.getItem("City", citySearched)
};

const fetchAPI = () => {
  let apiKey = "b1434cc4b4c38161215a67768fa4f514";
  let requestUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=" + apiKey;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
};

search.addEventListener("click", () => {
  let citySearched = cityName.value;
  for (let i = 0; i < citySearched.length; i++) {
    let newLi = document.createElement("li");
    citySearched.textContent = newLi;
    recentSearches.append(citySearched);
    cityName.append(city);
    console.log(citySearched);
  }
  saveToLocalStorage();
  fetchAPI();
});

clear.addEventListener("click", () => {
  localStorage.clear();
  recentSearches.textContent = "";
})

renderLocalStorage();