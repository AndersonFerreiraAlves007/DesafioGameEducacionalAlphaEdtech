import { serverConnection } from '../server-communication.js';
import { dadosGlobais } from '../global-data.js'
import { statusBar } from '../update-status-bar.js'

function makeSlime(id, nome, color, onClick) {
  const slime = document.createElement('div')
  slime.addEventListener('click', onClick)
  slime.classList.add('slime-item2')

  slime.innerHTML = `
    <svg
      width="128"
      height="64"
      viewBox="0 0 15 15"
      version="1.1"
      id="${id}"
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
          transform="translate(2, 2)">
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
  return slime
}

const cardsInit = [
  {
    color: 'red',
    flip: false
  },
  {
    color: 'red',
    flip: false
  },
  {
    color: 'blue',
    flip: false
  },
  {
    color: 'blue',
    flip: false
  },
  {
    color: 'green',
    flip: false
  },
  {
    color: 'green',
    flip: false
  },
  {
    color: 'white',
    flip: false
  },
  {
    color: 'white',
    flip: false
  },
  {
    color: 'black',
    flip: false
  },
  {
    color: 'black',
    flip: false
  },
  {
    color: 'orange',
    flip: false
  },
  {
    color: 'orange',
    flip: false
  },
  {
    color: 'pink',
    flip: false
  },
  {
    color: 'pink',
    flip: false
  },
  {
    color: 'yellow',
    flip: false
  },
  {
    color: 'yellow',
    flip: false
  },
]

let cont = 0;
let indexAnterior = -1;

let idTimeout;

const cards = cardsInit.slice()

function embaralha(lista) {
  for (let indice = lista.length; indice; indice--) {
      const indiceAleatorio = Math.floor(Math.random() * indice);
      // atribuição via destructuring
      [lista[indice - 1], lista[indiceAleatorio]] = 
          [lista[indiceAleatorio], lista[indice - 1]];
  }
}

embaralha(cards)

//console.log(cards)

function makeTimeout() {
  clearTimeout(idTimeout)
  idTimeout = setTimeout(() => virarCards(), 1000)
}

async function aumentaStatus() {
  const currentPet = dadosGlobais.getCurrentPet()
  const xp_fun_change = 5;
  const xp_hygiene_change = -5;
  const xp_food_change = -5;

  const objectPet = {
      xp_food: ((currentPet.xp_food + xp_food_change) > 0) ? (currentPet.xp_food + xp_food_change) : 0,
      xp_hygiene: ((currentPet.xp_hygiene + xp_hygiene_change) > 0) ? (currentPet.xp_hygiene + xp_hygiene_change) : 0,
      xp_fun: ((currentPet.xp_fun + xp_fun_change) < 100) ? (currentPet.xp_fun + xp_fun_change) : 100
  }
  dadosGlobais.setCurrentPet(await serverConnection.updatePet(currentPet.id, objectPet));
  await statusBar.updateInfoPet()
}

function makeCardItem(index, cardItem) {
  /* const card = document.createElement('div')
  card.classList.add('card')
  card.append(makeSlime(`card-${index}`, 'lala', 'red', () => {})) */

  const card = document.createElement('div')
  
  card.classList.add('flip-container')

  const flipper = document.createElement('div')
  flipper.classList.add('flipper')
  flipper.id = `card-flipper-${index}`

  card.addEventListener('click', () => {
    if(index !== indexAnterior) {
      if(cont % 2 === 0) {
        indexAnterior = index
      }
/* 
      if(cont % 2 === 0 && cont !== 0) {
        
      } */

      virarCards()

      if(cont % 2 !== 0) {
        if(cards[index].color === cards[indexAnterior].color) {
          cards[index].flip = true
          cards[indexAnterior].flip = true
          aumentaStatus()
        } else {
          makeTimeout()
        }
        indexAnterior = -1
      }
      flipper.style.transform = 'rotateY(180deg)'
      //if(index !== indexAnterior) {
        cont+=1
      //}

      const flips = contFlips()
      if(flips === 16) {
        resetarBaralhos()
        alert('Parabéns você conseguiu terminar o jogo!!!')
      }
    }
  })

  const front = document.createElement('div')
  front.classList.add('front') 

  const imgFront = makeSlime(`card-slime-${index}`, 'lala', cardItem.color, () => {})

  const back = document.createElement('div')
  back.classList.add('back')

  const imgBack = document.createElement('div')
  back.classList.add('back')
  imgBack.style.backgroundColor = 'black'

  back.append(imgFront)

  front.append(imgBack)

  flipper.append(front)
  flipper.append(back)

  card.append(flipper)

  return card
}

function contFlips () {
  let contFlipeds = 0
  cards.forEach(item => {
    if(item.flip) contFlipeds++
  })
  return contFlipeds
}

const contentMinigameRemember = document.getElementById('content-minigame-remember')

function resetarBaralhos() {
  embaralha(cards)

  cards.forEach((item, index) => {
    const flipper =  document.getElementById(`card-flipper-${index}`)
    flipper.style.transform = 'rotateY(0deg)'
    cards[index].flip = false
  })

  console.log(cards)

  cont = 0;
  indexAnterior = -1;
}

function makeCards() {
  for(let i = 0; i < 16; i++) {
    contentMinigameRemember.append(makeCardItem(i, cards[i]))
  }
}

makeCards()

function virarCards() {
  cards.forEach((item, index) => {
    const flipper =  document.getElementById(`card-flipper-${index}`)
    if(item.flip || index === indexAnterior) {
      flipper.style.transform = 'rotateY(180deg)'
    } else {
      flipper.style.transform = 'rotateY(0deg)'
    }
  })
}


document.getElementById('btn-jogo-da-memoria').addEventListener('click', () => {
  //resetarBaralhos()
  document.getElementById('minigame-remember').style.display = 'flex'
})

document.getElementById('btn-close-game-memoria').addEventListener('click', () => {
  document.getElementById('minigame-remember').style.display = 'none'
})


