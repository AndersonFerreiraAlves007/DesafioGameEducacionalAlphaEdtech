import { eyeMover } from './modules/slime-eyes.js';
import { updateBody, setDirtLevel } from './modules/slime-body.js';
import { serverConnection } from './modules/server-communication.js';
import { foodComplain } from './modules/slime-speech.js';
import { updateStatusBarView } from './modules/status-bar.js';
import { navigationButtonsAndDragEvents } from './modules/navigation-and-drag.js';
import { dadosGlobais } from './modules/global-data.js'
//import { realTime } from './modules/real-time.js'

const socket = io('http://127.0.0.1:3333', { transports : ['websocket'] });

socket.on("connect", () => {
  console.log(socket.connected); // true
});

socket.on('update pets', function(msg) {
    updateInfoPet()
});

// current session data and validations
const loggedUserId = localStorage.getItem('user_id');
const loggedPetId = parseInt(localStorage.getItem('pet_id'), 10);

let currentPet;
let currentUser;

async function getUser() {

    const dataUsers = await serverConnection.getUserWithPets(Number(loggedUserId));
    currentPet = dataUsers.pet;
    currentUser = dataUsers.user;
    dadosGlobais.setCurrentPet(currentPet)
    dadosGlobais.setCurrentUser(currentUser)
    localStorage.setItem("pet_id", String(dataUsers.pet.id));
}

if (loggedUserId) {
    getUser();
} else {
    window.location.replace('/login');
}

// slime responses
eyeMover('path3810-5-6-8', 'path3832-6-8-9', 'path3810-1-7-1-1', 'path3832-7-1-9-8');

updateBody();

const changeDirtyLevel = setDirtLevel();


// STATUS WATCH

let hygieneLevel;
let foodLevel;

/* const statusIntervalId = setInterval(() => {
    serverConnection.getUserWithPets(loggedUserId).then((data) => {

        const currentHygieneLevel = data.pet.xp_hygiene;
        const currentFoodLevel = data.pet.xp_food;
        const currentFunLevel = data.pet.xp_fun;

        updateStatusBarView(currentFoodLevel, currentHygieneLevel, currentFunLevel)

        if (currentHygieneLevel !== hygieneLevel) {
            hygieneLevel = currentHygieneLevel;
            changeDirtyLevel(hygieneLevel);
        }

        if (currentFoodLevel !== foodLevel) {
            foodLevel = currentFoodLevel;
            foodComplain(foodLevel);
        }

    });
}, 1000) */

const updateInfoPet = async () => {
    const data = await serverConnection.getUserWithPets(loggedUserId)
    const currentHygieneLevel = data.pet.xp_hygiene;
    const currentFoodLevel = data.pet.xp_food;
    const currentFunLevel = data.pet.xp_fun;

    updateStatusBarView(currentFoodLevel, currentHygieneLevel, currentFunLevel)

    if (currentHygieneLevel !== hygieneLevel) {
        hygieneLevel = currentHygieneLevel;
        changeDirtyLevel(hygieneLevel);
    }

    if (currentFoodLevel !== foodLevel) {
        foodLevel = currentFoodLevel;
        foodComplain(foodLevel);
    }
}

//realTime.addListenerUpdateXpServer(updateInfoPet)

updateInfoPet()


navigationButtonsAndDragEvents()

/////////////////////////

const colorOptions = [
    'red',
    'blue',
    'green',
    'crimson',
    'black',
    'white',
    'orange',
    '#00a1cc'
]

    const buttonCancelDialogEditPet = document.getElementById('btn-cancel-dialog-edit-pet')
    const buttonConfirmDialogEditPet = document.getElementById('btn-confirm-dialog-edit-pet')
    //const buttonEditPet = document.getElementById('btn-edit-pet')

    const inputNamePet = $('#name-pet-input')
    const buttonEditPet = document.getElementById('btn-edit-pet')

    const dialogEditPet = document.getElementById('content-dialog-edit-pet')
    const dialogEditPetSelect = document.getElementById('content-dialog-edit-pet-select')
    
    function selectColor(colorSelect) {
        dialogEditPetSelect.innerHTML = ''
        dialogEditPetSelect.innerHTML += makeOptionColor(colorSelect, 1)
        
    }
    
    function makeOptionColor(color, opacity = 0.8) {
        return (
        `
            <div class="container-color-option">
            <div style="background-color: ${color}; opacity: ${opacity}" class="colorOption" onclick="selectColor('${color}')"></div>
            </div>
        `
        )
    }
    
    colorOptions.forEach((item) => {
        dialogEditPet.innerHTML += makeOptionColor(item, 1)
    })
    
    selectColor('red')

    buttonEditPet.addEventListener('click', () => {
        $('#dialog-edit-pet').show()
        inputNamePet.val(dadosGlobais.getCurrentPet().name)
        selectColor(dadosGlobais.getCurrentPet().color ? dadosGlobais.getCurrentPet().color : '#00a1cc')
    })

    buttonCancelDialogEditPet.addEventListener('click', () => {
        console.log('AKKAKAKAKKAKAKAK')
        $('#dialog-edit-pet').hide()
    })

    buttonConfirmDialogEditPet.addEventListener('click', async () => {
        $('#dialog-edit-pet').hide()
        const namePetValue = inputNamePet.val()
        const colorValue = document.querySelector('#content-dialog-edit-pet-select .colorOption').style.backgroundColor
        dadosGlobais.setCurrentPet(await serverConnection.updatePet(dadosGlobais.getCurrentPet().id, {
            name: namePetValue,
            color: colorValue
        }))
    })

    
  //////////////////////////

export { loggedUserId, loggedPetId };