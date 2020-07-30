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
  const directCostBreakdown = [
    `${asMoney(yearData.direct.HAP)} in Housing assistance`,
    `${asMoney(yearData.direct.RAS)} in RAS cost`,
    `${asMoney(yearData.direct.charities)} for the charitable sector`,
  ];
  document.getElementById("data-direct-cost-breakdown").textContent = directCostBreakdown.join("\n");
  const indirectCostBreakdown = [
    `${asMoney(yearData.indirect.lost_tax_revenue)} in lost tax revenue from employment`,
    `${asMoney(yearData.indirect.medical_spend)} in additional medical costs`,
    `${asMoney(yearData.indirect.justice_spend)} in additional costs to the justice system`,
  ];
    
  document.getElementById("data-indirect-cost").textContent = asMoney(yearData.indirect.total);
  document.getElementById("data-indirect-cost-breakdown").textContent = indirectCostBreakdown.join("\n");  
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

function asMoney(value) {
  var num = Number(value);
  if (num >= 1e6) {
    const unit = num.toString().split('.')[0].length;
    const unitName = unit < 10 ? "million" : "billion";
    num = (num / ("1e" + (unit-3))).toFixed(3) + " " + unitName;
  }
  return "€ " + num;
}
