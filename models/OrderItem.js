const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const OrderItem = sequelize.define("OrderItem", {
  OrderItemID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  OrderID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ProductID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ProductImage: {
    type: DataTypes.STRING
  },
  productnotes: {
    type: DataTypes.TEXT
  },
  ΜΜ: {
    type: DataTypes.DECIMAL(10, 2)
  },
  Ποσοτητα: {
    type: DataTypes.INTEGER
  },
  ΤιμήΜονάδας: {
    type: DataTypes.DECIMAL(10, 2)
  },
  ΤιμήΠοσότητας: {
    type: DataTypes.DECIMAL(10, 2)
  },
  Κατάσταση: {
    type: DataTypes.STRING
  },
  ΗμερομηνίαΑλλαγήςΚατάστασης: {
    type: DataTypes.DATE
  }
});

module.exports = OrderItem;
