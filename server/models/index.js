const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

const User = require("./user");
const LoginHistory = require("./loginHistory");

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.LoginHistory = LoginHistory;

User.init(sequelize);
LoginHistory.init(sequelize);

User.associate(db);
LoginHistory.associate(db);

module.exports = db;
