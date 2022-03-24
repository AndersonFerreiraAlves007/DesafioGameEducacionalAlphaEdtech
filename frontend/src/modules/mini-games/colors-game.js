import { serverConnection } from '../server-communication.js';
import { dadosGlobais } from '../global-data.js'
import { statusBar } from '../update-status-bar.js'


function colorGameStart() {
  $('#button-close-game').on('click', () => {
    clearInterval(ticket)
    $('.colors-game').hide()
  })

  async function updateScore() {
    const currentPet = dadosGlobais.getCurrentPet()

    const currentItem = dadosGlobais.getCurrentItem()

    const xp_fun_change = score * 3;
    const xp_hygiene_change = currentItem.xp_hygiene_change;
    const xp_food_change = currentItem.xp_food_change;

    const objectPet = {
      xp_food: ((currentPet.xp_food + xp_food_change) > 0) ? (currentPet.xp_food + xp_food_change) : 0,
      xp_hygiene: ((currentPet.xp_hygiene + xp_hygiene_change) > 0) ? (currentPet.xp_hygiene + xp_hygiene_change) : 0,
      xp_fun: ((currentPet.xp_fun + xp_fun_change) < 100) ? (currentPet.xp_fun + xp_fun_change) : 100
    }
    dadosGlobais.setCurrentPet(await serverConnection.updatePet(currentPet.id, objectPet));

    await statusBar.updateInfoPet()
  }

  // show game on screen
  $('.colors-game').show()

  function makeSlime(id, nome, color, onClick) {
    const slime = document.createElement('div')
    slime.setAttribute('id', `${id}`)
    slime.classList.add('slime')

    slime.innerHTML = `
    <svg
      width="128"
      height="64"
      viewBox="0 0 15.866666 15.866668"
      version="1.1"
      id="${id}-svg"
      inkscape:version="1.1.2 (0a00cf5339, 2022-02-04)"
      sodipodi:docname="slime-02.svg"
      xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
      xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg">
      <sodipodi:namedview
        id="namedview909"
        pagecolor="#505050"
        bordercolor="#eeeeee"
        borderopacity="1"
        inkscape:pageshadow="0"
        inkscape:pageopacity="0"
        inkscape:pagecheckerboard="0"
        inkscape:document-units="mm"
        showgrid="true"
        units="px"
        inkscape:zoom="5.2007771"
        inkscape:cx="83.160649"
        inkscape:cy="57.395269"
        inkscape:window-width="1920"
        inkscape:window-height="1016"
        inkscape:window-x="0"
        inkscape:window-y="0"
        inkscape:window-maximized="1"
        inkscape:current-layer="g1777">
        <inkscape:grid
          type="xygrid"
          id="grid951" />
      </sodipodi:namedview>
      <defs
        id="defs904" />
      <g
        inkscape:label="slime"
        inkscape:groupmode="layer"
        id="layer1">
        <g
          id="g1777"
          inkscape:label="slime-complete"
          transform="translate(3, 2)">
          <path
            style="display:inline;fill:${color};fill-opacity:1;stroke:#004c64;stroke-width:0.648978;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
            d="m -3.1800741,8.007151 c 0,5.017889 5.0412708,5.191824 10.059159,5.191824 5.0178881,0 9.4749041,-0.113125 9.4749041,-5.1310139 0,-5.0178882 -4.701846,-8.04309862 -9.7197343,-8.04309862 -5.0178882,0 -9.8143288,2.96440032 -9.8143288,7.98228852 z"
            id="path2999-17-9-8-5-3-4-${id}"
            inkscape:connector-curvature="0"
            sodipodi:nodetypes="sssss"
            inkscape:label="slime-body" />
          <path
            style="display:inline;fill:#ffffff;fill-opacity:0.392157;stroke:none;stroke-width:0.324489"
            d="m 6.5567516,3.1867152 c 3.2257867,0 7.1387574,0.973467 7.1387574,0.973467 C 12.722042,2.3754928 9.7825383,1.5642703 6.5567516,1.5642703 c -3.2257873,0 -6.16529099,0.8112225 -7.138758,2.5959119 0,0 3.9129707,-0.973467 7.138758,-0.973467 z"
            id="path3802-4-4-2-5-3-9"
            inkscape:connector-curvature="0"
            sodipodi:nodetypes="scscs"
            inkscape:label="slime-top-highlight" />
          <path
            style="display:inline;fill:#000000;fill-opacity:0.27451;stroke:none;stroke-width:0.324489"
            d="m -1.2309843,10.000984 c 0,1.075262 4.203531,1.946934 7.7877359,1.946934 3.5842074,0 7.7877354,-0.871672 7.7877354,-1.946934 0,-1.0752615 -4.203528,-1.9469337 -7.7877354,-1.9469337 -3.5842049,0 -7.7877359,0.8716722 -7.7877359,1.9469337 z"
            id="path3807-0-8-4-1-5-6"
            inkscape:connector-curvature="0"
            sodipodi:nodetypes="sssss"
            inkscape:label="slime-bottom-shadow" />
          <circle
            style="display:inline;fill:#191919;fill-opacity:1;stroke:none;stroke-width:0.324489"
            id="path3810-5-6-8"
            transform="scale(-1,1)"
            cx="-3.9608397"
            cy="5.1336493"
            r="1.297956"
            inkscape:label="slime-left-eye" />
          <circle
            transform="scale(-1,1)"
            style="display:inline;fill:#191919;fill-opacity:1;stroke:none;stroke-width:0.324489"
            id="path3810-1-7-1-1"
            cx="-8.503684"
            cy="5.1336493"
            r="1.297956"
            inkscape:label="slime-right-eye" />
          <circle
            style="display:inline;fill:#e6e6e6;fill-opacity:1;stroke:none;stroke-width:0.324489"
            id="path3832-6-8-9"
            transform="scale(-1,1)"
            cx="-3.6363509"
            cy="4.8091598"
            r="0.64897799"
            inkscape:label="slime-left-eye-glow" />
          <circle
            style="display:inline;fill:#e6e6e6;fill-opacity:1;stroke:none;stroke-width:0.324489"
            id="path3832-7-1-9-8"
            transform="scale(-1,1)"
            cx="-8.1791954"
            cy="4.8091598"
            r="0.64897799"
            inkscape:label="sliem-right0eye-glow" />
        </g>
      </g>
    </svg>
  `
    slime.innerHTML += `
    <span>${nome}</span>
  `
    return slime
  }

  const allSlimes = ['option1', 'option2', 'option3']

  // Create slimes and add them to the container
  allSlimes.forEach(option => {
    const slimy = makeSlime(option, '', '', () => { })
    $('#container').append(slimy)
  })

  // no slime will appear when the game launch
  $('.slime').hide()
  let itsMobileDevice = false

  // Check whether its a mobile device or PC 
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    itsMobileDevice = true
  } else {
    // false for not mobile device
    console.log("not mobile device: " + navigator.userAgent);
    $('#option1').draggable()
    $('#option2').draggable()
    $('#option3').draggable()

    $('#droppable').droppable({
      drop: function (event, ui) {
        if (ui.draggable.hasClass(currentColor)) {
          const winSound = new Audio('../../assets/audios/game-audios/476713__ddmyzik__happy-harp-sound.wav')
          winSound.volume = dadosGlobais.getVolumeAudio();
          winSound.play()
          score += 1
        } else {
          const failSound = new Audio('../../assets/audios/game-audios/327738__distillerystudio__error-01.wav')
          failSound.volume = dadosGlobais.getVolumeAudio();
          failSound.play()
        }
        $('#option1, #option2, #option3').removeClass(allColors)
        $('.slime').hide()
        $('#score').html(`SCORE: ${score}`)
        startRound()
      }
    })
  }

  const allColors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple']
  let currentColor
  let score = 0
  $('#final-score').html(score)
  let roundHasEnded = false
  let ticket

  // Initialize timer
  function initializeTimer() {
    let seconds = 0
    ticket = setInterval(function () {
      seconds += 1;
      $('#timer').html(`TEMPO: ${seconds}`);
      if (seconds == 25) {
        roundHasEnded = true
        clearInterval(ticket)
        updateScore()
        seconds = 0
        $('#option1, #option2, #option3').removeClass(allColors)
        $('.slime').hide()
        $('#endScreen').show()
        $('#endScreen').css({'display': 'flex', 'align-items': 'center', 'justify-content': 'center'})
        $('#final-score').html(score)
      }
    }, 1000);
  }

  function startRound() {
    $('#endScreen').hide()
    if (roundHasEnded) {
      roundHasEnded = false
      initializeTimer()
    }
    
    // Reset slimes colors
    $('#option1, #option2, #option3').removeClass(allColors)

    // Get random colors and positions and attributes them to the slimes
    let currentRound = []
    allSlimes.forEach(option => {
      let repeatColor = true
      while (repeatColor) {
        currentColor = allColors[Math.floor(Math.random() * allColors.length)]
        if (currentRound.includes(currentColor)) {
          continue
        } else {
          repeatColor = false

          const maxDimensions = {
            x: document.getElementById('container').getBoundingClientRect().width - 128,
            y: document.getElementById('container').getBoundingClientRect().height - 64
          };

          const randomWidth = (Math.floor(Math.random() * maxDimensions.x))
          const randomHeight = (Math.floor(Math.random() * maxDimensions.y))
          currentRound.push(currentColor)
          $(`#${option}`).show('fast')
          $(`#${option}`).css('top', randomHeight)
          $(`#${option}`).css('left', randomWidth)
          $(`#${option}`).addClass(currentColor)
          // $(`path2999-17-9-8-5-3-4-${option}`).addClass(currentColor)
        }
      }
    });
    $('#color__colors-game').html(currentColor.toUpperCase())

    // Use touch controls
    if (itsMobileDevice) {
      mobileEnvironment('option1', 'droppable')
      mobileEnvironment('option2', 'droppable')
      mobileEnvironment('option3', 'droppable')
    }

    async function mobileEnvironment(option, droppable) {

      const itemElement = document.getElementById(option);

      //get item start position in the main page flow
      const itemStartPosition = itemElement.getBoundingClientRect();
      //console.log(itemStartPosition);
      const itemDimensions = { width: itemElement.getBoundingClientRect().width, height: itemElement.getBoundingClientRect().height }

      //get slime coordinates
      const droppableCoordinates = document.getElementById(droppable).getBoundingClientRect();
      //console.log(droppableCoordinates)
      const slimeXPosition = [droppableCoordinates.x, droppableCoordinates.x + droppableCoordinates.width]
      const slimeYPosition = [droppableCoordinates.y, droppableCoordinates.y + droppableCoordinates.height]


      //Slimeroom logic

      itemElement.onclick = '';
      itemElement.ontouchmove = ''
      itemElement.ontouchend = ''

      //change the display of the item to absolute
      itemElement.style.position = 'absolute';
      itemElement.style.left = (itemStartPosition.x) + 'px';
      itemElement.style.top = itemStartPosition.y + 'px';
      itemElement.style.zIndex = 3000;


      itemElement.ontouchmove = dragSlimeHandler
      itemElement.ontouchend = releaseSlimeHandler


      function dragSlimeHandler(event) {

        // prevent scrolling while dragging item
        event.preventDefault();


        console.log(event)

        const currentPosition = { x: parseInt(itemElement.style.left), y: parseInt(itemElement.style.top) };

        let maxRange = {
          x: window.screen.availWidth,
          y: window.screen.availHeight
        }

        let touchPosition = event.targetTouches[0];

        if (touchPosition.pageX <= (maxRange.x - itemDimensions.width / 3)) {
          itemElement.style.left = touchPosition.pageX - itemDimensions.width / 2 - 64 + 'px';
        }

        console.log(touchPosition)

        if (touchPosition.pageY <= (maxRange.y - itemDimensions.height / 2)) {
          itemElement.style.top = touchPosition.pageY - itemDimensions.height / 2 -100+ 'px';
        }
      }

      function releaseSlimeHandler(event) {

        console.log(event)

        const currentPosition = { x: parseInt(itemElement.style.left) + itemDimensions.width / 2 + 64, y: parseInt(itemElement.style.top) + itemDimensions.height / 2 + 100};

        if (currentPosition.x >= slimeXPosition[0] && currentPosition.x <= slimeXPosition[1]
          && currentPosition.y >= slimeYPosition[0] && currentPosition.y <= slimeYPosition[1]) {
          console.log('chuveirinho chua!!!')

          // Check whether the color chosen is correct
          if (itemElement.classList.contains(currentColor)) {
            const winSound = new Audio('../../assets/audios/game-audios/476713__ddmyzik__happy-harp-sound.wav')
            winSound.play()
            score += 1
          } else {
            const failSound = new Audio('../../assets/audios/game-audios/327738__distillerystudio__error-01.wav')
            failSound.play()
          }
          $('#option1, #option2, #option3').removeClass(allColors)
          $('.slime').hide()
          $('#score').html(`SCORE: ${score}`)
          startRound()
        }
      }
    }
  }

  initializeTimer()
  startRound()

  $('#start').on('click', startRound)
}

export { colorGameStart };