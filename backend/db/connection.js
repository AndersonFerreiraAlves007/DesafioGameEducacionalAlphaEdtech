const { Pool } = require('pg')

const connection = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'gutiguti_db',
    max: 10,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 10000,
    password: 'cueiozim',
    port: 5432,
})

module.exports = { connection }