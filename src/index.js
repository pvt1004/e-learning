const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");
const path = require("path");
const app = express();
const port = 3000;

const route = require("./routes");
const db = require("./config/db");

const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(methodOverride("_method"));

// Connect to db
db.connect();

app.use(express.static(path.join(__dirname, "public")));

//  Http logger
app.use(morgan("combined"));

// Template engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));
console.log(__dirname);

// Home, search, contact

// Routes init
route(app);

// 127.0.0.1 - localhost
app.listen(port, () => {
  console.log(`App listening on port //:localhost:${port}`);
});
