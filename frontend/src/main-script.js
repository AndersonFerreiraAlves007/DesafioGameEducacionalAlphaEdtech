import { serverConnection } from './modules/server-communication.js';
import { navigationButtonsAndDragEvents } from './modules/navigation-and-drag.js';
import { dadosGlobais } from './modules/global-data.js'
import { statusBar } from './modules/update-status-bar.js'
//import { realTime } from './modules/real-time.js'
import { Slime } from './modules/slime.js';
import { optionMenu } from './modules/options-menu.js';

const socket = io('http://127.0.0.1:3333', { transports : ['websocket'] });

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
        //console.log('AKKAKAKAKKAKAKAK')
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
        currentSlime.color = colorValue
    })


    /////////////////////////////////////////


const buttonCancelDialogCreatePet = document.getElementById('btn-cancel-dialog-create-pet')
const buttonConfirmDialogCreatePet = document.getElementById('btn-confirm-dialog-create-pet')

const inputNamePetCreate = $('#name-pet-input-create')
const buttonCreatePet = document.getElementById('btn-create-pet')

const dialogCreatePet = document.getElementById('content-dialog-create-pet')
const dialogCreatePetSelect = document.getElementById('content-dialog-create-pet-select')


function selectColorCreate(colorSelect) {
    dialogCreatePetSelect.innerHTML = ''
    dialogCreatePetSelect.innerHTML += makeOptionColorCreate(colorSelect, 1)
    
}

function makeOptionColorCreate(color, opacity = 0.8) {
    return (
    `
        <div class="container-color-option">
        <div style="background-color: ${color}; opacity: ${opacity}" class="colorOption" onclick="selectColorCreate('${color}')"></div>
        </div>
    `
    )
}

//selectColorCreate('red')

colorOptions.forEach((item) => {
    dialogCreatePet.innerHTML += makeOptionColorCreate(item, 1)
})

buttonCreatePet.addEventListener('click', () => {
    $('#dialog-create-pet').show()
    inputNamePetCreate.val('')
    selectColorCreate('#00a1cc')
})

buttonCancelDialogCreatePet.addEventListener('click', () => {
    $('#dialog-create-pet').hide()
})

buttonConfirmDialogCreatePet.addEventListener('click', async () => {
    const user_id = dadosGlobais.getCurrentUser().id
    const namePetValue = inputNamePetCreate.val()
    const colorValue = document.querySelector('#content-dialog-create-pet-select .colorOption').style.backgroundColor
    /* dadosGlobais.setCurrentPet(await serverConnection.updatePet(dadosGlobais.getCurrentPet().id, {
        name: namePetValue,
        color: colorValue
    })) */
    await serverConnection.createPet(user_id, namePetValue, colorValue)
    $('#dialog-create-pet').hide()
})

  //////////////////////////

//export { loggedUserId, loggedPetId, currentSlime };
export { currentSlime };