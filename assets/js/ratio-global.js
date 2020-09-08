function getGlobalData() {
  fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(global => {
      const circleRecovery = document.querySelector(".circle-recovery");
      const affectedGlobal = document.querySelector(".affected-global");
      const recoveredGlobal = document.querySelector(".recovered-global");
      const todayCasesGlobal = document.querySelector(".today-cases-global");
      const todayRecoveredGlobal = document.querySelector(
        ".today-recovered-global"
      );

      console.log(global);
      const circleRecoveryRatio = makeNumberToPercentage(
        global.recovered,
        global.cases
      );
      circleRecovery.innerHTML = `${circleRecoveryRatio}%`;
      affectedGlobal.innerHTML = `${kFormatter(global.cases, 2)}`;
      recoveredGlobal.innerHTML = `${kFormatter(global.recovered, 2)}`;
      todayCasesGlobal.innerHTML = `${kFormatter(global.todayCases, 2)}`;
      todayRecoveredGlobal.innerHTML = `${kFormatter(
        global.todayRecovered,
        2
      )}`;
    });
}

getGlobalData();
