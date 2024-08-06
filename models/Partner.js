const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Partner = sequelize.define("Partner", {
  PartnerID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  PartnerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ContactInfo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Partner;
