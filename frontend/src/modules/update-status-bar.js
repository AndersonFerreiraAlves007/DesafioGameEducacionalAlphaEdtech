import { serverConnection } from './server-communication.js';
import { updateStatusBarView } from './status-bar.js';
import { currentSlime } from '../main-script.js';

class StatusBar {
  constructor() {
    this.hygieneLevel = 0
    this.foodLevel = 0
    this.funLevel = 0
  }

  updateInfoPet = async () => {
    console.log(await currentSlime.petFullData.id)
    const data = await serverConnection.getUserWithPets(await currentSlime.petFullData.userId)
    const currentHygieneLevel = data.pet.xp_hygiene;
    const currentFoodLevel = data.pet.xp_food;
    const currentFunLevel = data.pet.xp_fun;

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