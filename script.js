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
    populateYears(data.yearlyCostData, "year-select");
};

function populateYears(yearlyCostData, divID ) {
    const id = document.getElementById( divID );
    for(yearData of yearlyCostData) {
      id.appendChild( new Option( yearData.year, JSON.stringify(yearData) ));
    }
    populateDataFromYear(yearlyCostData[0])
};

function yearSelected(yearSelector) {
    populateDataFromYear(JSON.parse(yearSelector.value));
}

function populateDataFromYear(yearData){
    const cost = document.getElementById("data-cost");
    cost.textContent = yearData.total;
    
    document.getElementById("data-direct-cost").textContent = yearData.direct.total;
    document.getElementById("data-direct-cost-breakdown").textContent = `${yearData.direct.HAP} in Housing assistance\n${yearData.direct.RAS} in RAS cost\n${yearData.direct.charities} for the charitable sector`;

    document.getElementById("data-indirect-cost").textContent = yearData.indirect.total;
    document.getElementById("data-indirect-cost-breakdown").textContent = `${yearData.indirect.revenue} lost in revenue\n${yearData.indirect.medical} in medical cost\n${yearData.indirect.juridical} in juridical cost`;
}
  
// Load data
window.onload = function() {
    getJson();
}