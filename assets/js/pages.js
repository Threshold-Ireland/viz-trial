// pages to include in rotation (filenames in templates)
let currentPage = 0;

function rotate(num) {
  currentPage = (currentPage + num) % PAGES_IN_ROTATION.length;
  Handlebars.showPage(PAGES_IN_ROTATION[currentPage])
}

function yearSelected(yearSelector) {
  Handlebars.showPage(PAGE_HOME, homeContext(Number(yearSelector.value)))
}

function homeContext(year) {
    return {
        yearSelectData: yearSelectData(year),
        currentSelect: DATA.cost_per_year.find(x => x.year === year),
    }
}

function yearSelectData(selected) {
  const yearSelects = [];
  for (
    var year = DATA.data_info.min_year;
    year <= DATA.data_info.max_year;
    year++
  ) {
    yearSelects.push({
      year: year,
      selected: year === selected,
    });
  }
  return yearSelects;
}