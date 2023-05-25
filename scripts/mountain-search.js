window.onload = init;

function init() {
  var mountainSelect = document.getElementById("mountainSelect");
  mountainSelect.addEventListener("change", showMountainData);
  setMountainSelect();
}

function setMountainSelect() {
  var mountainSelect = document.getElementById("mountainSelect");
  for (var i = 0; i < mountainsArray.length; i++) {
    var option = document.createElement("option");
    option.value = mountainsArray[i].name;
    option.text = mountainsArray[i].name;
    mountainSelect.appendChild(option);
  }
  showMountainData();
}

function showMountainData(e) {
  var selectedValue = document.getElementById("mountainSelect").value;
  var resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = "";
  var imageContainer = document.getElementById("imageContainer");
  imageContainer.innerHTML = "";

  //   var filteredData = mountainsArray.filter(function (obj) {
  //     return obj.name === selectedValue;
  //   });
  var result = mountainsArray.find((o) => o.name === selectedValue);

  if (result) {
    getSunsetForMountain().then((data) => {
      sunsetResponse = data.results;
      var elem = document.createElement("img");
      elem.setAttribute("src", "../images/" + result.img);
      // elem.setAttribute("height", 300);
      // elem.setAttribute("width", 200);
      imageContainer.appendChild(elem);

      var span = document.createElement("span");
      span.innerHTML =
        "<div class='row card-title h4'>  <div class='col col-sm-4 '>Mountain Name :   </div>  <div class='col col-sm-8 text-warning'>   " +
        result.name +
        "</div></div>";
      resultContainer.appendChild(span);
      var span = document.createElement("span");
      span.innerHTML =
        "<div class='row '>  <div class='col col-sm-4 card-title h6'>Mountain Description :   </div>  <div class='col col-sm-8 text-secondary'>   " +
        result.desc +
        "</div></div>";
      resultContainer.appendChild(span);
      var span = document.createElement("span");
      span.innerHTML =
        "<div class='row '>  <div class='col col-sm-4 card-title h6'>Mountain Elevation  : </div>  <div class='col col-sm-8 text-secondary'>    " +
        result.elevation +
        "</div></div>";
      resultContainer.appendChild(span);
      var span = document.createElement("span");
      span.innerHTML =
        "<div class='row '>  <div class='col col-sm-4 card-title h6'>Sunrise Time  : </div>  <div class='col col-sm-8 text-success'>    " +
        sunsetResponse.sunrise +
        "</div></div>";
      resultContainer.appendChild(span);
      var span = document.createElement("span");
      span.innerHTML =
        "<div class='row '>  <div class='col col-sm-4 card-title h6'>Sunset Time  : </div>  <div class='col col-sm-8 text-success'>    " +
        sunsetResponse.sunset +
        "</div></div>";
      resultContainer.appendChild(span);
    });
  }
}

async function getSunsetForMountain(lat, lng) {
  let response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`
  );
  let data = await response.json();
  return data;
}
