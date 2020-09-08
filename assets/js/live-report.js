// DOM elments

const previousTab = document.querySelector(".prev");
const nextTab = document.querySelector(".next");
const liveReports = document.querySelector("#live-reports-list");

fetch("https://disease.sh/v3/covid-19/countries")
  .then(response => response.json())
  .then(countries => {
    sortTopCountries = countries.sort((a, b) => {
      return b["cases"] - a["cases"];
    });

    let countryList = [];
    let page = 0;

    sortTopCountries.forEach(country => {
      // create <li> element
      let liveCountryEL = document.createElement("li");
      liveCountryEL.innerHTML += `
        <div class="countryLiveReport p-2">
            <div>
              <img class=" liveReport-flag  mx-2" style="width: 30px; height:20px" src="${
                country.countryInfo.flag
              }" alt="flag">
              ${country.country}
            </div>
            <div>
              <span>${numberWithCommas(country.cases)}</span>
            </div>
        </div>
      `;
      countryList.push(liveCountryEL);

      //     fetch data if user clicks live country
      var getElement = function(event) {
        // get country name from clicked element
        var countryClicked =
          event.currentTarget.children[0].children[0].textContent;

        //call getCountryData with clicked country name

        getCountryData(countryClicked);
      };

      liveCountryEL.addEventListener("click", getElement);
    });

    for (let i = 0; i < page + 10; i++) {
      liveReports.appendChild(countryList[i]);
    }

    nextTab.addEventListener("click", () => {
      page == countryList.length - 10 ? (page = 0) : (page += 10);
      liveReports.innerHTML = "";
      for (let i = page; i < page + 10; i++) {
        liveReports.appendChild(countryList[i]);
      }
    });

    previousTab.addEventListener("click", () => {
      page == 0 ? (page = countryList.length - 10) : (page -= 10);
      liveReports.innerHTML = "";
      for (let i = page; i < page + 10; i++) {
        liveReports.appendChild(countryList[i]);
      }
    });
  });
