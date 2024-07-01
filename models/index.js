// Imports
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// Sets up relationship between tables and allows me to join them using Sequelize
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

// Export
module.exports = { User, Post, Comment };