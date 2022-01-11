// imports from models folder
const User = require("./User");

// import post
const Post = require("./Post");

// import comment
const Comment = require("./Comment");



// user relation 
User.hasMany(Post, {
    foreignKey: "user_id",
});

// post belongs to user id
Post.belongsTo(User, {
    foreignKey: "user_id",
});

// user comment id
User.hasMany(Comment, {
    foreignKey: "user_id",
});

Post.hasMany(Comment, {
    foreignKey: "post_id",
});


// comment belongs to user id
Comment.belongsTo(User, {
    foreignKey: "user_id",
});

// post id comment
Comment.belongsTo(Post, {
    foreignKey: "post_id",
});


// exports users, comments and posts
module.exports = { User, Comment, Post };
