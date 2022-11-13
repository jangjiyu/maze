const Sequelize = require("sequelize");

module.exports = class SmsAuthCheck extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        smsAuthCheckId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        phoneNumber: {
          type: Sequelize.STRING(),
          allowNull: false,
        },
        authNumber: {
          type: Sequelize.STRING(),
          allowNull: false,
        },
        isAuthenticated: {
          type: Sequelize.BOOLEAN(),
          allowNull: true,
          defaultValue: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "SmsAuthCheck",
        tableName: "smsAuthChecks",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
