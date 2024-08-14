const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MariaDbConnection');



const User = bdmysql.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;
