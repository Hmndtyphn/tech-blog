//  import models, data types
const { Model, DataTypes } = require("sequelize");

// import sequelize from connection
const sequelize = require("../config/connection");

// Post extends Model
class Post extends Model {}

// post function
Post.init(
    {
        // ID data
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        // title
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        // body
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        // ref user id
        user_id: {
            type: DataTypes.INTEGER,

            // ref's user/ id
            references: {
                model: "user",
                key: "id",
            },
        },
    },
    {
        sequelize,

        // modelName
        modelName: "post",

        // stops db from changing name
        freezeTableName: true,

        // underscores> camelCase
        underscored: true,
    }
);

// export post
module.exports = Post;