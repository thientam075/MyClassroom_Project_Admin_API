const { DataTypes } = require("sequelize");
const db = require("../../database");
const Notification = db.define(
  "Notification",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isNew: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    }
  },
  {
    tableName: "Notification",
    timestamps: true,
  }
);

db.sync({ alter: true }).then(()=> console.log('Create notificationModel successfully'));;

module.exports = Notification;
