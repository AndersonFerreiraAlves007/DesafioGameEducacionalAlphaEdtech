import { BancoDados } from './server-communication.js'
import { dadosGlobais } from './global-data.js'
//import { statusBar } from './update-status-bar.js'
import {currentSlime} from '../main-script.js';
import { HOST_API } from '../utils/constants.js'

function changeColorId(color = '#00a1cc') {
  $('#path2999-17-9-8-5-3-4').css('fill', color)
}

class ControlGame {
  #serverConnection

  constructor() {
    this.#serverConnection = new BancoDados(HOST_API);
  }

  // async login(username, password) {
    
  // }

  // async register(username, password, namePet) {
  //   // registar
  //   // dados globais
  //   // status
  // }

  // async getUser(id) {
    
  // }

  // async getPet(id) {
    
  // }

  async createPet(user_id, name, color) {
    await this.#serverConnection.createPet(user_id, name, color);
  }

  // async getUserWithPets(id) {
    
  // }

  // async updateUser(id, body) {
    
  // }

  async updateStatusBar(foodLevel, hygieneLevel, funLevel, petName){
    $("#progressbar").progressbar({
      value: foodLevel
    })
    $('#progressbar-number').html(foodLevel)

    $("#hygienebar").progressbar({
        value: hygieneLevel
    })
    $('#hygienebar-number').html(hygieneLevel)

    $('#funbar').progressbar({
        value: funLevel
    })
    $('#fun-number').html(funLevel)

    $('#pet-name').html(petName)
  }

  async updatePet(petId, body) {

    if(body){
      await this.#serverConnection.updatePet(petId, body);

      const newPetData = await this.#serverConnection.getPet(dadosGlobais.getCurrentPet().id);
      dadosGlobais.setCurrentPet(newPetData);
      this.updateStatusBar(dadosGlobais.getCurrentPet().xp_food, dadosGlobais.getCurrentPet().xp_hygiene, dadosGlobais.getCurrentPet().xp_fun, dadosGlobais.getCurrentPet().name);

      currentSlime.updateSlime();

    }else{
      //case no body is passed, a server side update is assumed
      const serverBody = await this.#serverConnection.getPet(dadosGlobais.getCurrentPet().id);
      this.updateStatusBar(serverBody.xp_food, serverBody.xp_hygiene, serverBody.xp_fun, serverBody.name);
      dadosGlobais.setCurrentPet(serverBody)

      currentSlime.updateSlime();

    }

  }

  // async listSceneWithItems() {
    
  // }

  async changeCurrentScene(_sceneIndex){

    const allScenes = await this.#serverConnection.listSceneWithItems();
    const maximumIndex = allScenes.length - 1

    let sceneIndex;
    if(_sceneIndex > maximumIndex){
      sceneIndex = 0;
    }else if(_sceneIndex < 0){
      sceneIndex = maximumIndex;
    }else{
      sceneIndex = _sceneIndex;
    }

    
    const currentScene = allScenes[sceneIndex];
    dadosGlobais.setCurrentScene(currentScene)
    dadosGlobais.setCurrentItem(currentScene.items[0])

  }

  async changeCurrentItem (currentId, operation){
    const allScenes = await this.#serverConnection.listSceneWithItems();
    const currentScene = allScenes[dadosGlobais.getCurrentScene().id - 1];
    const availableItens = currentScene.items;

    let currentIndex;

    availableItens.forEach((element, index) => {
      if(element.id === currentId){
        currentIndex = index;
      }
    });

    if(operation === 'next'){

      if((currentIndex + 1) <= (availableItens.length -1)){
        dadosGlobais.setCurrentItem(availableItens[currentIndex + 1])
      }else{
        dadosGlobais.setCurrentItem(availableItens[0])
      }

    }else if(operation === 'previous'){

      if((currentIndex - 1) < 0){
        dadosGlobais.setCurrentItem(availableItens[(availableItens.length -1)])
      }else{
        dadosGlobais.setCurrentItem(availableItens[currentIndex - 1])
      }

    }
  }

}

const gameController = new ControlGame()

export {gameController}