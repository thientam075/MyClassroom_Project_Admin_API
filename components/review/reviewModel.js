const { DataTypes } = require("sequelize");
const db = require("../../database");
const Review = db.define(
  "Review",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    gradeId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isTeacher: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gradeWant: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    final: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    tableName: "Review",
    timestamps: false,
  }
);

db.sync({ alter: true });

module.exports = Review;
