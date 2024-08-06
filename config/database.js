const { Sequelize } = require("sequelize");
require("dotenv").config();

// Δημιουργία νέας SQLite βάσης με όνομα 'erp.db'
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "erp.db",
  logging: console.log  // Προσθήκη αυτής της γραμμής
});

module.exports = sequelize;
