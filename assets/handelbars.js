let DATA = undefined;
const LOCAL_DATA_FILE = "assets/data.json";

Handlebars.getTemplate = function (name) {
  if (
    Handlebars.templates === undefined ||
    Handlebars.templates[name] === undefined
  ) {
    $.ajax({
      url: "assets/templates/" + name + ".hbs",
      success: function (data) {
        if (Handlebars.templates === undefined) {
          Handlebars.templates = {};
        }
        Handlebars.templates[name] = Handlebars.compile(data);
      },
      async: false,
    });
  }
  return Handlebars.templates[name];
};

function getHomeData() {
  const yearSelects = [];
  for (
    var year = DATA.data_info.min_year;
    year <= DATA.data_info.max_year;
    year++
  ) {
    yearSelects.push({
      year: year,
      selected: year === DATA.data_info.default_year,
      data: JSON.stringify(DATA.cost_per_year.find((x) => x.year === year)),
    });
  }
  return yearSelects;
}

const pagesInRotation = ["home", "rentalCost", "rentOverIncome"];
let currentPage = 0;

function rotate(num) {
  currentPage = (currentPage + num) % pagesInRotation.length;
  showPage(pagesInRotation[currentPage]);
}

function showPage(page) {
  var page = Handlebars.getTemplate(page);
  var initialSelect = DATA.cost_per_year.find(
    (x) => x.year === DATA.data_info.default_year
  );
  var html = page({
    yearSelects: getHomeData(),
    initialSelect: initialSelect,
    // links: [{link: "#", title:'test'}, {link: "#", title:'test2'}]
  });
  $("#page").html(html);
}

window.onload = function () {
  Handlebars.registerHelper("money", (value) => {
    return asMoney(value);
  });

  $("#menu").html(Handlebars.getTemplate("menu"));

  fetch(LOCAL_DATA_FILE)
    .then((response) => {
      console.log("data loaded");
      return response.json();
    })
    .then((data) => {
      DATA = data;
      console.log(DATA);
      showPage("Home");
    })
    .catch((err) => {
      console.log(err);
    });
};
