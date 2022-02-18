import { serverConnection } from './server-communication.js';
import { loggedUserId } from '../main-script.js';
import { addBubbles } from './bath-bubbles.js'
import { agoraVai } from '../games/jokenpo/jokenpo.js';

export async function updatePetStatus(loggedUserId, currentItem) {
    const currentPet = await serverConnection.getPet(loggedUserId)
    const newStatus = {
        xp_food: ((currentPet.xp_food + currentItem.xp_food_change) < 100) ? (currentPet.xp_food + currentItem.xp_food_change) : 100,
        xp_hygiene: ((currentPet.xp_hygiene + currentItem.xp_hygiene_change) < 100) ? (currentPet.xp_hygiene + currentItem.xp_hygiene_change) : 100,
        xp_fun: ((currentPet.xp_fun + currentItem.xp_fun_change) < 100) ? (currentPet.xp_fun + currentItem.xp_fun_change) : 100
    }
    await serverConnection.updatePet(loggedUserId, newStatus)
}

async function navigationButtonsAndDragEvents() {
    const allScenesWithItems = await serverConnection.listSceneWithItems()
    let soapLevel = 0;
    
    $('#item-box').draggable({ 
        revert: "valid"
    })

    $('#pou').droppable({
        drop: async function (event, ui) {
            
            if(indexScene !== 2){
                // $(this)
                await updatePetStatus(loggedUserId, currentItem)

                // Get adequate audio for the scene and play it
                audio.src = allAudios[indexScene]
                audio.play()

                if (indexScene === 0) {
                    ui.draggable.remove();

                    $('<div id="item-box"><img id="current-item" src="" alt=""></div>').insertAfter('#previous-item');
                    $('#item-box').draggable({ revert: "valid" })

                    setTimeout(() => {
                        $('#current-item').attr('src', allScenesWithItems[indexScene].items[indexItem].url_image)
                    }, 250);
                }
            
                if (indexScene === 1) {
                    // code jokenpo.js
                    console.log("deu certo");
                    agoraVai();
                }
            }

        },
        over: async function(event, ui){

            const currentPet = await serverConnection.getPet(loggedUserId)

            if(indexScene === 2){
                console.log(ui)
                console.log(ui.draggable[0])
                let internalItem = $('img', ui.draggable[0]).attr('src')
                console.log(internalItem)

                if(internalItem.includes('soap')){
                    soapLevel++;
                    addBubbles(soapLevel);
                }else if(soapLevel > 0){
                    console.log('lavando');
                    console.log(soapLevel)

                    const newStatus = {
                        xp_hygiene: ((currentPet.xp_hygiene + (soapLevel*15)) < 100) ? (currentPet.xp_hygiene + (soapLevel*15)) : 100
                    }
                    
                    serverConnection.updatePet(loggedUserId, newStatus)

                    soapLevel = 0;

                    addBubbles(soapLevel);
                }
                
            }
        }
        
    })

    // Onload scene initial status
    let currentScene
    let currentItem
    let indexScene = 0
    let indexItem = 0
    const allAudios = [
        "/assets/audios/that-nice-bite.mp3",
        "/assets/audios/469163__hawkeye-sprout__child-hum-02.wav",
        "/assets/audios/535255__yetcop__shower-bath-bucket-being-dragged-cut.wav"
    ]
    const audio = new Audio()

    updateViewScene()

    function updateViewScene() {
        currentScene = allScenesWithItems[indexScene]
        currentItem = currentScene.items[indexItem]
        $('#environment-text').html(currentScene.name)
        $('#game-body').css({ 'background-image': `url( ${currentScene.url_image})` })

        // set currentItem to inital whenever the scene is changed
        $('#current-item').attr('src', currentScene.items[0].url_image)
        indexItem = 0

        // reset position of item after altering the scene or the item itself
        resetItemPosition()
    }

    function resetItemPosition() {
        $("#item-box").animate({
            top: "0px",
            left: "0px"
        });
    }

    // Select environment buttons
    $('#next-button').on('click', () => {
        if (currentScene == allScenesWithItems[allScenesWithItems.length - 1]) {
            indexScene = 0
        } else {
            indexScene += 1
        }
        updateViewScene()
    })

    $('#previous-button').on('click', () => {
        if (indexScene == 0) {
            indexScene = allScenesWithItems.length - 1
        } else {
            indexScene -= 1
        }
        updateViewScene()
    })

    // Select item buttons
    $('#previous-item').on('click', () => {
        if (indexItem == 0) {
            indexItem = currentScene.items.length - 1
        } else {
            indexItem -= 1
        }
        currentItem = currentScene.items[indexItem]
        // $('#item-box').html(currentItem.name)
        $('#current-item').attr('src', currentItem.url_image)
        resetItemPosition()
    })

    $('#next-item').on('click', () => {
        if (indexItem == currentScene.items.length - 1) {
            indexItem = 0
        } else {
            indexItem += 1
        }
        currentItem = currentScene.items[indexItem]
        // $('#item-box').html(currentItem.name)
        $('#current-item').attr('src', currentItem.url_image)
        resetItemPosition()
    })
}

export { navigationButtonsAndDragEvents };