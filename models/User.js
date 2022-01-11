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
        // ID data
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        // username data
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        // email data
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { isEmail: true },
            unique: true,
        },

        // password data
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [8] },

        },
    },

    {
        hooks: {

            // async for user creation
            async beforeCreate(newUserData) {

                // await bcrypt pw hhash
                newUserData.password = await bcrypt.hash(newUserData.password, 8);

                // return new user
                return newUserData;
            },

            // updating
            async beforeUpdate(updateUserData) {

                // update pw
                updateUserData.password = await bcrypt.hash(

                    // updated
                    updateUserData.password,
                    8
                );

                // returns updated data
                return updateUserData;
            },
        },
        sequlize,

        // modelName
        modelName: "user",

        // stops db from changing name
        freezeTableName: true,

        // underscores> camelCase
        underscored: true,

        // create timestamps for data
        timestamps: true,
    }
);

