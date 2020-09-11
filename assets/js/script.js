//--------------- DOM - elements -----------------------------

var activeCasesEl = document.querySelector("#active-cases");
var totalCasesEl = document.querySelector("#total-cases");
var recoveredEl = document.querySelector("#recovered");
var totalDeathEl = document.querySelector("#total-death");

var todayCasesEl = document.querySelector("#today-cases");
var totalTestsEl = document.querySelector("#total-tests");
var todayRecoveredEl = document.querySelector("#today-recovered");
var todayDeathEl = document.querySelector("#today-death");

var countryInputName = document.querySelector("#country-input");
var searchBtn = document.querySelector("#search-btn");

// ----  Modal DOM Elements---
const modal = document.querySelector("#modal");
const closeBtn = document.querySelector(".close");
const modalBody = document.querySelector(".modal-body");

// Modal Events
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", outsideModalClick);

// Open Modal
function openModal(str) {
  modal.style.display = "block";
  var messageEl = document.createElement("p");
  messageEl.textContent = str;
  modalBody.appendChild(messageEl);
}

// Close Modal
function closeModal() {
  modal.style.display = "none";
  modalBody.textContent = "";
}

// Close If Outside Click
function outsideModalClick(e) {
  if (e.target == modal) {
    modal.style.display = "none";
    modalBody.textContent = "";
  }
}

//----- FUNCTION- FETCH COUNTRY DATA  --------------------------------------------

var getCountryData = function (country) {
  var urlCountry =
    "https://disease.sh/v3/covid-19/countries/" +
    country +
    "?yesterday=false&strict=false";

  // fetch data for each country
  fetch(urlCountry).then((response) => {
    response.json().then((data) => {
      // if there is no response open modal with the error message
      if (data.message) {
        openModal(data.message);
      }
      countryInputName.value = "";
      // if there is response display data
      displayDataToTheUI(data);
    });
  });
};

//----- FUNCTION- DISPLAY DATA TO THE UI --------------------------------------------

var displayDataToTheUI = function (countryData) {
  // Display all the values to the UI
  activeCasesEl.textContent = numberWithCommas(countryData.active);
  recoveredEl.textContent = numberWithCommas(countryData.recovered);
  totalCasesEl.textContent = numberWithCommas(countryData.cases);
  totalDeathEl.textContent = numberWithCommas(countryData.deaths);

  todayCasesEl.textContent = numberWithCommas(countryData.todayCases);
  todayRecoveredEl.textContent = numberWithCommas(countryData.todayRecovered);
  totalTestsEl.textContent = numberWithCommas(countryData.tests);
  todayDeathEl.textContent = numberWithCommas(countryData.todayDeaths);
};

//----- FUNCTION- SUBMIT FORM  --------------------------------------------

var formSubmitHandler = function (event) {
  event.preventDefault();
  // get value from input element
  var countryName = countryInputName.value.trim();

  if (countryName) {
    localStorage.setItem("searchedCountry", countryName);
    getCountryData(countryName);

    countryInputName.value = "";
  } else {
    openModal("Input field can not be empty");
  }
};

//----- FUNCTION- LOAD PAGE ------------------------------------------------

var loadPage = function () {
  // get the last searched country name from localstorage
  var lastSearchedCountry = localStorage.getItem("searchedCountry");

  // get the data for the last searched country
  if (lastSearchedCountry) {
    getCountryData(lastSearchedCountry);
  }
  // if there was no searched country before search for USA
  getCountryData("usa");
};

loadPage();

searchBtn.addEventListener("submit", formSubmitHandler);

// Execute a function when the user releases a key on the keyboard
countryInputName.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    formSubmitHandler(event);
  }
});

//================  AUTO- COMPLETE=============================================================

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;

          getCountryData(inp.value);

          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

autocomplete(document.getElementById("country-input"), countryNamesArray);
