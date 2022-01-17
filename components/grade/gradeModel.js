const { DataTypes } = require("sequelize");
const db = require("../../database");
const Assignment = require("../assignment/assignmentModel");
const Grade = db.define(
  "Grade",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    studentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "Grade",
    timestamps: false,
  }
);

db.sync({ alter: true });

module.exports = Grade;
