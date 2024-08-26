const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MariaDbConnection');



const User = bdmysql.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true
    },

    usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwor: {
        type: DataTypes.STRING,
        allowNull: false
    }
},

{tableName: "Users",
    timestamps: false
}

);

module.exports = {User};
