function addBubbles(value){
    
    const initialX = [-2.6909859, -0.66068101, -3.9042299, -1.3939534];
    const initialY = [4.1386967, 4.6391869, 5.6192284, 6.1187315];
    
    let newX = [];
    let newY = [];

    if(value === 0){
        $('.bath-bubbles').remove();
        return ('ok');
    }else if(value > 7){
        return ('ok');
    }else{
        initialX.map(element=>{
            newX.push(element + (value * 2));
        })
        initialY.map(element=>{
            if (value % 2){
                newY.push(element + 5);
            }else{
                newY.push(element - 5);
            }
        })
    }


    const bathBubbles = (`
    <g
    id="g6343"
    inkscape:label="bubble-group"
    class="bath-bubbles">
        <circle
            style="fill:#bef2f2;fill-opacity:0.809747;stroke:#7fdddf;stroke-width:0.132292;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
            id="path1844"
            cx="${newX[0]}"
            cy="${newY[0]}"
            r="1.3229166"
            inkscape:label="bath-buble" 
            />
        <circle
            style="fill:#bef2f2;fill-opacity:0.809747;stroke:#7fdddf;stroke-width:0.132292;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
            id="path1844-3"
            cx="${newX[1]}"
            cy="${newY[1]}"
            r="1.3229166"
            inkscape:label="bath-buble" 
            />
        <circle
            style="fill:#bef2f2;fill-opacity:0.809747;stroke:#7fdddf;stroke-width:0.132292;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
            id="path1844-3-6"
            cx="${newX[2]}"
            cy="${newY[2]}"
            r="1.3229166"
            inkscape:label="bath-buble" 
            />
        <circle
            style="fill:#bef2f2;fill-opacity:0.809747;stroke:#7fdddf;stroke-width:0.132292;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
            id="path1844-3-6-7"
            cx="${newX[3]}"
            cy="${newY[3]}"
            r="1.3229166"
            inkscape:label="bath-buble"
            />
    </g>
    `);

    document.getElementById('status-changes').insertAdjacentHTML('afterbegin', bathBubbles);
    return('ok');
}

export {addBubbles};