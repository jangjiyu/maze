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

  static associate(db) {
    db.User.hasMany(db.LoginHistory, {
      foreignKey: "userId",
      sourceKey: "userId",
      onDelete: "CASCADE",
    });
    db.User.hasMany(db.SmsAuthCheck, {
      foreignKey: "userId",
      sourceKey: "userId",
      onDelete: "CASCADE",
    });
  }
};
