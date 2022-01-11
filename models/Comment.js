// model/ data types
const { Model, DataTypes } = require("sequelize");

// import sequelize from connnection
const sequelize = require("../config/connection");

// comment extends model
class Comment extends Model {}

Comment.init(
    {   
        // id data
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        // comment text
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        // user id
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,

            // ref's user id
            references: {
                model: "user",
                key: "id",
            },
        },

        // post id
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,

            // refs post id
            references: {
                model: "post",
                key: "id",
            },
        },
    },

   { 
    // sequelize data
    sequelize,

        // modelName
        modelName: "post",

        // stops db from changing name
        freezeTableName: true,

        // underscores> camelCase
        underscored: true,
    }
);

//  export comment
module.exports = Comment;