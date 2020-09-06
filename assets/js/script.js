//--------------- DOM - elements -----------------------------

var activeCasesEl = document.querySelector("#active-cases");
var totalCasesEl = document.querySelector("#total-cases");
var recoveredEl = document.querySelector("#recovered");
var totalDeathEl = document.querySelector("#total-death");

var countryInputName = document.querySelector("#country-input");
var searchBtn = document.querySelector("#search-btn");

var getCountryData = function (country) {
  var urlCountry =
    "https://disease.sh/v3/covid-19/countries/" +
    country +
    "?yesterday=true&strict=true";

  // fetch data for each country
  fetch(urlCountry).then((response) => {
    response.json().then((data) => {
      displayDataToTheUI(data);
    });
  });
};

var displayDataToTheUI = function (countryData) {
  // Display all the values to the UI
  activeCasesEl.textContent = numberWithCommas(countryData.active);
  recoveredEl.textContent = numberWithCommas(countryData.recovered);
  totalCasesEl.textContent = numberWithCommas(countryData.cases);
  totalDeathEl.textContent = numberWithCommas(countryData.deaths);
};

var formSubmitHandler = function (event) {
  event.preventDefault();
  // get value from input element
  var countryName = countryInputName.value.trim();

  if (countryName) {
    getCountryData(countryName);

    countryInputName.value = "";
  } else {
    alert("Please enter a correct country name");
  }
};

searchBtn.addEventListener("submit", formSubmitHandler);
