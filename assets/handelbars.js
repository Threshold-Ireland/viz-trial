let DATA = undefined;
const LOCAL_DATA_FILE = "assets/data.json";

function getData() {
  console.log("loading data");
  //   hideElement("content");
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
}

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
    yearSelects.push({ "year": year, "selected": year === DATA.data_info.default_year });
  }
  return yearSelects;
}

function showPage(page) {
  var page = Handlebars.getTemplate(page);
var currentSelect = DATA.cost_per_year.find(
    (x) => x.year === DATA.data_info.default_year
  );
  var html = page({
    yearSelects: getHomeData(),
    currentSelect: currentSelect,
  });
  $("#page").html(html);
}

window.onload = function () {
  Handlebars.registerHelper("money", (value) => {
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
  });

  $("#menu").html(Handlebars.getTemplate("menu"));
  getData();
};
