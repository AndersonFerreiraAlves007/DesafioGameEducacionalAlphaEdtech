import {dadosGlobais} from './global-data.js';
import { serverConnection } from './server-communication.js';
import {currentSlime} from '../main-script.js';
import {gameController} from './control-game.js';
import { sendNotification } from './notification.js'
import { deleteCookies } from '../utils/cookies.js'
import { statusBar } from './update-status-bar.js';

function optionMenu(){

    // MAIN OPTIONS MENU
    const menuButton = document.getElementById('options-menu-button');
    const closeMenuButton = document.getElementById('button-close-menu');

    menuButton.addEventListener('click', showMenu);

    closeMenuButton.addEventListener('click', ()=>{document.getElementById('menu-area').style.display = 'none'})

    function showMenu(event){
        const menuArea = document.getElementById('menu-area');

        menuArea.style.display = 'flex';
    }

    // CREDITS MENU
    const buttonShowCredits = document.getElementById('btn-credits');

    const buttonCloseCredits = document.getElementById('btn-close-credits');

    buttonCloseCredits.addEventListener('click', ()=>{document.getElementById('dialog-credits').style.display = 'none'});

    buttonShowCredits.addEventListener('click', showCreditsWindow);

    function showCreditsWindow(event) {
        const creditsWindow = document.getElementById('dialog-credits');

        creditsWindow.style.display = 'flex';
    }

    // CHANGE PET COLOR MENU
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
        $('#dialog-edit-pet').hide()
    })

    function validateNamepet(namePet) {
        return /^[a-zA-Z][\w ]{2,49}$/.test(namePet)
    }

    buttonConfirmDialogEditPet.addEventListener('click', async () => {
        if(validateNamepet(inputNamePet.val().trim().replace(/\s+/, ' '))) {
            $('#dialog-edit-pet').hide()
            const namePetValue = inputNamePet.val().trim().replace(/\s+/, ' ')
            const colorValue = document.querySelector('#content-dialog-edit-pet-select .colorOption').style.backgroundColor
            dadosGlobais.setCurrentPet(await serverConnection.updatePet(dadosGlobais.getCurrentPet().id, {
                name: namePetValue,
                color: colorValue
            }))
            currentSlime.color = colorValue
            await statusBar.updateInfoPet()
        } else {
            sendNotification('error', 'M??n 3, m??x 50 caracteres alfanum??ricos ou espa??os, e deve come??ar com uma letra).')
        }
    })

    // CREATE PET MENU
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
        inputNamePetCreate.attr('placeholder', 'Nome do pet');
        inputNamePetCreate.css({'border': 'none'});
        $('#dialog-create-pet').hide()
    })

    buttonConfirmDialogCreatePet.addEventListener('click', async () => {
        const user_id = dadosGlobais.getCurrentUser().id
        const namePetValue = inputNamePetCreate.val().trim().replace(/\s+/, ' ')
        const colorValue = document.querySelector('#content-dialog-create-pet-select .colorOption').style.backgroundColor

        if(validateNamepet(inputNamePetCreate.val().trim().replace(/\s+/, ' '))) {
            inputNamePetCreate.attr('placeholder', 'Nome do pet');
            inputNamePetCreate.css({'border': 'none'});
            dadosGlobais.setCurrentPet(await gameController.createPet(user_id, namePetValue, colorValue));
            await statusBar.updateInfoPet();
            currentSlime.color = dadosGlobais.getCurrentPet().color;
            $('#dialog-create-pet').hide()
        } else {
            sendNotification('error', 'M??n 3, m??x 50 caracteres alfanum??ricos ou espa??os, e deve come??ar com uma letra).')
        }

    })

    const buttonLogout = document.getElementById('btn-logout')

    buttonLogout.addEventListener('click', () => {
        localStorage.clear();
        deleteCookies()
        window.location.replace('/');
    })

    // AGRADECIMENTOS MENU

    const buttonShowAgradecimentos = document.getElementById('btn-agradecimentos');

    const buttonCloseAgradecimentos = document.getElementById('btn-close-agradecimentos');

    buttonCloseAgradecimentos.addEventListener('click', ()=>{document.getElementById('dialog-agradecimentos').style.display = 'none'});

    buttonShowAgradecimentos.addEventListener('click', showAgradecimentosWindow);

    function showAgradecimentosWindow(event) {
        const agradecimentosWindow = document.getElementById('dialog-agradecimentos');

        agradecimentosWindow.style.display = 'flex';
    }

    
    // MANUAL MENU

    const buttonShowManual = document.getElementById('btn-manual');

    const videoArea = document.getElementById('video-manual');

    const buttonCloseManual = document.getElementById('btn-close-manual');

    buttonCloseManual.addEventListener('click', ()=>{
        document.getElementById('dialog-manual').style.display = 'none'
        document.querySelector('video').remove();
    });

    buttonShowManual.addEventListener('click', showManualWindow);

    function showManualWindow(event) {
        const manualWindow = document.getElementById('dialog-manual');

        manualWindow.style.display = 'flex';

        videoArea.insertAdjacentHTML('beforeend',`
            <video src="./assets/videos/manual/manual.mp4" controls></video>
        `)

        const video = document.querySelector('video');

        video.volume = dadosGlobais.getVolumeAudio();
        video.play();
    }

}

export {optionMenu}