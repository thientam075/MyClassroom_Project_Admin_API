const { DataTypes } = require('sequelize');
const db = require('../../database');

const User = db.define("User", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
  },
  authType:{
    type: DataTypes.STRING,
    enum: ['local', 'google'],
    defaultValue: 'local',
  },
  authGoogleID:{
    type: DataTypes.STRING,
    defaultValue: null,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  IDstudent: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isActive:{
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  isBan:{
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  }
  
}, {
    tableName: 'User',
    timestamps: true,
});

db.sync({ alter: true }).then(()=> console.log('Create userModel successfully'));

module.exports = User;