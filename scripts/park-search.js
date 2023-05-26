window.onload = init;
function init() {
  displayForm("view all");
  parksearch();
}
//------------------------ Display form ---------------------------
function displayForm(formname) {
  var formContainer = document.getElementById("formContainer");
  formContainer.innerHTML = "";

  //create select element
  var selectList = document.createElement("select");
  selectList.id = "locationSelect";
  selectList.className = "form-select ";

  if (formname === "location") {
    formContainer.innerHTML = "Locations";
    formContainer.appendChild(selectList);

    // locationsArray refers from imported file(LocationData.js) in html
    for (var i = 0; i < locationsArray.length; i++) {
      var option = document.createElement("option");
      option.value = locationsArray[i];
      option.text = locationsArray[i];
      selectList.appendChild(option);
    }
  } else if (formname === "type") {
    formContainer.innerHTML = "Park Types";
    formContainer.appendChild(selectList);

    for (var i = 0; i < parkTypesArray.length; i++) {
      var option = document.createElement("option");
      option.value = parkTypesArray[i];
      option.text = parkTypesArray[i];
      selectList.appendChild(option);
    }
  }
}

//------------------------ parksearch---------------------------
function parksearch() {
  var resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = "";

  var typeRadio = document.getElementById("typeRadio").checked;
  var locationRadio = document.getElementById("locationRadio").checked;
  var allRadio = document.getElementById("allRadio").checked;

  var searchValue;
  if (!allRadio) {
    searchValue = document.getElementById("locationSelect").value;
  }

  // Create the table element
  var table = document.createElement("table");
  table.classList.add("table");

  // Create the table header
  var thead = document.createElement("thead");
  thead.classList.add("table-primary");
  var headerRow = document.createElement("tr");

  var tableHeading = [
    "LocationID",
    "LocationName",
    "Address",
    "City",
    "State",
    "ZipCode",
    "Phone",
    "Fax",
    "Visit",
  ];

  tableHeading.forEach((element) => {
    var th = document.createElement("th");
    th.textContent = element;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create the table body
  var tbody = document.createElement("tbody");
  if (locationRadio) {
    //if radio selected is location then filter on state
    var filteredData = nationalParksArray.filter(function (obj) {
      return obj.State.toLocaleUpperCase() === searchValue.toLocaleUpperCase();
    });
  } else if (typeRadio) {
    //if radio selected is type then filter on location name
    var filteredData = nationalParksArray.filter(function (obj) {
      return obj.LocationName.toLocaleUpperCase().includes(
        searchValue.toLocaleUpperCase()
      );
    });
  } else if (allRadio) {
    filteredData = nationalParksArray;
  }

  // add filtered data to table td
  filteredData.forEach(function (filteredObj) {
    var row = document.createElement("tr");

    tableHeading.forEach((element) => {
      var cell = document.createElement("td");

      if (element === "Visit" && filteredObj["Visit"]) {
        var aTag = document.createElement("a");
        aTag.setAttribute("href", filteredObj["Visit"]);
        aTag.innerText = filteredObj["Visit"];
        aTag.target = "_blank";
        cell.appendChild(aTag);
      } else {
        cell.textContent = filteredObj[element];
      }

      row.appendChild(cell);
    });

    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  resultContainer.appendChild(table);
}
