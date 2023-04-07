const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model{

    checkPassword(loginPass) {
        return bcrypt.compareSync(loginPass, this.password);
      }


}

User.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'user',
    freezeTableName: true,
    hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
              },
            }
  }  
);

module.exports = User;