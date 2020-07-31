let DATA = undefined;

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

Handlebars.showPage = function (page, context=undefined) {
  if(page === PAGE_HOME && !context){
    context = homeContext(DATA.data_info.default_year)
  }
  const compliedPage = Handlebars.getTemplate(page);
  var html = compliedPage(context);
  $(PAGE_ID).html(html);
}

window.onload = function () {
  Handlebars.registerHelper("money", (value) => {
    return asMoney(value);
  });
  
  Handlebars.registerHelper("houses", (value) => {
    return asHouses(value);
  });

  $(MENU_ID).html(Handlebars.getTemplate(MENU_TEMPLATE));

  fetch(LOCAL_DATA_FILE)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      DATA = data;
      Handlebars.showPage(PAGE_HOME)
    })
    .catch((err) => {
      console.log(err);
    });
};

// helper function to format number as money
function asMoney(value) {
  var num = Number(value);
  if (num >= 1e6) {
    const unit = num.toString().split('.')[0].length;
    const unitName = unit < 10 ? "million" : "billion";
    num = (num / ( unit < 10 ? 1e6 : 1e9)).toFixed(3) + " " + unitName;
  }
  return "€ " + num;
}

// Simple division, using quoted 250k figure as of mid-2020
function asHouses(value) {
  var num = Number(value);
  return Math.round(num / 250000);
}
