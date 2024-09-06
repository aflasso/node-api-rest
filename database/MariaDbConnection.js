const {Sequelize} = require('sequelize')

const bdmysql = new Sequelize(
    'test',
    'root',
    '',
    {
        host: 'localhost',
        port: process.env.DBPORT,
        dialect: 'mariadb',
    }
)

module.exports = {bdmysql}