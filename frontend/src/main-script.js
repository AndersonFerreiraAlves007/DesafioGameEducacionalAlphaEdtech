import { eyeMover } from "./modules/slime-eyes.js";
import { updateBody, setDirtLevel } from "./modules/slime-body.js";
import {BancoDados} from "./modules/server-communication.js";
import {foodComplain} from "./modules/slime-speech.js";

eyeMover('path3810-5-6-8', 'path3832-6-8-9', 'path3810-1-7-1-1','path3832-7-1-9-8');

updateBody();

const changeDirtyLevel = setDirtLevel();

const serverConnection = new BancoDados('http://127.0.0.1:3333');


// STATUS WATCH

let hygieneLevel;
let foodLevel;

const statusIntervalId = setInterval(()=>{
    serverConnection.getUserWithPets(1).then((data)=>{
        console.log(data);
    
        const currentHygieneLevel = data.pets[0].xp_hygiene;
        const currentFoodLevel = data.pets[0].xp_food;

        console.log(hygieneLevel + ' x ' + currentHygieneLevel);
    
        if(currentHygieneLevel !== hygieneLevel){
            hygieneLevel = currentHygieneLevel;
            changeDirtyLevel(hygieneLevel);
        }

        if(currentFoodLevel !== foodLevel){
            foodLevel = currentFoodLevel;
            foodComplain(foodLevel);
        }
        
    });
}, 1000)



