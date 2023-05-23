window.onload = init;
function init() {
  //   var locationsArray = locationsArray;
  //   var parkTypesArray = parkTypesArray;
}

function displayForm(formname) {
  var formContainer = document.getElementById("formContainer");
  formContainer.innerHTML = "";

  if (formname.value === "location") {
    formContainer.innerHTML = "Locations";

    var selectList = document.createElement("select");
    selectList.id = "locationSelect";
    selectList.className = "form-select ";
    formContainer.appendChild(selectList);

    // locationsArray refers from imported file(LocationData.js) in html
    for (var i = 0; i < locationsArray.length; i++) {
      var option = document.createElement("option");
      option.value = locationsArray[i];
      option.text = locationsArray[i];
      selectList.appendChild(option);
    }
  } else if (formname.value === "type") {
    formContainer.innerHTML = "Park Types";

    var selectList = document.createElement("select");
    selectList.id = "locationSelect";
    selectList.className = "form-select ";
    formContainer.appendChild(selectList);

    for (var i = 0; i < parkTypesArray.length; i++) {
      var option = document.createElement("option");
      option.value = parkTypesArray[i];
      option.text = parkTypesArray[i];
      selectList.appendChild(option);
    }
  }
  var button = document.createElement("button");
  button.id = "searchPark";
  button.innerText = "Search By " + formname.value;
  button.className = "btn btn-primary mt-3";
  formContainer.appendChild(button);
}
