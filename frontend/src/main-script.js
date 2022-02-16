import { eyeMover } from './modules/slime-eyes.js';
import { updateBody, setDirtLevel } from './modules/slime-body.js';
import { serverConnection } from './modules/server-communication.js';
import { foodComplain } from './modules/slime-speech.js';
import { updateStatusBarView } from './modules/status-bar.js';
import { navigationButtonsAndDragEvents } from './modules/navigation-and-drag.js';


eyeMover('path3810-5-6-8', 'path3832-6-8-9', 'path3810-1-7-1-1', 'path3832-7-1-9-8');

updateBody();

const changeDirtyLevel = setDirtLevel();




// STATUS WATCH

let hygieneLevel;
let foodLevel;

const statusIntervalId = setInterval(() => {
    serverConnection.getUserWithPets(1).then((data) => {
        console.log(data);

        const currentHygieneLevel = data.pet.xp_hygiene;
        const currentFoodLevel = data.pet.xp_food;
        const currentFunLevel = data.pet.xp_fun;

        updateStatusBarView(currentFoodLevel, currentHygieneLevel, currentFunLevel)

        console.log(hygieneLevel + ' x ' + currentHygieneLevel);

        if (currentHygieneLevel !== hygieneLevel) {
            hygieneLevel = currentHygieneLevel;
            changeDirtyLevel(hygieneLevel);
        }

        if (currentFoodLevel !== foodLevel) {
            foodLevel = currentFoodLevel;
            foodComplain(foodLevel);
        }

    });
}, 1000)



navigationButtonsAndDragEvents()