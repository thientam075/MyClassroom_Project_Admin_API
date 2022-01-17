const { DataTypes } = require('sequelize');
const db = require('../../database');

const Admin = db.define("Admin", {
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
    allowNull: false,
  },
  role:{
    type: DataTypes.INTEGER, // 1: super admin, 0: admin
    defaultValue: 0,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isBan:{
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  }
}, {
    tableName: 'Admin',
    timestamps: true,
});

db.sync({ alter: true }).then(()=> console.log('Create Admin successfully'));
module.exports = Admin;