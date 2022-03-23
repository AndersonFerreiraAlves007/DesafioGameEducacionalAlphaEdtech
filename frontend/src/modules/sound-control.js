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

function setVolume(myVolume) {
  dadosGlobais.setVolumeAudio(myVolume)
}
