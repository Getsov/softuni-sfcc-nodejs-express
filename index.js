// index.js

/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const { regions } = require('./public/forecast.json');

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

/**
 * Routes Definitions
 */

app.get("/", (req, res) => {
  return res.redirect('/weather')
});

app.get("/weather", (req, res) => {
  res.render("index", { regions });
});

app.post('/weather', function (req, res) {
  res.render("index", { regions, weather: JSON.parse(req.body.region) });
})

/**
 * Server Activation
 */

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});