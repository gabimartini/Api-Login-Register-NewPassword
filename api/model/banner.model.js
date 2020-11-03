const { DataTypes } = require('sequelize');

const sequelize = require('../../db')

const Banner = sequelize.define('banner', {
  // Model attributes are defined here
  id: {
    sparse: true,
    type: String,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },
  photo: {
    type: DataTypes.BLOB,
    // allowNull defaults to true
  },
});

// `sequelize.define` also returns the model
console.log('banner:', Banner === sequelize.models.banner); // true

module.exports = Banner;
