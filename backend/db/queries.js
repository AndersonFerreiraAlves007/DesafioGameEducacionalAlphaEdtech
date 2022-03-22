const { connection } = require('./connection.js')

// Provides a more debugable connection method
async function getClient() {
    try {
        const client = await connection.connect();


        // store the original form for the methods we are going to patch
        const query = client.query;
        const release = client.release;

        const timeoutId = setTimeout(() => {
            console.log('A client has been checked out for more than 5 seconds!');
            console.log(`The last executed query on this client was: ${client.lastQuery}`);
        }, 5000);

        // monkey patch the query method, by adding a lastQuery property to the current connection,
        //to keep track of the last query executed
        client.query = (...args) => {
            client.lastQuery = args;
            return query.apply(client, args);
        }

        // monkey patch the release method so that it "unmonckey patch" both, himself and the query methods
        client.release = () => {
            // clear our timeout
            clearTimeout(timeoutId);

            // set the methods back to their old un-monkey-patched version
            client.query = query;
            client.release = release;

            return release.apply(client);
        }

        return client

    } catch (error) {
        console.log(error);
    }

}

// method that takes any query string and optional query parameters
// and returns an array with the query result
async function query(queryString, parameters) {
    const client = await getClient();
    // const start = Date.now();
    const response = await client.query(queryString, parameters);
    // const duration = Date.now() - start;
    // console.log('Query executada!', {queryString, duration, rows: response.rowCount});
    client.release();
    return response.rows;
}

module.exports = {
    async listQuery(table) {
        return await query(`SELECT * from ${table}`)
    },

    async createQuery(table, body) {
        let fields = ''
        let fieldData = ''
        let values = []
        
        const temp = Object.entries(body)
        temp.forEach((item, index) => {
            if (index === temp.length - 1 ) {
                fields += `${item[0]}`
                fieldData += `$${index + 1}`
                values.push(`${item[1]}`) 
            } else {
                fields += `${item[0]},`
                fieldData += `$${index + 1},`
                values.push(`${item[1]}`) 
            }
        })

        return await query(`INSERT INTO ${table} (${fields}) VALUES (${fieldData}) RETURNING *`, values)
    },

    async updateQuery(table, body, id) {
        let fields = ''
        let values = []
        
        const temp = Object.entries(body)
        temp.forEach((item, index) => {
            if (index === temp.length - 1 ) {
                fields += `${item[0]} = $${index + 1}` 
                values.push(`${item[1]}`) 
            } else {
                fields += `${item[0]} = $${index + 1},`
                values.push(`${item[1]}`) 
            }
        })

        return await query(`UPDATE ${table} SET ${fields} WHERE id = ${id} RETURNING *`, values)
        
    },

    async deleteQuery(table, id) {
        return await query(`DELETE FROM ${table} WHERE id = $1 RETURNING *`, [id] )        
    },

    async truncateQuery(table) {
        return await query(`TRUNCATE TABLE ${table}`)        
    }
}