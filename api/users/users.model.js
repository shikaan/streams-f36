const {Model, DataTypes} = require("sequelize");

class User extends Model {
}

User.DEFINITIONS = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING
};

exports.User = User;
