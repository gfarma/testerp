const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define("Order", {
  OrderID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  OrderDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  PartnerID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  TotalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Σε εκκρεμότητα",
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerPhone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  responsible: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Order;
