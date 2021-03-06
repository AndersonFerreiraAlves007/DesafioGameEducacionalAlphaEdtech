import { HOST_API, HOST_FRONTEND } from '../utils/constants.js'
import { deleteCookies, getCookie } from '../utils/cookies.js'

async function request(url, method = 'GET', body = null) {
  try {
    let options = {}
    if(method === 'POST' || method === 'PUT') {
      options = {
        method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': HOST_FRONTEND,
          'Access-Control-Allow-Credentials': true,
          'our-custom-header': getCookie('access_token')
        },
        credentials: "include",
        body: JSON.stringify(body)
      }
    } else {
      options = {
        method,
        headers: {
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': HOST_FRONTEND,
          'Access-Control-Allow-Credentials': true,
          'our-custom-header': getCookie('access_token')
        },
        credentials: "include",
      }
    }
    const data = await fetch(url, options)
    if(data.status !== 403 && data.status !== 404) {
      const dados = await data.json()
      if(dados.status) {
        return dados.data
      } else {
        throw dados.message
      }
    } else {
      localStorage.clear();
      deleteCookies()
      window.location.replace('/');
    }
  } catch(e) {
    throw e
  }
}

function changeColorId(color = '#00a1cc') {
  $('#path2999-17-9-8-5-3-4').css('fill', color)
}

class BancoDados {
  constructor(host) {
    this.host = host
  }

  async login(username, password) {
    const { user_id, token } = await request(`${this.host}/users/login`, 'POST',{
      username,
      password
    })
    const { pets, ...user } = await request(`${this.host}/users/${user_id}/pets`, 'GET')

    //////
    changeColorId(pets[0].color ? pets[0].color : '#00a1cc')
    ///////

    return {
      user,
      pet: pets[0],
      token
    }
  }

  async register(username, password, namePet) {
    /* const user = await request(`${this.host}/users`, 'POST', {
      username,
      password
    })
    const pet = await request(`${this.host}/pets`, 'POST', {
      user_id: user.id,
      name: namePet
    }) */
    const { user, pet } = await request(`${this.host}/users/register`, 'POST', {
      username,
      password,
      namePet,
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
    const pet = await request(`${this.host}/pets/${id}`, 'GET')
    //////
    changeColorId(pet.color ? pet.color : '#00a1cc')
    ///////
    return pet
  }

  async createPet(user_id, name, color) {
    const pet = await request(`${this.host}/pets`, 'POST', {
      user_id,
      name,
      color
    })
    
    return pet
  }

  async getUserWithPets(id) {
    const { pets, ...user } = await request(`${this.host}/users/${id}/pets`, 'GET')
    
     //////
     changeColorId(pets[0].color ? pets[0].color : '#00a1cc')
     ///////

    return {
      user,
      pet: pets[0],
      pets
    }
  }

  async updateUser(id, body) {
    return await request(`${this.host}/users/${id}`, 'PUT', body)
  }

  async updatePet(id, body) {
    const pet = await request(`${this.host}/pets/${id}`, 'PUT', body)

     //////
     changeColorId(pet.color ? pet.color : '#00a1cc')
     ///////

     return pet
  }

  async listSceneWithItems() {
    return await request(`${this.host}/scenes/all/with_items`, 'GET')
  }

} 

const serverConnection = new BancoDados(HOST_API);

export {serverConnection, BancoDados};