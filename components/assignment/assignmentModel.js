const { DataTypes } = require('sequelize');
const db = require('../../database');
const Grade = require('../grade/gradeModel');
const Assignment = db.define('Assignment', {
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
  point: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  ClassId: {
    type: DataTypes.INTEGER,
  },
  NO: {
    type: DataTypes.INTEGER,
  }

}, {
    tableName: 'Assignment',
    timestamps: false
}); 
Assignment.hasMany(Grade,{
  foreignKey: 'AssignmentId'
})
db.sync({ alter: true });

module.exports = Assignment;