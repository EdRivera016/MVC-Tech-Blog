// // Imports
// const User = require("./User");
// const Post = require("./Post");
const Comment = require("./Comment");

// // Sets up relationship between tables and allows me to join them using Sequelize
// User.hasMany(Post, {
//   foreignKey: "user_id",
//   onDelete: "CASCADE",
// });

// Post.belongsTo(User, {
//   foreignKey: "user_id",
// });

// User.hasMany(Comment, {
//   foreignKey: "user_id",
//   onDelete: "CASCADE",
// });

// Comment.belongsTo(User, {
//   foreignKey: "user_id",
// });

// Comment.belongsTo(Post, {
//   foreignKey: "Post_id",
//   onDelete: "CASCADE",
// });

// Post.hasMany(Comment, {
//   foreignKey: "Post_id",
//   onDelete: "CASCADE",
// });

// // Export
// module.exports = { User, Post, Comment };

const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const Post = sequelize.define('blogPost', {
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  date_created: Sequelize.DATE,
  user_id: Sequelize.INTEGER
});

const User = sequelize.define('user', {
  username: Sequelize.STRING
});

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Post, {
  foreignKey: "Post_id",
  onDelete: "CASCADE",
});

Post.hasMany(Comment, {
  foreignKey: "Post_id",
  onDelete: "CASCADE",
});

module.exports = { Post, User };
