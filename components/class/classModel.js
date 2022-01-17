const { DataTypes } = require('sequelize');
const db = require('../../database');
const Assignment = require('../assignment/assignmentModel');
const Grade = require('../grade/gradeModel');
const Class = db.define('Class', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inviteCodeTeacher: {
    type: DataTypes.STRING,
  },
  inviteCodeStudent: {
    type: DataTypes.STRING,
  }

}, {
    tableName: 'Class',
    timestamps: true
}); 
Class.hasMany(Assignment,{
  foreignKey: 'ClassId'
})
Class.hasMany(Grade,{
  foreignKey: 'ClassId'
})
db.sync({ alter: true });

module.exports = Class;