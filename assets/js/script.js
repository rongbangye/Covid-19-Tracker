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
var countryName = document.querySelector("#country-name");
var autocompleteItems = document.querySelector(".autocomplete-items");

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
      // display spinner when click the search button
      document.querySelector(".spinner").style.display = "";
      // Delay a half second to show the loading spinner
      setTimeout(function () {
        // if successfully load data, hide the spinner
        if (data) {
          document.querySelector(".spinner").style.display = "none";
        }
        // if there is response display data
        displayDataToTheUI(data);
      }, 500);
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

  var currentTImeAndDate = moment().format("ll");

  // activePerOneMillion: 7606.97
  // casesPerOneMillion: 20026
  // criticalPerOneMillion: 43.29
  // deathsPerOneMillion: 596

  // recoveredPerOneMillion: 11822.86

  // testsPerOneMillion: 274136

  countryName.innerHTML = `
          
              <div class="flag-and-name mx-3 my-1 d-flex">
                      <div>
                      
                      <img class=" mr-2" style="width: 48px; height:30px" src="${
                        countryData.countryInfo.flag
                      }" alt="flag">
                     
                      <span class="country-name">${countryData.country} 
                      </span></div>
                       
                       


                      <p class="date m-0"> ${currentTImeAndDate}</p>
              </div>

               <div  class="per-data d-flex"> 
                   <div class="per-million mx-3 my-1">
                    <h6>Per Million</h6>
                    <p>Tests &nbsp; : ${numberWithCommas(
                      countryData.testsPerOneMillion
                    )}</p>
                    <p>Death : ${numberWithCommas(
                      countryData.deathsPerOneMillion
                    )}</p>
                    <p>Cases: ${numberWithCommas(
                      countryData.casesPerOneMillion
                    )}</p>
                    </div>
                    <div class="per-people mx-3 my-1">
                    <h6>One Per People</h6>
                  
                      <p>Tests &nbsp; : ${numberWithCommas(
                        countryData.oneTestPerPeople
                      )}</p>
                      <p>Death : ${numberWithCommas(
                        countryData.oneTestPerPeople
                      )}</p>
                      <p>Cases : ${numberWithCommas(
                        countryData.oneCasePerPeople
                      )}</p>
                      
                    </div>
                    <div class="mx-3 my-1">
                    
                  </div>
              </div>
             
         
        `;
};

//----- FUNCTION- SUBMIT FORM  --------------------------------------------

var formSubmitHandler = function (event) {
  event.preventDefault();
  // get value from input element
  var countryName = countryInputName.value.trim();
  console.log(countryName);

  if (countryName) {
    localStorage.setItem("searchedCountry", countryName);
    getCountryData(countryName);

    // countryInputName.value = "";
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
  } else {
    getCountryData("usa");
  }
  // if there was no searched country before search for USA
};

loadPage();

searchBtn.addEventListener("submit", formSubmitHandler);

// Execute a function when the user releases a key on the keyboard
countryInputName.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    formSubmitHandler(event);
    // autocompleteItems.textContent="";
  }
});

//================  AUTO- COMPLETE=============================================================

var autocomplete = function (inp, arr) {
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
      // check if the item starts with the same letters as the text field value
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        // create a DIV element for each matching element
        b = document.createElement("DIV");
        // make the matching letters bold
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        //insert a input field that will hold the current array item's value:
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        //execute a function when someone clicks on the item value (DIV element)
        b.addEventListener("click", function (e) {
          //insert the value for the autocomplete text field:
          inp.value = this.getElementsByTagName("input")[0].value;
          // save the country name to local storage
          localStorage.setItem("searchedCountry", inp.value);
          // fetch data
          getCountryData(inp.value);
          
          // close lists
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
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;

      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });
  var addActive = function (x) {
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  };
  var removeActive = function (x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  };
  var closeAllLists = function (el) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (el != x[i] && el != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  };

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
};

autocomplete(document.getElementById("country-input"), countryNamesArray);
