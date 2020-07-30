function getJson() {
    hideElement("content");
    fetch('assets/data.json').then((response) => {
        return response.json()
    }).then((data) => {
        populateData(data)
        hideElement("loading");
        displayElement("content");
        populateLinkList([{link: "link", title: "link1 title"}, {link: "google.com", title: "google"}])
    }).catch((err)=> {
        console.log(err)
    })
};

function displayElement(id) {
    document.getElementById(id).style.display = "flex";
}

function hideElement(id) {
    document.getElementById(id).style.display = "none";
}

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

function populateLinkList(links) {
    // hide div if we have no links
    if(links.length === 0){
        hideElement("human-costs");  
    }

    const listSpan = document.getElementById("link-list");
    for(id in links) {
        if(id > 0){
            const span = document.createElement('span');
            span.textContent = ', '
            listSpan.appendChild(span)
        }
        const a = document.createElement('a');
        a.href = links[id].link;
        a.textContent = links[id].title;
        listSpan.appendChild(a)
    }
}
  
// Load data
window.onload = function() {
    getJson();
}