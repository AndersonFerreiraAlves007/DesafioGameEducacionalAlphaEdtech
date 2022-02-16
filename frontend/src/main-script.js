import { eyeMover } from "./modules/slime-eyes.js";
import { updateBody, setDirtLevel } from "./modules/slime-body.js";
import { BancoDados } from "./modules/server-communication.js";
import { foodComplain } from "./modules/slime-speech.js";

eyeMover('path3810-5-6-8', 'path3832-6-8-9', 'path3810-1-7-1-1', 'path3832-7-1-9-8');

updateBody();

const changeDirtyLevel = setDirtLevel();

const serverConnection = new BancoDados('http://127.0.0.1:3333');


// STATUS WATCH

let hygieneLevel;
let foodLevel;

const statusIntervalId = setInterval(() => {
    serverConnection.getUserWithPets(1).then((data) => {
        console.log(data);

        const currentHygieneLevel = data.pet.xp_hygiene;
        const currentFoodLevel = data.pet.xp_food;

        updateStatusBarView(currentFoodLevel, currentHygieneLevel)

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




// const sceneswithitems = [
//     {
//         "name": "cozinha",
//         "url_image": "./assets/background-images/cartoon-set-of-kitchen-counter-with-appliances-fridge-microwave-oven-kettle-blender/1819.jpg",
//         "id": 1,
//         "items": [
//             {
//                 "name": 'uvas',
//                 "url": "./assets/food-icons/cherries.png"
//             },
//             {
//                 "name": 'torradas',
//                 "url": "./assets/food-icons/bread-egg.png"
//             },
//             {
//                 "name": 'cenoura',
//                 "url": "./assets/food-icons/carrot.png"
//             },
//             {
//                 "name": 'rosquinha',
//                 "url": "./assets/food-icons/donut.png"
//             },
//             {
//                 "name": 'batata',
//                 "url": "./assets/food-icons/french-fries.png"
//             },
//         ]
//     },
//     {
//         "name": "jogos",
//         "url_image": "./assets/background-images/vector-cartoon-illustration-of-empty-kindergarten-room-with-furniture-and-toys-for-young-children-n/1926.jpg",
//         "id": 2,
//         "items": [
//             {
//                 "name": 'shampoo',
//                 "url": "./assets/game-icons/joystick.png"
//             },
//             {
//                 "name": 'sabonete',
//                 "url": "./assets/food-icons/french-fries.png"
//             },
//         ]
//     },
//     {
//         "name": "churras",
//         "url_image": "./assets/background-images/modern-bathroom-interior-with-furniture-cartoon/304.jpg",
//         "id": 2,
//         "items": [
//             {
//                 "name": 'shampoo',
//                 "url": "./assets/game-icons/joystick.png"
//             },
//             {
//                 "name": 'sabonete',
//                 "url": "./assets/food-icons/french-fries.png"
//             },
//         ]
//     }]

function updateStatusBarView(foodLevel, hygieneLevel) {
    $("#progressbar").progressbar({
        value: foodLevel
    })
    $('#progressbar-number').html(foodLevel)

    $("#hygienebar").progressbar({
        value: hygieneLevel
    })
    $('#hygienebar-number').html(hygieneLevel)
}

async function foo() {
    const arrayAmbientes = await serverConnection.listSceneWithItems()

    // Justing testing drag and drop functionality
    $('#item-box').draggable({ revert: "valid" })
    $('#pou').droppable({
        drop: async function (event, ui) {
            $(this)
            const currentPet = await serverConnection.getPet(1)
            const newStatus = {
                xp_food: currentPet.xp_food + currentItem.xp_food_change,
                xp_hygiene: currentPet.xp_hygiene + currentItem.xp_hygiene_change,
                xp_fun: currentPet.xp_fun + currentItem.xp_fun_change
            }
            serverConnection.updatePet(1, newStatus)
            const audio = new Audio(allAudios[indexScene])
            audio.play()
        }
    })

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

foo()