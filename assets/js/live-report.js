fetch("https://disease.sh/v3/covid-19/countries")
  .then(response => response.json())
  .then(countries => {
    const previousTab = document.querySelector(".prev");
    const nextTab = document.querySelector(".next");
    const liveReports = document.querySelector("#live-reports-list");

    sortTopCountries = countries.sort((a, b) => {
      return b["cases"] - a["cases"];
    });
    // console.log(sortTopCountries);
    let countryList = [];
    let page = 0;

    console.log(countryList);
    sortTopCountries.forEach(country => {
      let li = document.createElement("li");
      li.innerHTML += `
        <div class="countryLiveReport p-2">
            <div>
              <img class=" liveReport-flag" style="width: 30px; height:20px" src="${
                country.countryInfo.flag
              }" alt="flag">
              ${country.country}
            </div>
            <div>
              <span>${numberWithCommas(country.cases)}</span>
            </div>
        </div>
      `;
      countryList.push(li);
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
