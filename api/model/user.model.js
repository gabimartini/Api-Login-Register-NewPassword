const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = require('../../db')

const User = sequelize.define('useradmin', {
  id: {
    sparse: true,
    type: String,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    // allowNull defaults to true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const hash = bcrypt.hashSync(value, 10);
      this.setDataValue('password', hash);
    },
  },
  createdat: Sequelize.DATE,
  updatedat: Sequelize.DATE,
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log('user:', User === sequelize.models.useradmin); // true

module.exports = User;
