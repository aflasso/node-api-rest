const {DataTypes, DATE, Model} = require('sequelize')
const {bdmysql} = require('../database/MariaDbConnection')
const {User} =  require('./persona')

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
    },

    entrenador_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },

    fecha_captura: {
        type: DataTypes.DATE,

    },

    activo: {
        type: DataTypes.TINYINT,
        defaultValue: 1
    }

},
    {
        tableName: 'pokemon',
        createdAt: false,
        timestamps: false

    },
)

User.hasMany(Pokemon, {foreignKey: 'entrenador_id'})
Pokemon.belongsTo(User, {foreignKey: 'entrenador_id', onDelete: 'CASCADE'})

module.exports = Pokemon