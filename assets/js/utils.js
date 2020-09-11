function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

// Refer form Stack OverFlow: https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
function kFormatter(num, digits) {
  var si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

function makeNumberToPercentage(a, b) {
  return Math.floor((a / b) * 100);
}

//Truncate a String refer from: https://forum.freecodecamp.org/t/freecodecamp-challenge-guide-truncate-a-string/16089
function truncateString(str, num) {
  return str.length > num ? str.slice(0, num) + "..." : str;
}

// Function to hide the Spinner
function hideSpinner() {
  document.querySelector(".spinner").style.display = "none";
}
