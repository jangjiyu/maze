const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

const User = require("./user");
const SmsAuthCheck = require("./smsAuthCheck");

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.SmsAuthCheck = SmsAuthCheck;

User.init(sequelize);
SmsAuthCheck.init(sequelize);

module.exports = db;
