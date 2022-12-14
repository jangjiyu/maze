const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        phoneNumber: {
          type: Sequelize.STRING(),
          allowNull: false,
          unique: true,
        },
        termsConditionsConsent: {
          type: Sequelize.BOOLEAN(),
          allowNull: false,
        },
        marketingConsent: {
          type: Sequelize.BOOLEAN(),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
