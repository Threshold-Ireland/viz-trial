const DATA_FILE =
  "https://github.com/Threshold-Ireland/MS-Hackathon/blob/master/data.json";


function displayElement(id) {
  document.getElementById(id).style.display = "flex";
}

function hideElement(id) {
  document.getElementById(id).style.display = "none";
}

function populateData(data) {
  populateYears(data.data_info, data.cost_per_year, "year-select");
}

function populateYears(yearInfo, yearlyCostData, divID) {
  const yearDict = {};
  yearlyCostData.map(yearData =>{ yearDict[yearData.year] = yearData})
  populateDataFromYear(yearDict[yearInfo.default_year]);

  const id = document.getElementById(divID);
  for (var year = yearInfo.min_year; year <= yearInfo.max_year; year++) {
    id.appendChild(new Option(year, JSON.stringify(yearDict[year]), undefined, selected=year === yearInfo.default_year));
  }
}

function yearSelected(yearSelector) {
  populateDataFromYear(JSON.parse(yearSelector.value));
}

function populateDataFromYear(yearData) {
    console.log(yearData)
  const cost = document.getElementById("data-cost");
  cost.textContent = asMoney(yearData.total);

  document.getElementById("data-direct-cost").textContent = asMoney(
    yearData.direct.total
  );
  const costBreakdown = [
    `${asMoney(yearData.direct.HAP)} in Housing assistance`,
    `${asMoney(yearData.direct.RAS)} in RAS cost`,
    `${asMoney(yearData.direct.charities)} for the charitable sector`,
  ];
  document.getElementById("data-direct-cost-breakdown").textContent = costBreakdown.join("\n");
  document.getElementById("data-indirect-cost").textContent = asMoney(yearData.indirect);
  // data currently not available
  // document.getElementById("data-indirect-cost-breakdown").textContent = `${yearData.indirect.revenue} lost in revenue\n${yearData.indirect.medical} in medical cost\n${yearData.indirect.juridical} in juridical cost`;
}

function populateLinkList(links) {
  // hide div if we have no links
  if (links.length === 0) {
    hideElement("human-costs");
  }

  const listSpan = document.getElementById("link-list");
  for (id in links) {
    if (id > 0) {
      const span = document.createElement("span");
      span.textContent = ", ";
      listSpan.appendChild(span);
    }
    const a = document.createElement("a");
    a.href = links[id].link;
    a.textContent = links[id].title;
    listSpan.appendChild(a);
  }
}

const UNITS = ["million", "billion", "trillion", "quadrillion"];

function asMoney(value) {
  var num = Number(value);
  // curtsey of https://gist.github.com/MartinMuzatko/1060fe584d17c7b9ca6e
  if (num >= 1e6) {
    // Divide to get SI Unit engineering style numbers (1e3,1e6,1e9, etc)
    var unit = Math.floor((num / 1000).toFixed(0).toString().length);
    var unitName = UNITS[Math.floor(unit / 3) - 1];
    // output number remainder + unitName
    num = (num / ("1e" + (unit + 2))).toFixed(3) + " " + unitName;
  }
  return "€ " + num;
  //return Number(value).toLocaleString('en-IE', { style: 'currency', currency: 'EUR' })
}
