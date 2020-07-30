# viz-trial

Experiments in visualizing data about homelessness and its cost: https://threshold-ireland.github.io/viz-trial/

## Repo structure

The repo uses [handelbars](https://handlebarsjs.com/) as a templating engine for html.

The `templates` folder contains the partial html files. To add a new page or graph add a new `.hbs` file to the `templates` folder, and include it in both the [rotation](assets/js/constants.js) and the [menu](assets/templates/menu.hbs).