const {DataTypes, Sequelize} = require('sequelize')
const {bdmysql} = require('../database/MariaDbConnection')
const { User } = require('./persona')
const Objeto = require('./objeto')

const UsuarioObjeto = bdmysql.define('UsuarioObjeto', {

    usuario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        primaryKey: true
    },

    objeto_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Objeto,
            key: 'id'
        },
        primaryKey: true
    },

    cantidad: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }

}, {
    tableName: 'usuario_objeto',
    timestamps: false
})

User.belongsToMany(Objeto, {through: UsuarioObjeto})
Objeto.belongsToMany(User, {through: UsuarioObjeto})