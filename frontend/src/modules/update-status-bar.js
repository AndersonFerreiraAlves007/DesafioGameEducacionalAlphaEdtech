import { serverConnection } from './server-communication.js';
import { setDirtLevel } from './slime-body.js';
import { foodComplain } from './slime-speech.js';
import { updateStatusBarView } from './status-bar.js';

const loggedUserId = localStorage.getItem('user_id');

const changeDirtyLevel = setDirtLevel();

class StatusBar {
  constructor() {
    this.hygieneLevel = 0
    this.foodLevel = 0
  }

  updateInfoPet = async () => {
    const data = await serverConnection.getUserWithPets(loggedUserId)
    const currentHygieneLevel = data.pet.xp_hygiene;
    const currentFoodLevel = data.pet.xp_food;
    const currentFunLevel = data.pet.xp_fun;

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
