import {dadosGlobais} from './global-data.js';
import {gameController} from './control-game.js';
import { currentSlime } from '../main-script.js';
import {colorGameStart} from './mini-games/colors-game.js';
import { agoraVai } from './mini-games/jokenpo.js';
import { sendNotification } from './notification.js';

let currentEnvironment;
let soapLevel = 0;

let soapMobileIncrement = 0;

//audio controls
const allAudios = [
    './assets/audios/washing-machine-selector-switch-one.mp3',
    './assets/audios/door-front-opening-shorter.mp3'
];

const fxAudio = new Audio();

function playAudio(audioSrc){

    fxAudio.src = audioSrc;

    if(fxAudio.paused){
        fxAudio.volume = dadosGlobais.getVolumeAudio();
        fxAudio.play();
    }else{
        fxAudio.currentTime = 0;
    }

}

//

function loadEnvironment (){
    
    gameController.changeCurrentScene(0)
    .then(()=>{
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            // true for mobile device
            currentEnvironment = 'mobile';

            //screen.orientation.lock('portrait-primary') //não funciona e gera erro no console, tratar com um evento e mensagem
            //if(screen.orientation.angle > 0 ){console.log('favor usar o celular no modo retrato')}

            // prevents opening the context menu on long touch - view: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/oncontextmenu
            window.oncontextmenu = (event)=>{
                event.preventDefault();
                event.stopPropagation();
            }

            mobileEnvironment();
        }else{
            // false for not mobile device
            //console.log("not mobile device: " + navigator.userAgent);
            currentEnvironment = 'computer';
            computerEnvironment()
        }
    });
    

}

// COMPUTER ENVIRONMENT INTERACTION
async function computerEnvironment(){

    // set current scene
    setCurrentScene();

    //kitchen logic
    if(dadosGlobais.getCurrentScene().id === 1){
       

        //remove game room behavior
        $('#item-box').off('click');
        $('#item-box').off('dragstart');
        $('#guti').droppable({
            disabled: false
        })
        $('#item-box').css({'cursor': 'grab'})

        $('#item-box').draggable({ 
            containment: $('body'), // prevents page from scrolling when something is dragged to the edge of the screen
            revert: true,
            disabled: false
        })

        $('#guti').droppable({
            drop: async function (event, ui) {
                
                if(dadosGlobais.getCurrentPet().xp_hygiene <= 40){
                    sendNotification('warning','Estou muito sujo para comer!', 3)
                }else{
                    if(dadosGlobais.getCurrentPet().xp_food < 100){
                        $('#item-box').draggable({ revert: false})
                        $('#current-item').animate({width: 0, height: 0}, 250)
                    
                        setTimeout(() =>{
                            ui.draggable.remove()
                            const currentItem = dadosGlobais.getCurrentItem();
        
                            currentSlime.feed(currentItem);
            
                            $('<div id="item-box"><img id="current-item" src="" alt=""></div>').insertAfter('#previous-item');
                            $('#item-box').draggable({ 
                                containment: $('body'), // prevents page from scrolling when something is dragged to the edge of the screen
                                revert: true
                            })
                        }, 250)
        
                        setTimeout(() => {
                            $('#current-item').attr('src', dadosGlobais.getCurrentItem().url_image)
                        }, 260);
                    }else{
                        sendNotification('warning','Estou satisfeito!', 3)
                    }
                }


            }

            
        })
    }

    //game  room logic
    if(dadosGlobais.getCurrentScene().id === 2){
        
        //disable dragging effects
        $('#item-box').draggable({
            disabled: true
        });

        //disable dragging behavior
        $('#item-box').on('dragstart', (event)=>{
            event.preventDefault();
        })

        $('#guti').droppable({
            disabled: true
        })

        $('#item-box').css({'cursor': 'pointer'})

        //Mini-game picker
        $('#item-box').on('click', (event)=>{
            
            if(dadosGlobais.getCurrentPet().xp_food < 50 && dadosGlobais.getCurrentPet().xp_hygiene < 50){
                sendNotification('warning','Estou sujo e com fome!', 3)
            }else if(dadosGlobais.getCurrentPet().xp_food < 50){
                sendNotification('warning','Estou com fome!', 3)
            }else if(dadosGlobais.getCurrentPet().xp_hygiene < 50){
                sendNotification('warning','Estou muito sujo para brincar!', 3)
            }else{
                const currentGame = dadosGlobais.getCurrentItem().name;

                switch (currentGame){
                    case 'rock-paper-scissors':
                        agoraVai();
                        break;
                    case 'memory-game':
                        document.getElementById('minigame-remember').style.display = 'flex'
                        break;
                    case 'colors-game':
                        colorGameStart()
                        break;
                }
            }

        })
    }

    //bathroom logic
    if(dadosGlobais.getCurrentScene().id === 3){



        //remove game room behavior
        $('#item-box').off('click');
        $('#item-box').off('dragstart');
        $('#guti').droppable("destroy");
        $('#item-box').draggable({
            disabled: false
        });
        $('#item-box').css({'cursor': 'grab'})

        $('#guti').droppable({
            drop: async function (event, ui) {},
            over: async function(event, ui){

                const currentPet = dadosGlobais.getCurrentPet()
    
                let internalItem = $('img', ui.draggable[0]).attr('src')

                if(internalItem.includes('soap')){
                    soapLevel++;
                    currentSlime.addBubbles(soapLevel);

                }else if(internalItem.includes('shower') && soapLevel > 0){

                    const newStatus = {
                        xp_hygiene: ((currentPet.xp_hygiene + (soapLevel*15)) < 100) ? (currentPet.xp_hygiene + (soapLevel*15)) : 100
                    }
                    
                    gameController.updatePet(dadosGlobais.getCurrentPet().id, newStatus);

                    soapLevel = 0;

                    currentSlime.addBubbles(soapLevel);
                }else if(internalItem.includes('shower')){
                    sendNotification('warning','E o sabão?', 3)
                }

            }
        })
    }
}

