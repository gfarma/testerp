const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  ProductID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ProductName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ProductImage: {
    type: DataTypes.STRING
  },
  EshopSKU: {
    type: DataTypes.STRING
  },
  Suppliercode: {
    type: DataTypes.STRING
  },
  Source: {
    type: DataTypes.STRING,
    defaultValue: 'Erp'
  }
});

module.exports = Product;
