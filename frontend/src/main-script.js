import { serverConnection } from './modules/server-communication.js';
//import { navigationButtonsAndDragEvents } from './modules/navigation-and-drag.js';
import { dadosGlobais } from './modules/global-data.js'
import { statusBar } from './modules/update-status-bar.js'
import { Slime } from './modules/slime.js';
import { optionMenu } from './modules/options-menu.js';
import { HOST_API } from './utils/constants.js'
import { loadEnvironment } from './modules/main-enviroment.js';
import { gameController } from './modules/control-game.js';

const socket = io(HOST_API, { transports : ['websocket'] });

let currentSlime;

socket.on("connect", () => {
//   console.log(socket.connected); // true
});

socket.on('update pets', function(msg) {
    //statusBar.updateInfoPet()
    gameController.updatePet(dadosGlobais.getCurrentPet().id)
});

// current session data and validations
const loggedUserId = localStorage.getItem('user_id');


async function getUser() {

    const dataUsers = await serverConnection.getUserWithPets(Number(loggedUserId));
    console.log(dataUsers)

    currentSlime = new Slime(dataUsers.pet.name, dataUsers.pet.user_id, dataUsers.pet.id, dataUsers.pet.xp_food, dataUsers.pet.xp_fun, dataUsers.pet.xp_hygiene, dataUsers.pet.color);

    dadosGlobais.setCurrentPet(dataUsers.pet)
    dadosGlobais.setCurrentUser(dataUsers.user)
    console.log(dadosGlobais)

    localStorage.setItem("pet_id", String(dataUsers.pet.id));

    statusBar.updateInfoPet()
    loadEnvironment();
    //navigationButtonsAndDragEvents()
}


if (loggedUserId) {
    getUser(); 
} else {
    window.location.replace('/login');
}



optionMenu();


export { currentSlime };