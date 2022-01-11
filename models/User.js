// imports models, data types
const { Model, DataTypes } = require("sequelize");

// import bcrypt
const bcrypt = require("bcrypt");

// import sequelize
const sequelize = require("../config/connection");

// User extends Model
class User extends Model {

    // checks for login
    checkPassword(loginPass) {

        // return method
        return bcrypt.compareSync(loginPass, this.password);
    }
}

// User model
User.init(
    {
        // ID
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        // username
    }
)

