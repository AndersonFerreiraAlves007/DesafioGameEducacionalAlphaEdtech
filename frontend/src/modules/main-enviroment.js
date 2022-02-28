import {dadosGlobais} from './global-data.js';
import {gameController} from './control-game.js';
import { currentSlime } from '../main-script.js';

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
        }else{
            // false for not mobile device
            console.log("not mobile device: " + navigator.userAgent);
            computerEnvironment()
        }
    });
    

}

async function computerEnvironment(){

    // set current scene
    setCurrentScene();

    if(dadosGlobais.getCurrentScene().id === 1){
       
        console.log('tá na cozinha')

        const indexScene = 0;

        $('#item-box').draggable({ 
            containment: $('body'), // prevents page from scrolling when something is dragged to the edge of the screen
            revert: "valid"
        })

        $('#guti').droppable({
            drop: async function (event, ui) {
                

                $('#current-item').animate({width: 0, height: 0}, 100)
                setTimeout(() => ui.draggable.remove(), 50)
                
                const currentItem = dadosGlobais.getCurrentItem();
                currentSlime.feed(currentItem);

                $('<div id="item-box"><img id="current-item" src="" alt=""></div>').insertAfter('#previous-item');
                $('#item-box').draggable({ 
                    containment: $('body'), // prevents page from scrolling when something is dragged to the edge of the screen
                    revert: "valid"
                })

                setTimeout(() => {
                    $('#current-item').attr('src', dadosGlobais.getCurrentItem().url_image)
                }, 50);

            }

            
        })
    }
}

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
        setCurrentScene();
        playAudio(allAudios[1]);
    }) ;

})

$('#previous-button').on('click', () => {
    const currentSceneIndex = dadosGlobais.getCurrentScene().id -2
    console.log(currentSceneIndex)

    gameController.changeCurrentScene(currentSceneIndex)
    .then(()=>{
        setCurrentScene();
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