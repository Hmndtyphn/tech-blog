// require all dependencies
const express = require("express");
const path = require("path");

// paths for config/ controllers
const controller = require("./controllers"); 

// require express session
const session = require("express-session"); 

// require handlebars
const exphbs = require("express-handlebars");


const sequelize = require("./config/connection");

// sequlize store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// function for session
const sess = {
    secret: "super secret secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore ({
        db: sequelize,
    }),
};

// intializes server on port 3001
const app = express();
const PORT = process.env.PORT || 3001;

// express/ exp session middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sess));

// allows use of controllers
app.use("/", controller);

// setup/ use handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");


// sync sequelize
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
