const { connection } = require('./connection.js')

async function getClient() {
    try {
        const client = await connection.connect();


        const query = client.query;
        const release = client.release;

        const timeoutId = setTimeout(() => {
            console.log('A client has been checked out for more than 5 seconds!');
            console.log(`The last executed query on this client was: ${client.lastQuery}`);
        }, 5000);

        client.query = (...args) => {
            client.lastQuery = args;
            return query.apply(client, args);
        }

        client.release = () => {
            clearTimeout(timeoutId);

            client.query = query;
            client.release = release;

            return release.apply(client);
        }

        return client

    } catch (error) {
        console.log(error);
    }

}

async function query(queryString, parameters) {
    const client = await getClient();
    const response = await client.query(queryString, parameters);
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