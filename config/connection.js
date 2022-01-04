// require sequelize
const Sequelize = require("sequelize");

// require dotenv
require("dotenv").config();

// connection to db
const sequelize = process.env.JAWSDB_URL