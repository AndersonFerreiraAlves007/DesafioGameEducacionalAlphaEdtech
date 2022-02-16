const sceneswithitems = [
    {
        "name": "cozinha",
        "url_image": "./assets/background-images/cartoon-set-of-kitchen-counter-with-appliances-fridge-microwave-oven-kettle-blender/1819.jpg",
        "id": 1,
        "items": [
            {
                "name": 'uvas',
                "url": "./assets/food-icons/cherries.png"
            },
            {
                "name": 'torradas',
                "url": "./assets/food-icons/bread-egg.png"
            },
            {
                "name": 'cenoura',
                "url": "./assets/food-icons/carrot.png"
            },
            {
                "name": 'rosquinha',
                "url": "./assets/food-icons/donut.png"
            },
            {
                "name": 'batata',
                "url": "./assets/food-icons/french-fries.png"
            },
        ]
    },
    {
        "name": "jogos",
        "url_image": "./assets/background-images/vector-cartoon-illustration-of-empty-kindergarten-room-with-furniture-and-toys-for-young-children-n/1926.jpg",
        "id": 2,
        "items": [
            {
                "name": 'shampoo',
                "url": "./assets/game-icons/joystick.png"
            },
            {
                "name": 'sabonete',
                "name": "./assets/food-icons/french-fries.png"
            },
        ]
    },
    {
        "name": "banheiro",
        "url_image": "./assets/background-images/modern-bathroom-interior-with-furniture-cartoon/304.jpg",
        "id": 2,
        "items": [
            {
                "name": 'shampoo',
                "url": "./assets/game-icons/joystick.png"
            },
            {
                "name": 'sabonete',
                "url": "./assets/food-icons/french-fries.png"
            },
        ]
    }]

const arrayAmbientes = sceneswithitems

// Justing testing drag and drop functionality
$('#item-box').draggable({ revert: "valid" })
$('#pou').droppable({
    drop: function (event, ui) {
        $(this)
            .addClass('yellow')
    }
})

// Onload scene initial status
let currentScene
let indexScene = 0
let indexItem = 0
updateViewScene()

function updateViewScene() {
    currentScene = arrayAmbientes[indexScene]
    $('#environment-text').html(currentScene.name)
    $('main').css('background-image', `url( ${currentScene.url_image})`)
    $('#current-item').attr('src', currentScene.items[0].url)
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
    $('#current-item').attr('src', currentItem.url)
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
    $('#current-item').attr('src', currentItem.url)
    resetItemPosition()
})