////

// MOBILE ENVIRONMENT INTERACTION
async function mobileEnvironment() {

    const itemElement = document.getElementById('item-box');

    // set current scene
    setCurrentScene();

    //get item start position in the main page flow
    const itemStartPosition = itemElement.getBoundingClientRect();
    const itemDimensions = {width: itemElement.getBoundingClientRect().width, height: itemElement.getBoundingClientRect().height}

    //get slime coordinates
    const slimeCoordinates = document.getElementById('slime-body').getBoundingClientRect();
    const slimeXPosition = [slimeCoordinates.x, slimeCoordinates.x + slimeCoordinates.width]
    const slimeYPosition = [slimeCoordinates.y, slimeCoordinates.y + slimeCoordinates.height]

    

    //kitchen logic
    if (dadosGlobais.getCurrentScene().id === 1) {
        
        itemElement.onclick = '';
        itemElement.ontouchmove = ''
        itemElement.ontouchend = ''

        //change the display of the item to absolute
        itemElement.style.position = 'absolute';
        itemElement.style.left = (itemStartPosition.x) + 'px';
        itemElement.style.top = itemStartPosition.y + 'px';
        itemElement.style.zIndex = 900;

        //fixes the item selector position
        document.getElementById('previous-item').classList.add('item-selector-arrows');

        itemElement.ontouchmove = dragFoodHandler
        itemElement.ontouchend = releaseFoodHandler

    }

    //game room logic
    if (dadosGlobais.getCurrentScene().id === 2) {

        //disable dragging behavior
        itemElement.ontouchmove = ''
        itemElement.ontouchend = ''

        itemElement.style.zIndex = 900;



        //Mini-game picker
        itemElement.onclick = function(){

            if(dadosGlobais.getCurrentPet().xp_food < 50 && dadosGlobais.getCurrentPet().xp_hygiene < 50){
                sendNotification('warning','Estou sujo e com fome!', 3)
            }else if(dadosGlobais.getCurrentPet().xp_food < 50){
                sendNotification('warning','Estou com fome!', 3)
            }else if(dadosGlobais.getCurrentPet().xp_hygiene < 50){
                sendNotification('warning','Estou muito sujo para brincar!', 3)
            }else{
                const currentGame = dadosGlobais.getCurrentItem().name;

                switch (currentGame) {
                    case 'rock-paper-scissors':
                        agoraVai();
                        break;
                    case 'memory-game':
                        document.getElementById('minigame-remember').style.display = 'flex'
                        break;
                    case 'colors-game':
                        colorGameStart()
                        break;
                }
            }
        }
        
    }

    //bathroom logic
    if (dadosGlobais.getCurrentScene().id === 3) {

        itemElement.onclick = '';
        itemElement.ontouchmove = ''
        itemElement.ontouchend = ''

        //change the display of the item to absolute
        itemElement.style.position = 'absolute';
        itemElement.style.left = (itemStartPosition.x) + 'px';
        itemElement.style.top = itemStartPosition.y + 'px';
        itemElement.style.zIndex = 900;

        //fixes the item selector position
        document.getElementById('previous-item').classList.add('item-selector-arrows');

        itemElement.ontouchmove = dragBathHandler
        itemElement.ontouchend = releaseBathHandler

    }

    // drag and drop handlers
    
    function dragFoodHandler(event) {

        // prevent scrolling while dragging item
        event.preventDefault();

        let touchPosition = event.targetTouches[0];
        let maxRange = {
            x: window.screen.availWidth,
            y: window.screen.availHeight
        }

        if(touchPosition.pageX <= (maxRange.x - itemDimensions.width/4)){
            itemElement.style.left = (touchPosition.pageX - itemDimensions.width/2) + 'px';
        }
        
        if(touchPosition.pageY <= (maxRange.y - itemDimensions.height/2)){
            itemElement.style.top = (touchPosition.pageY - itemDimensions.height/2 ) + 'px';
        }
        
    }

    function releaseFoodHandler(event){
        const releasePosition = {x: parseInt(itemElement.style.left) + (itemDimensions.width/2), y: parseInt(itemElement.style.top) + (itemDimensions.height/2) };
        
        const currentItem = dadosGlobais.getCurrentItem();

        if(releasePosition.x >= slimeXPosition[0] && releasePosition.x <= slimeXPosition[1] 
        && releasePosition.y >= slimeYPosition[0] && releasePosition.y <= slimeYPosition[1]){

            if(dadosGlobais.getCurrentPet().xp_hygiene <= 40){
                sendNotification('warning','Estou muito sujo para comer!', 3)
                itemElement.style.top = itemStartPosition.y + 'px';
                itemElement.style.left = itemStartPosition.x + 'px';
            }else{
                if(dadosGlobais.getCurrentPet().xp_food < 100){
                    currentSlime.feed(currentItem)

                    itemElement.className = 'feedAnimation';
        
                    setTimeout(()=>{
                        itemElement.style.top = itemStartPosition.y + 'px';
                        itemElement.style.left = itemStartPosition.x + 'px';
                        itemElement.className = '';
                    },500)
                }else{
                    sendNotification('warning','Estou satisfeito!', 3)
                    itemElement.style.top = itemStartPosition.y + 'px';
                    itemElement.style.left = itemStartPosition.x + 'px';
                }
            }


        } else {
            itemElement.style.top = itemStartPosition.y + 'px';
            itemElement.style.left = itemStartPosition.x + 'px';
        }

    }

    function dragBathHandler(event) {

        // prevent scrolling while dragging item
        event.preventDefault();

        const currentShowerItem = document.getElementById('current-item').getAttribute('src');

        const currentPosition = {x: parseInt(itemElement.style.left), y: parseInt(itemElement.style.top) };

        if(currentShowerItem.includes('soap')){
            if(currentPosition.x >= slimeXPosition[0] && currentPosition.x <= slimeXPosition[1] 
            && currentPosition.y >= slimeYPosition[0] && currentPosition.y <= slimeYPosition[1]){
                soapMobileIncrement ++
                if(soapMobileIncrement === 10){
                    soapLevel++
                    currentSlime.addBubbles(soapLevel);
                    soapMobileIncrement = 0;
                }
            }
        }

        let maxRange = {
            x: window.screen.availWidth,
            y: window.screen.availHeight
        }
        
        let touchPosition = event.targetTouches[0];

        if(touchPosition.pageX <= (maxRange.x - itemDimensions.width/3)){
            itemElement.style.left = touchPosition.pageX - itemDimensions.width/2 + 'px';
        }
        
        if(touchPosition.pageY <= (maxRange.y - itemDimensions.height/2)){
            itemElement.style.top = touchPosition.pageY - itemDimensions.height/2 + 'px';
        }

        
    }

    function releaseBathHandler(event) {

        const currentShowerItem = document.getElementById('current-item').getAttribute('src');

        const currentPosition = {x: parseInt(itemElement.style.left) + itemDimensions.width/2, y: parseInt(itemElement.style.top) + itemDimensions.height/2};

        if(currentShowerItem.includes('shower')){
            if(currentPosition.x >= slimeXPosition[0] && currentPosition.x <= slimeXPosition[1] 
            && currentPosition.y >= slimeYPosition[0] && currentPosition.y <= slimeYPosition[1]
            ){
                if(soapLevel > 0){
                    const currentPet = dadosGlobais.getCurrentPet()

                    const newStatus = {
                        xp_hygiene: ((currentPet.xp_hygiene + (soapLevel * 15)) < 100) ? (currentPet.xp_hygiene + (soapLevel * 15)) : 100
                    }
                    gameController.updatePet(dadosGlobais.getCurrentPet().id, newStatus);
    
                    soapLevel = 0;
    
                    currentSlime.addBubbles(soapLevel);
                }else{
                    sendNotification('warning','E o sabão?', 3)
                }


            }
        }
        
        itemElement.style.top = itemStartPosition.y + 'px';
        itemElement.style.left = itemStartPosition.x + 'px';
        

        
    }
}


