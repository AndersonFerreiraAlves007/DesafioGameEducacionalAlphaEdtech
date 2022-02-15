async function request(url, method = 'GET', body = null) {
    try {

        let options = {}

        if(method === 'POST' || method === 'PUT') {
            options = {
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
        }
        } else {
            options = {
                method,
            }
        }

        const data = await fetch(url, options)

        const dados = await data.json()

        if(dados.status) {
            return dados.data
        } else {
            throw dados.message
        }

    } catch(e) {
        throw 'Erro na rede!'
    }
}
  
class BancoDados {
    constructor(host) {
        this.host = host
    }

    async login(username, password) {
        return await request(`${this.host}/login`, {
            username,
            password
        })
    }

    async register(username, password, namePet) {
        const user = await request(`${this.host}/login`, 'POST', {
            username,
            password
        })

        await request(`${this.host}/login`, 'POST', {
            user_id: user.id,
            name: namePet
        })

        return await request(`${this.host}/users/${user.id}/pets`, 'GET')

    }

    async getUserWithPets(id) {
        return await request(`${this.host}/users/${id}/pets`, 'GET')
    }

    async updateUser(id, body) {
        return await request(`${this.host}/users/${id}`, 'PUT', body)
    }

    async updatePet(id, body) {
        return await request(`${this.host}/pets/${id}`, 'PUT', body)
    }

    async listSceneWithItems() {
        return await request(`${this.host}/scenes/all/with_items`, 'GET')
    }

}

  export {BancoDados};