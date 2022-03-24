import {dadosGlobais} from './global-data.js';

$("#volume").slider({
  min: 0,
  max: 100,
  value: 100,
  range: "min",
  slide: function(event, ui) {
    setVolume(ui.value / 100);
  }
});

$('#mute-button').on('click', ()=>{
  setVolume(0);
  $("#volume").slider({value:0})
})

$('#max-volume-button').on('click', ()=>{
  setVolume(1);
  $("#volume").slider({value:100})
})

function setVolume(myVolume) {
  dadosGlobais.setVolumeAudio(myVolume)
}
