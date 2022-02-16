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
    throw e
  }
}

class BancoDados {
  constructor(host) {
    this.host = host
  }

  async login(username, password) {
    const { user_id } = await request(`${this.host}/login`, {
      username,
      password
    })
    const { pets, ...user } = await request(`${this.host}/users/${user_id}/pets`, 'GET')
    return {
      user,
      pet: pets[0]
    }
  }

  async register(username, password, namePet) {
    const user = await request(`${this.host}/users`, 'POST', {
      username,
      password
    })
    const pet = await request(`${this.host}/pets`, 'POST', {
      user_id: user.id,
      name: namePet
    })
    return {
      user,
      pet
    }
  }

  async getUser(id) {
    return await request(`${this.host}/users/${id}`, 'GET')
  }

  async getPet(id) {
    return await request(`${this.host}/pets/${id}`, 'GET')
  }

  async getUserWithPets(id) {
    const { pets, ...user } = await request(`${this.host}/users/${id}/pets`, 'GET')
    return {
      user,
      pet: pets[0]
    }
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

const serverConnection = new BancoDados('http://127.0.0.1:3333');

export {serverConnection};