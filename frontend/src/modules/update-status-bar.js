import { serverConnection } from './server-communication.js';
import { setDirtLevel } from './slime-body.js';
import { foodComplain } from './slime-speech.js';
import { updateStatusBarView } from './status-bar.js';
import { dadosGlobais } from './global-data.js'

const loggedUserId = localStorage.getItem('user_id');

const changeDirtyLevel = setDirtLevel();

class StatusBar {
  constructor() {
    this.hygieneLevel = 0
    this.foodLevel = 0
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
        changeDirtyLevel(this.hygieneLevel);
    }

    if (currentFoodLevel !== this.foodLevel) {
      this.foodLevel = currentFoodLevel;
        foodComplain(this.foodLevel);
    }
  }
}

const statusBar = new StatusBar()

export { statusBar }
