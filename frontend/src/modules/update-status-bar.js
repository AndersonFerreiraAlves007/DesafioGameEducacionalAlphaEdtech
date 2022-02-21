import { serverConnection } from './server-communication.js';
import { updateStatusBarView } from './status-bar.js';
import { dadosGlobais } from './global-data.js'
import { currentSlime } from '../main-script.js'

class StatusBar {
  constructor() {
    this.hygieneLevel = 0
    this.foodLevel = 0
    this.funLevel = 0
  }

  updateInfoPet = async () => {
    dadosGlobais.setCurrentPet(await serverConnection.getPet(dadosGlobais.getCurrentPet().id))
    const pet = dadosGlobais.getCurrentPet()
    const currentHygieneLevel = pet.xp_hygiene;
    const currentFoodLevel = pet.xp_food;
    const currentFunLevel = pet.xp_fun;

    updateStatusBarView(currentFoodLevel, currentHygieneLevel, currentFunLevel)

    if (currentHygieneLevel !== this.hygieneLevel) {
      this.hygieneLevel = currentHygieneLevel;
      currentSlime.renderDirtLevel(this.hygieneLevel);
    }

    if (currentFoodLevel !== this.foodLevel) {
      this.foodLevel = currentFoodLevel;
      currentSlime.foodComplain(this.foodLevel);
    }

    if (currentFunLevel !== this.funLevel) {
      this.funLevel = currentFunLevel;
      currentSlime.xpFun = this.funLevel;
    }
  }
}

const statusBar = new StatusBar()

export { statusBar }