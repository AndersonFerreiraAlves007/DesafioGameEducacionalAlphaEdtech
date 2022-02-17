
function eyeMover(leftEyeId, leftEyeGlowId, rightEyeId, rightEyeGlowId){

    //get the eye elements start positions for the scope

    const eyeStartValues = [];

    getStartValues();

    function getStartValues(){

        const eyeLeft0 = document.getElementById(leftEyeId);
        const eyeRight0 = document.getElementById(rightEyeId);
        const eyeLeftGlow0 = document.getElementById(leftEyeGlowId);
        const eyeRightGlow0 = document.getElementById(rightEyeGlowId);

        const eyeElements = [eyeLeft0, eyeLeftGlow0, eyeRight0, eyeRightGlow0]

        eyeElements.map((element)=>{
            let initialValue = {}
            initialValue.x = element.getAttribute('cx');
            initialValue.y = element.getAttribute('cy');
            eyeStartValues.push(initialValue);
        })

    }

    //start tracking the mouse pointer

    document.addEventListener('mousemove', trackCursor);

    function trackCursor(event){

        if(event.clientX !== undefined ){
            moveEye(event.clientX, event.clientY)
        }
        
    }

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
    
        if ((eyeStartValues[0].y) - mouseY > 0){
            const increment = 3 / (eyeStartValues[0].y);
            eyeYIncrement = (((eyeStartValues[0].y) - mouseY) * increment) * -1;
        }else{
            const heightInterval = (window.innerHeight - (eyeStartValues[0].y));
            const increment = 3 / heightInterval;
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

}

export {eyeMover};