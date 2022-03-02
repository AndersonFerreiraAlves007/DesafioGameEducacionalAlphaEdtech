import {dadosGlobais} from './global-data.js';
import {gameController} from './control-game.js';
import { currentSlime } from '../main-script.js';
import {colorGameStart} from './mini-games/colors-game.js';
import { agoraVai } from './mini-games/jokenpo.js';

let currentEnvironment;
let soapLevel = 0;

//audio controls
const allAudios = [
    './assets/audios/washing-machine-selector-switch-one.mp3',
    './assets/audios/door-front-opening-shorter.mp3'
];

const fxAudio = new Audio();

function playAudio(audioSrc){

    fxAudio.src = audioSrc;

    if(fxAudio.paused){
        fxAudio.play();
    }else{
        fxAudio.currentTime = 0;
    }

}

//

function loadEnvironment (){
    
    gameController.changeCurrentScene(0)
    .then(()=>{
        console.log(dadosGlobais.getCurrentScene());
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            // true for mobile device
            console.log("mobile device: " + navigator.userAgent);
            currentEnvironment = 'mobile';
        }else{
            // false for not mobile device
            console.log("not mobile device: " + navigator.userAgent);
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
       
        console.log('tá na cozinha')

        //remove game room behavior
        $('#item-box').off('click');
        $('#item-box').off('dragstart');
        $('#guti').droppable({
            disabled: false
        })

        $('#item-box').draggable({ 
            containment: $('body'), // prevents page from scrolling when something is dragged to the edge of the screen
            revert: true,
            disabled: false
        })

        $('#guti').droppable({
            drop: async function (event, ui) {
                

                $('#current-item').animate({width: 0, height: 0}, 250)
                setTimeout(() => ui.draggable.remove(), 50)
                
                const currentItem = dadosGlobais.getCurrentItem();

                currentSlime.feed(currentItem);

                $('<div id="item-box"><img id="current-item" src="" alt=""></div>').insertAfter('#previous-item');
                $('#item-box').draggable({ 
                    containment: $('body'), // prevents page from scrolling when something is dragged to the edge of the screen
                    revert: true
                })

                setTimeout(() => {
                    $('#current-item').attr('src', dadosGlobais.getCurrentItem().url_image)
                }, 260);

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

        //Mini-game picker
        $('#item-box').on('click', (event)=>{
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

        $('#guti').droppable({
            drop: async function (event, ui) {},
            over: async function(event, ui){

                const currentPet = dadosGlobais.getCurrentPet()
    
                let internalItem = $('img', ui.draggable[0]).attr('src')

                if(internalItem.includes('soap')){
                    soapLevel++;
                    currentSlime.addBubbles(soapLevel);

                }else if(soapLevel > 0){

                    const newStatus = {
                        xp_hygiene: ((currentPet.xp_hygiene + (soapLevel*15)) < 100) ? (currentPet.xp_hygiene + (soapLevel*15)) : 100
                    }
                    
                    gameController.updatePet(dadosGlobais.getCurrentPet().id, newStatus);

                    soapLevel = 0;

                    currentSlime.addBubbles(soapLevel);
                }

            }
        })
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
    console.log(currentSceneIndex)

    gameController.changeCurrentScene(currentSceneIndex)
    .then(()=>{
        if(currentEnvironment === 'mobile'){

        }else{
            computerEnvironment();
        }
        playAudio(allAudios[1]);
    }) ;

})

$('#previous-button').on('click', () => {
    const currentSceneIndex = dadosGlobais.getCurrentScene().id -2
    console.log(currentSceneIndex)

    gameController.changeCurrentScene(currentSceneIndex)
    .then(()=>{
        if(currentEnvironment === 'mobile'){

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