import { serverConnection } from './server-communication.js';
import { currentSlime} from '../main-script.js';
import { addBubbles } from './bath-bubbles.js'
import { agoraVai } from './mini-games/jokenpo.js';
import { dadosGlobais } from './global-data.js'
import { statusBar } from './update-status-bar.js'

let loggedPetId;


export async function updatePetStatus(loggedPetId, currentItem) {
    /* const currentPet = await serverConnection.getPet(loggedPetId) */
    console.log(currentItem)
    const currentPet = dadosGlobais.getCurrentPet()

    const newStatus = {
        xp_food: ((currentPet.xp_food + currentItem.xp_food_change) < 100) ? (currentPet.xp_food + currentItem.xp_food_change) : 100,
        xp_hygiene: ((currentPet.xp_hygiene + currentItem.xp_hygiene_change) < 100) ? (currentPet.xp_hygiene + currentItem.xp_hygiene_change) : 100,
        xp_fun: ((currentPet.xp_fun + currentItem.xp_fun_change) < 100) ? (currentPet.xp_fun + currentItem.xp_fun_change) : 100
    }
    dadosGlobais.setCurrentPet(await serverConnection.updatePet(currentPet.id, newStatus))
    await statusBar.updateInfoPet()
}

async function navigationButtonsAndDragEvents() {

    loggedPetId = await currentSlime.petFullData.id

    const allScenesWithItems = await serverConnection.listSceneWithItems()
    let soapLevel = 0;
    
    $('#item-box').draggable({ 
        containment: $('body'), // prevents page from scrolling when something is dragged to the edge of the screen
        revert: "valid"
    })

    $('#pou').droppable({
        drop: async function (event, ui) {
            
            if(indexScene !== 2){
                await updatePetStatus(loggedPetId, dadosGlobais.getCurrentItem())

                // Get adequate audio for the scene and play it
                audio.src = allAudios[indexScene]
                audio.play()

                if (indexScene === 0) {
                    const currentItem = dadosGlobais.getCurrentItem();
                    await updatePetStatus(loggedPetId, currentItem)

                    // Get adequate audio for the scene and play it
                    audio.src = allAudios[indexScene]
                    audio.play()

                
                    // smother animation bite in this 2 lines below
                    $('#current-item').animate({width: 0, height: 0}, 100)
                    setTimeout(() => ui.draggable.remove(), 100)
                    // ui.draggable.remove()

                    $('<div id="item-box"><img id="current-item" src="" alt=""></div>').insertAfter('#previous-item');
                    $('#item-box').draggable({ 
                        containment: $('body'), // prevents page from scrolling when something is dragged to the edge of the screen
                        revert: "valid"
                    })

                    setTimeout(() => {
                        $('#current-item').attr('src', allScenesWithItems[indexScene].items[indexItem].url_image)
                    }, 250);

                    // diferent animation solution
                    // $('#item-box').width(100)
                    // $('#current-item').animate({width: 0, height: 0}, 100)
                    // $('#current-item').animate({width: '100px', height: '100px'}, 300)

                }
            
                if (indexScene === 1) {
                    // code jokenpo.js
                    //console.log("deu certo");
                    agoraVai();
                }
            }

        },
        over: async function(event, ui){

            /* const currentPet = await serverConnection.getPet(loggedPetId) */

            const currentPet = dadosGlobais.getCurrentPet()

            if(indexScene === 2){
                //console.log(ui)
                //console.log(ui.draggable[0])
                let internalItem = $('img', ui.draggable[0]).attr('src')
                //console.log(internalItem)

                if(internalItem.includes('soap')){
                    soapLevel++;
                    addBubbles(soapLevel);
                }else if(soapLevel > 0){
                    //console.log('lavando');
                    //console.log(soapLevel)

                    const newStatus = {
                        xp_hygiene: ((currentPet.xp_hygiene + (soapLevel*15)) < 100) ? (currentPet.xp_hygiene + (soapLevel*15)) : 100
                    }
                    
                    dadosGlobais.setCurrentPet(await serverConnection.updatePet(loggedPetId, newStatus))
                    await statusBar.updateInfoPet()
                    audio.src = allAudios[indexScene]
                    audio.play()

                    soapLevel = 0;

                    addBubbles(soapLevel);
                }
                
            }
        }
        
    })

    // Onload scene initial status
/*     let currentScene
    let currentItem */
    let indexScene = 0
    let indexItem = 0
    const allAudios = [
        "/assets/audios/that-nice-bite.mp3",
        "/assets/audios/469163__hawkeye-sprout__child-hum-02.wav",
        "/assets/audios/535255__yetcop__shower-bath-bucket-being-dragged-cut.wav"
    ]
    const audio = new Audio()
    const transitionAudio = new Audio('./assets/audios/door-front-opening-shorter.mp3')
    const itemSelectorAudio = new Audio('./assets/audios/washing-machine-selector-switch-one.mp3')

    updateViewScene()

    function updateViewScene() {
        dadosGlobais.setCurrentScene(allScenesWithItems[indexScene])
        const currentScene = dadosGlobais.getCurrentScene()
        dadosGlobais.setCurrentItem(currentScene.items[indexItem])
        $('#environment-text').html(currentScene.name)
        $('#game-body').css({ 'background-image': `url( ${currentScene.url_image})` })

        // set currentItem to inital whenever the scene is changed
        $('#current-item').attr('src', currentScene.items[0].url_image)
        indexItem = 0

        // reset position of item after altering the scene or the item itself
        resetItemPosition()
       
        // catch autoplay error on page load
        const playOnPageChange = transitionAudio.play();
        playOnPageChange.then(()=>{}).catch(error=>{})
        
    }

    function resetItemPosition() {
        $("#item-box").animate({
            top: "0px",
            left: "0px"
        });
    }

    // Select environment buttons
    $('#next-button').on('click', () => {
        const currentScene = dadosGlobais.getCurrentScene()
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
        const currentScene = dadosGlobais.getCurrentScene()
        if (indexItem == 0) {
            indexItem = currentScene.items.length - 1
        } else {
            indexItem -= 1
        }
        dadosGlobais.setCurrentItem(currentScene.items[indexItem])
        const currentItem = dadosGlobais.getCurrentItem()
        // $('#item-box').html(currentItem.name)
        $('#current-item').attr('src', currentItem.url_image)
        itemSelectorAudio.play()
        resetItemPosition()
    })

    $('#next-item').on('click', () => {
        const currentScene = dadosGlobais.getCurrentScene()
        if (indexItem == currentScene.items.length - 1) {
            indexItem = 0
        } else {
            indexItem += 1
        }
        dadosGlobais.setCurrentItem(currentScene.items[indexItem])
        const currentItem = dadosGlobais.getCurrentItem()
        // $('#item-box').html(currentItem.name)
        $('#current-item').attr('src', currentItem.url_image)
        itemSelectorAudio.play()
        resetItemPosition()
    })
}

export { navigationButtonsAndDragEvents };