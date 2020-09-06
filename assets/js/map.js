var map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: { lat: 43.0, lng: -75.0 },
    styles: [
      { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
      {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [{ color: "#fbc6c6" }]
      },
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [{ color: "#f9f3f3" }]
      }
    ]
  });

  //
  fetch("https://www.trackcorona.live/api/countries")
    .then(respones => respones.json())
    .then(countries => {
      countries.data.map(country => {
        addMarker({
          coords: { lat: country.latitude, lng: country.longitude },
          info: `
            <h2 style="color: red; margin: 0px;">${country.location}</h2>
            <p style="margin: 0;">Recovered Cases: <strong>${numberWithCommas(
              country.recovered
            )}</strong></p>
            <p style="margin-top: 0">confirmed cases: <strong>${numberWithCommas(
              country.confirmed
            )}</strong></p>
          `
        });
      });
    });

  function addMarker(props) {
    var icon = {
      url:
        "https://cdn.iconscout.com/icon/premium/png-256-thumb/covid-19-2313096-1938299.png", // url
      scaledSize: new google.maps.Size(40, 40), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };
    // Add Marker
    var marker = new google.maps.Marker({
      position: props.coords,
      map: map,
      icon: icon
    });

    var infoWindow = new google.maps.InfoWindow({
      content: `<h1>${props.info}</h1>`
    });

    marker.addListener("click", function() {
      infoWindow.open(map, marker);
    });
  }
}

function fetchToCountries() {
  const topOne = document.querySelector(".top-country-first");
  const topTwo = document.querySelector(".top-country-second");
  const topThree = document.querySelector(".top-country-third");

  fetch("https://disease.sh/v3/covid-19/countries")
    .then(response => response.json())
    .then(countries => {
      console.log(countries);
      sortTopCountries = countries.sort((a, b) => {
        return b["cases"] - a["cases"];
      });

      topThreeCountries = sortTopCountries.slice(0, 3);

      // Render Top Three Countries
      topOne.innerHTML = `
        <div class="circle circle-one">${makeNumberToPercentage(
          topThreeCountries[0].recovered,
          topThreeCountries[0].cases
        )}%</div>
        <div>
        <h6>${topThreeCountries[0].country}</h6>
        <p>Affected -<span>${kFormatter(
          topThreeCountries[0].cases,
          2
        )}</span> &nbsp; Recovered-<span>${kFormatter(
        topThreeCountries[0].recovered,
        2
      )}</span></p>
      </div>
      `;

      topTwo.innerHTML = `
        <div class="circle circle-two">${makeNumberToPercentage(
          topThreeCountries[1].recovered,
          topThreeCountries[1].cases
        )}%</div>
        <div>
        <h6>${topThreeCountries[1].country}</h6>
        <p>Affected -<span>${kFormatter(
          topThreeCountries[1].cases,
          2
        )}</span> &nbsp; Recovered-<span>${kFormatter(
        topThreeCountries[1].recovered,
        2
      )}</span></p>
      </div>
      `;

      topThree.innerHTML = `
        <div class="circle circle-three">${makeNumberToPercentage(
          topThreeCountries[2].recovered,
          topThreeCountries[2].cases
        )}%</div>
        <div>
        <h6>${topThreeCountries[2].country}</h6>
        <p>Affected -<span>${kFormatter(
          topThreeCountries[2].cases,
          2
        )}</span> &nbsp; Recovered-<span>${kFormatter(
        topThreeCountries[2].recovered,
        2
      )}</span></p>
      </div>
      `;
    });
}
fetchToCountries();
