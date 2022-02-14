
// register the initial position for the slime eyes elements
const eyeStartValues = [];

getStartValues();

// eye initial position
function getStartValues(){

    const eyeLeft0 = document.getElementById('path3810-5-6-8');
    const eyeRight0 = document.getElementById('path3810-1-7-1-1');
    const eyeLeftGlow0 = document.getElementById('path3832-6-8-9');
    const eyeRightGlow0 = document.getElementById('path3832-7-1-9-8');

    const eyeElements = [eyeLeft0, eyeLeftGlow0, eyeRight0, eyeRightGlow0]

    eyeElements.map((element)=>{
        let initialValue = {}
        initialValue.x = element.getAttribute('cx');
        initialValue.y = element.getAttribute('cy');
        eyeStartValues.push(initialValue);
    })


}



// mouse position

//const screenLog = document.getElementById('screen-log');

// start tracking the mouse pointer (on smartphones it will get the last tap position)
document.addEventListener('mousemove', logPosition);

function logPosition(event){
    /*
    screenLog.innerText = `
        screen position: x=${event.screenX} y=${event.screenY}
        client position: x=${event.clientX} y=${event.clientY}
    `;
    */
    if(event.clientX !== undefined ){
        moveEye(event.clientX, event.clientY)
    }
    
}


// Eye movement control
function moveEye(mouseX, mouseY){

    // slime box
    const slimeDiv = document.getElementById('slime-root');

    const slimePosition = slimeDiv.getBoundingClientRect()
    
    let eyeXIncrement;
    let eyeYIncrement;

    if(slimePosition.x - mouseX > 0){
        const increment = 6 / slimePosition.x
        eyeXIncrement = (slimePosition.x - mouseX) * increment 
    }else{
        const widthInterval = document.body.clientWidth - slimePosition.x;
        const increment = 6 / widthInterval;
        eyeXIncrement = ((mouseX - slimePosition.x) * increment) * -1;
    }

    if ((slimePosition.y + 91) - mouseY > 0){
        const increment = 2 / (slimePosition.y + 91);
        eyeYIncrement = (((slimePosition.y + 91) - mouseY) * increment) * -1;
    }else{
        const heightInterval = (window.innerHeight - (slimePosition.y + 91));
        const increment = 2 / heightInterval;
        eyeYIncrement = ((mouseY) * increment) ;
    }


    // Eye components
    const eyeLeft = document.getElementById('path3810-5-6-8');
    const eyeRight = document.getElementById('path3810-1-7-1-1');
    const eyeLeftGlow = document.getElementById('path3832-6-8-9');
    const eyeRightGlow = document.getElementById('path3832-7-1-9-8');

    const bothEyes = [eyeLeft,eyeLeftGlow,eyeRight,eyeRightGlow];

    // Moving all eye components
    bothEyes.forEach((element, index)=>{
        const currentX = element.getAttribute('cx');
        const currentY = element.getAttribute('cy');
        //console.log(`x: ${currentX} , y: ${currentY}`)

        element.setAttribute('cx', `${Number(eyeStartValues[index].x) + eyeXIncrement}`)
        element.setAttribute('cy', `${Number(eyeStartValues[index].y) + eyeYIncrement}`)

        //console.log(`final values: x:${element.getAttribute('cx')} , y: ${element.getAttribute('cy')}`)
        
    })

}
