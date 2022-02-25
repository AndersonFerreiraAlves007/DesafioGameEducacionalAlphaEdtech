import { BancoDados } from './server-communication.js'
import { dadosGlobais } from './global-data.js'
import { statusBar } from './update-status-bar.js'

function changeColorId(color = '#00a1cc') {
  $('#path2999-17-9-8-5-3-4').css('fill', color)
}

class ControlGame {
  #serverConnection

  constructor() {
    this.#serverConnection = new BancoDados('http://localhost:3333');
  }

  async login(username, password) {
    
  }

  async register(username, password, namePet) {
    // registar
    // dados globais
    // status
  }

  async getUser(id) {
    
  }

  async getPet(id) {
    
  }

  async createPet(user_id, name, color) {
    
  }

  async getUserWithPets(id) {
    
  }

  async updateUser(id, body) {
    
  }

  async updatePet(id, body) {
    
  }

  async listSceneWithItems() {
    
  }

}