// SCENE SCREEN RENDERER FUNCTION
function setCurrentScene(){

    const currentScene = dadosGlobais.getCurrentScene()

    $('#environment-text').html(currentScene.name)
    $('#game-body').css({ 'background-image': `url( ${currentScene.url_image})` })
    $('#current-item').attr('src', currentScene.items[0].url_image)
}

// SCENES NAVIGATION
$('#next-button').on('click', () => {
    const currentSceneIndex = dadosGlobais.getCurrentScene().id

    gameController.changeCurrentScene(currentSceneIndex)
    .then(()=>{
        if(currentEnvironment === 'mobile'){
            mobileEnvironment()
        }else{
            computerEnvironment();
        }
        playAudio(allAudios[1]);
    }) ;

})

$('#previous-button').on('click', () => {
    const currentSceneIndex = dadosGlobais.getCurrentScene().id -2

    gameController.changeCurrentScene(currentSceneIndex)
    .then(()=>{
        if(currentEnvironment === 'mobile'){
            mobileEnvironment()
        }else{
            computerEnvironment();
        }
        playAudio(allAudios[1]);
    }) ;

})

// ITEMS NAVIGATION
$('#next-item').on('click', () => {
    gameController.changeCurrentItem(dadosGlobais.getCurrentItem().id, 'next')
    .then(()=>{
        $('#current-item').attr('src', dadosGlobais.getCurrentItem().url_image);
        playAudio(allAudios[0]);
    });
})

$('#previous-item').on('click', () => {
    gameController.changeCurrentItem(dadosGlobais.getCurrentItem().id, 'previous')
    .then(()=>{
        $('#current-item').attr('src', dadosGlobais.getCurrentItem().url_image);
        playAudio(allAudios[0]);
    });
})


export {loadEnvironment};