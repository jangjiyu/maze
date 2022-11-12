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
        authNumber: {
          type: Sequelize.STRING(),
          allowNull: false,
          unique: true,
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

  static associate(db) {
    db.SmsAuthCheck.belongsTo(db.User, {
      foreignKey: "userId",
      targetKey: "userId",
      onDelete: "CASCADE",
    });
  }
};
