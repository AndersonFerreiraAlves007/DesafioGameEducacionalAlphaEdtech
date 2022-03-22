const { Pool } = require('pg')

const connection = new Pool({
    user: process.env.USER_DB,
    host: process.env.HOST_DB,
    database: process.env.NAME_DB,
    max: 10,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 10000,
    password: process.env.PASSWORD_DB,
    port: process.env.PORT_DB,
})

module.exports = { connection }