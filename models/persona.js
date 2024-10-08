const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MariaDbConnection');



const User = bdmysql.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type:DataTypes.STRING
    },
    fecha_creacion: {
        type: DataTypes.DATE
    },
    activo: {
        type: DataTypes.TINYINT
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
    }

},

{tableName: "Users",
    timestamps: false
}

);

module.exports = {User};
