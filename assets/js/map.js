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

// function fetchToCountries() {
//   const topOne = document.querySelector(".topOne");
//   const topTwo = document.querySelector(".topTwo");
//   const topThree = document.querySelector(".topThree");
//   const worldWide = document.querySelector(".worldWide");

//   fetch("https://covid-19.dataflowkit.com/v1")
//     .then(response => response.json())
//     .then(covidData => {
//       // console.log(covidData[0]);
//       worldWide.innerHTML = `
//         World
//         <br>
//         Active Cases: ${covidData[0]["Total Cases_text"]}
//         <br>
//         Total Recovered: ${covidData[0]["Total Recovered_text"]}
//       `;

//       let topCountries = covidData.slice(1);
//       sortTopCountries = topCountries.sort((a, b) => {
//         return a["Total Cases_text"] - b["Total Cases_text"];
//       });
//       topThreeCountries = sortTopCountries.slice(0, 3);

//       topOne.innerHTML = `
//         Top 1: ${topThreeCountries[0]["Country_text"]}
//         <br>
//         Active Cases: ${topThreeCountries[0]["Total Cases_text"]}
//         <br>
//         Total Recovered: ${topThreeCountries[0]["Total Recovered_text"]}
//       `;

//       topTwo.innerHTML = `
//         Top 1: ${topThreeCountries[1]["Country_text"]}
//         <br>
//         Active Cases: ${topThreeCountries[1]["Total Cases_text"]}
//         <br>
//         Total Recovered: ${topThreeCountries[1]["Total Recovered_text"]}
//       `;

//       topThree.innerHTML = `
//         Top 1: ${topThreeCountries[2]["Country_text"]}
//         <br>
//         Active Cases: ${topThreeCountries[2]["Total Cases_text"]}
//         <br>
//         Total Recovered: ${topThreeCountries[2]["Total Recovered_text"]}
//       `;
//     });
// }
// fetchToCountries();
