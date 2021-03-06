import { serverConnection } from '../modules/server-communication.js';
import { dadosGlobais } from '../modules/global-data.js'
import { statusBar } from '../modules/update-status-bar.js'
import { currentSlime } from '../main-script.js';
import {Slime} from './slime.js';

function makeSlime(id, nome, color, onClick) {
  const slime = document.createElement('div')
  slime.addEventListener('click', onClick)
  slime.classList.add('slime-item')

  slime.innerHTML = `
    <svg
      width="64"
      height="32"
      viewBox="0 0 15.866666 15.866668"
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

const dialogSelectPet = document.getElementById('content-dialog-select-pet')
const dialogSelectPetMesmo = document.getElementById('dialog-select-pet')
async function renderPetsUser() {
  const { pets } = await serverConnection.getUserWithPets(dadosGlobais.getCurrentUser().id)

  dialogSelectPet.innerHTML = ''
  
  pets.forEach(item => {
    dialogSelectPet.append(makeSlime(item.id, item.name, item.color, async () => {
      const pet = await serverConnection.getPet(item.id)
      dadosGlobais.setCurrentPet(pet)
      currentSlime.updateSlime();
      await statusBar.updateInfoPet()
      dialogSelectPetMesmo.style.display = 'none'
      $('#path2999-17-9-8-5-3-4').css('fill', pet.color)
    }))
  })

  dialogSelectPetMesmo.style.display = 'flex'
}

const buttonSelectPet = document.getElementById('btn-select-pet')

buttonSelectPet.addEventListener('click', async () => {
  await renderPetsUser()
})

const buttonCancelDialogSelectPet = document.getElementById('btn-cancel-dialog-select-pet')

buttonCancelDialogSelectPet.addEventListener('click', () => {
  dialogSelectPetMesmo.style.display = 'none'
})
