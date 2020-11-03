const { DataTypes } = require('sequelize');

const sequelize = require('../../db')

const Product = sequelize.define('product', {
  // Model attributes are defined here
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
    // allowNull defaults to true
  },
  price: {
    type: DataTypes.NUMBER,
  },
  image: {
    type: DataTypes.BLOB,
    // allowNull defaults to true
  },
  type: {
    type: DataTypes.STRING,
    // allowNull defaults to true
  },
  link: {
    type: DataTypes.STRING,
    // allowNull defaults to true
  },
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log('product:', Product === sequelize.models.product); // true

module.exports = Product;
