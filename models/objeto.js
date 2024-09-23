const {DataTypes, Model} = require('sequelize')
const {bdmysql} = require('../database/MariaDbConnection')

const Objeto = bdmysql.define('Objeto', {


    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    }

}, {
    tableName: 'objetos',
    timestamps: false
});

module.exports = Objeto