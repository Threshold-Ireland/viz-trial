function getJson() {
    fetch('data.json').then((response) => {
        return response.json()
    }).then((data) => {
        populateData(data)
    }).catch((err)=> {
        console.log(err)
    })
};

function populateData(data) {
    console.log(data);
    populateYears(data.data, "year-select");
};

function populateYears(data, divID ) {
    const id = document.getElementById( divID );
    for(yearData of data) {
      id.appendChild( new Option( yearData.year, JSON.stringify(yearData) ));
    }
    populateDataFromYear(data[0])
};

function yearSelected(yearSelector) {
    console.log(yearSelector.value);
    populateDataFromYear(JSON.parse(yearSelector.value));
}

function populateDataFromYear(yearData){
    const cost = document.getElementById("data-cost");
    cost.textContent = yearData.total;
    console.log(yearData);
    document.getElementById("data-direct-cost").textContent = yearData.direct.total;

    document.getElementById("data-indirect-cost").textContent = yearData.indirect.total;
}
  
// Load data
window.onload = function() {
    getJson();
}