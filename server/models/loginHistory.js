const Sequelize = require("sequelize");

module.exports = class LoginHistory extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        loginHistoryId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        time: {
          type: Sequelize.STRING(),
          allowNull: false,
        },
        location: {
          type: Sequelize.STRING(),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "LoginHistory",
        tableName: "loginHistories",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.LoginHistory.belongsTo(db.User, {
      foreignKey: "userId",
      targetKey: "userId",
      onDelete: "CASCADE",
    });
  }
};
