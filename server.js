const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");

const routes = require("./controllers");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const helpers = require("./utils/helpers");

// setup Express
const app = express();
const PORT = process.env.PORT || 3001;

// setup handlebars engine with helpers
const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//setup Session
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));

// setup express to us json and routes
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

//start the sql db and then the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Recipes now listening on port: " + PORT));
});
