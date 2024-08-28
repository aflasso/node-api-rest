const {DataTypes} = require('sequelize')
const {bdmysql} = require('../database/MariaDbConnection')

const Pokemon = bdmysql.define('pokemon', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre: {
        type: DataTypes.STRING,
        allowNull: false

    },

    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    nivel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }

})