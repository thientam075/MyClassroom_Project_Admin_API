const { DataTypes } = require('sequelize');
const db = require('../../database');
const User = require('../users/userModel');
const Class = require('../class/classModel');
const UserinClass = db.define("UserinClass", {
  role: {
    type: DataTypes.INTEGER, //0: Student, 1: Teacher, 2: Teacher create class
    allowNull: false,
  },
}, {
    tableName: 'UserinClass',
    timestamps: false
}); 

User.belongsToMany(Class,{through: UserinClass});
Class.belongsToMany(User, {through: UserinClass});

db.sync({ alter: true }).then(()=> console.log('Create userinclass successfully'));

module.exports = UserinClass;