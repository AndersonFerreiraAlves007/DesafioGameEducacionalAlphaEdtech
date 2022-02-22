class DadosGlobais {
  constructor() {
    this.dados = {
      currentItem: null,
      currentScene: null,
      currentUser: null,
      currentPet: null
    };
  }

  // getters

  getAllData() {
    return this.dados
  }

  getCurrentItem() {
    return this.dados.currentItem
  }

  getCurrentScene() {
    return this.dados.currentScene
  }

  getCurrentUser() {
    return this.dados.currentUser
  }

  getCurrentPet() {
    return this.dados.currentPet
  }

  // setters

  setAllData(data) {
    this.dados = {
      ...this.dados,
      ...this.dados
    }
  }

  setCurrentItem(value) {
    this.dados = {
      ...this.dados,
      currentItem: value
    }
  }

  setCurrentScene(value) {
    this.dados = {
      ...this.dados,
      currentScene: value
    }
  }

  setCurrentUser(value) {
    this.dados = {
      ...this.dados,
      currentUser: value
    }
  }

  setCurrentPet(value) {
    this.dados = {
      ...this.dados,
      currentPet: value
    }
  }

}

const dadosGlobais = new DadosGlobais() 

export {dadosGlobais};