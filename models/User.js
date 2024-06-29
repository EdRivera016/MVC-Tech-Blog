const { Model, DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcryptjs.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      }
    }
  },
  {
    hooks: {
      // Before creating a new user, hash the password
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcryptjs.hash(newUserData.password, 10);
        return newUserData;
      },
      // Before updating an existing user, hash the password
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcryptjs.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
