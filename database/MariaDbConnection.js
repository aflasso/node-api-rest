const {Sequelize} = require('sequelize')

const bdmysql = new Sequelize(
    'test',
    'root',
    '',
    {
        host: 'localhost',
        port: '3307',
        dialect: 'mariadb',
    }
)

module.exports = {bdmysql}