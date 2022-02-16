import { serverConnection } from './server-communication.js';

async function navigationButtonsAndDragEvents() {
    const arrayAmbientes = await serverConnection.listSceneWithItems()

    // Justing testing drag and drop functionality
    $('#item-box').draggable({ revert: "valid" })

    //updateViewScene()

    //if( currentScene === 1){
        $('#pou').droppable({
            drop: async function (event, ui) {
                $(this)
                const currentPet = await serverConnection.getPet(1)
                const newStatus = {
                    xp_food: ((currentPet.xp_food + currentItem.xp_food_change) < 100)?(currentPet.xp_food + currentItem.xp_food_change):100,
                    xp_hygiene: ((currentPet.xp_hygiene + currentItem.xp_hygiene_change) < 100)?(currentPet.xp_hygiene + currentItem.xp_hygiene_change):100,
                    xp_fun: ((currentPet.xp_fun + currentItem.xp_fun_change) < 100)?(currentPet.xp_fun + currentItem.xp_fun_change):100
                }
                serverConnection.updatePet(1, newStatus)
                const audio = new Audio(allAudios[indexScene])
                audio.play()
            }
        })
    //}


    // descomente isso passe o mouse algumas vezes sobre o slime e veja o som meio horripilante
    // $('#pou').mouseover( () => {
    //         const audio = new Audio(allAudios[2]) 
    //         audio.play()
    // })

    // Onload scene initial status
    let currentScene
    let currentItem
    let indexScene = 0
    let indexItem = 0
    const allAudios = [
        "/assets/audios/that-nice-bite.mp3",
        "/assets/audios/469163__hawkeye-sprout__child-hum-02.wav",
        "/assets/audios/535255__yetcop__shower-bath-bucket-being-dragged.wav"
    ]
    updateViewScene()

    function updateViewScene() {
        currentScene = arrayAmbientes[indexScene]
        currentItem = currentScene.items[indexItem]
        $('#environment-text').html(currentScene.name)
        $('main').css('background-image', `url( ${currentScene.url_image})`)

        // set currentIitem to inital whenever the scene is changed
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
        if (currentScene == arrayAmbientes[arrayAmbientes.length - 1]) {
            indexScene = 0
        } else {
            indexScene += 1
        }
        updateViewScene()
    })

    $('#previous-button').on('click', () => {
        if (indexScene == 0) {
            indexScene = arrayAmbientes.length - 1
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

export {navigationButtonsAndDragEvents};