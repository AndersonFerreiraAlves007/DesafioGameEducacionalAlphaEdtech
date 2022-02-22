import { serverConnection } from './modules/server-communication.js';
import { navigationButtonsAndDragEvents } from './modules/navigation-and-drag.js';
import { dadosGlobais } from './modules/global-data.js'
import { statusBar } from './modules/update-status-bar.js'
//import { realTime } from './modules/real-time.js'
import { Slime } from './modules/slime.js';
import { optionMenu } from './modules/options-menu.js';

const socket = io('https://apigameeducacional.andersonferreiraalves.com', { transports : ['websocket'] });

let currentSlime;

socket.on("connect", () => {
  console.log(socket.connected); // true
});

socket.on('update pets', function(msg) {
    console.log('kakakka')
    statusBar.updateInfoPet()
    console.log('houve atualização')
});

// current session data and validations
const loggedUserId = localStorage.getItem('user_id');
//const loggedPetId = parseInt(localStorage.getItem('pet_id'), 10);


async function getUser() {

    const dataUsers = await serverConnection.getUserWithPets(Number(loggedUserId));

    currentSlime = new Slime(dataUsers.pet.name, dataUsers.pet.user_id, dataUsers.pet.id, dataUsers.pet.xp_food, dataUsers.pet.xp_fun, dataUsers.pet.xp_hygiene, dataUsers.pet.color);
    console.log(currentSlime.petFullData);

    dadosGlobais.setCurrentPet(dataUsers.pet)
    dadosGlobais.setCurrentUser(dataUsers.user)

    localStorage.setItem("pet_id", String(dataUsers.pet.id));

    statusBar.updateInfoPet()
    navigationButtonsAndDragEvents()
}


if (loggedUserId) {
    getUser(); 
} else {
    window.location.replace('/login');
}



optionMenu();


export { currentSlime };