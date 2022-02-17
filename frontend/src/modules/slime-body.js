function updateBody(){
    
    const slimeBody = document.getElementById('path2999-17-9-8-5-3-4');

    const bodyNormalLoop = [
        'm -3.5024074,8.0540503 c 0,5.0178887 5.0412708,5.1918237 10.059159,5.1918237 5.0178884,0 10.0591584,-0.173935 10.0591584,-5.1918237 0,-5.0178882 -5.04127,-7.78773596 -10.0591584,-7.78773596 -5.0178882,0 -10.059159,2.76984776 -10.059159,7.78773596 z',
        'm -3.1800741,8.007151 c 0,5.017889 5.0412708,5.191824 10.059159,5.191824 5.0178881,0 9.4749041,-0.113125 9.4749041,-5.1310139 0,-5.0178882 -4.701846,-8.04309862 -9.7197343,-8.04309862 -5.0178882,0 -9.8143288,2.96440032 -9.8143288,7.98228852 z',
        'm -2.8225664,7.9805218 c 0,5.0178882 4.6837631,5.2184532 9.7016513,5.2184532 5.0178881,0 9.1565461,-0.113125 9.1565461,-5.1310139 0,-5.0178882 -4.474504,-8.497982 -9.4923928,-8.497982 -5.0178882,0 -9.3658046,3.3926545 -9.3658046,8.4105427 z'
    ]
    
    let counter = 0;
    let flag = true;

    const intervalId = setInterval(()=>{

        slimeBody.setAttribute('d', bodyNormalLoop[counter]);

        if(flag){
            counter++;
            if (counter === 2){
                flag = false;
            }
        }else{
            counter--;
            if(counter === 0){
                flag = true;
            }
        }

    },350)
}

//CHANGE DIRT STATUS (0 = clean, 1 = a bit dirty)
function setDirtLevel(){
    
    const statusRenderingArea = document.getElementById('status-changes');

    const dirtData = [
        `
        <g id="slime-dirt-spots">
        <path
            id="path8713-6"
            style="display:inline;fill:none;stroke:#535353;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
            d="M 0.471335,6.5589043 -0.85158187,7.2203626 Z M 1.000501,6.691196 -1.1161649,7.7495293 Z m 0.529167,0.2645833 -2.6458329,1.3229166 z m 0,0.5291667 -2.11666687,1.0583333 z M 1.265085,8.0141126 -0.0578319,8.6755709 Z"
            inkscape:label="slime-dirt-left-01" 
        />
        
        <path
            id="path8713-7-0"
            style="display:inline;fill:none;stroke:#535353;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
            d="m 12.906752,6.6911957 1.322916,0.661458 z m -0.529167,0.132292 2.116667,1.058333 z m -0.529167,0.264583 2.645834,1.322917 z m 0,0.529167 2.116667,1.058333 z m 0.264584,0.529166 1.322916,0.661459 z"
            inkscape:label="slime-dirt-right-01" 
        />
        </g>
        `,
        `
        <g id="slime-stink-1">
        <path
            style="fill:none;stroke:#3e3e3e;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
            d="m 1.529668,-9.7129701 c -1.3229166,3.9687495 0,5.2916662 0,5.2916662 0,0 1.3229167,1.3229166 0,3.9687499"
            id="path2699"
            inkscape:label="slime-stink-01" 
        />

        <path
            style="fill:none;stroke:#3e3e3e;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
            d="m 6.8213347,-12.358804 c -1.322917,3.96875 0,5.291666 0,5.291666 0,0 1.322916,1.322917 0,3.96875"
            id="path2699-7"
            inkscape:label="slime-stink-02" 
        />

        <path
            style="fill:none;stroke:#3e3e3e;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
            d="m 12.113001,-9.71297 c -1.322917,3.96875 0,5.291666 0,5.291666 0,0 1.322916,1.322917 0,3.96875"
            id="path2699-7-5"
            inkscape:label="slime-stink-03" 
        />
        </g>
        `,
        `
        <g id="slime-stink-2">
        <path
            style="fill:none;stroke:#3e3e3e;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
            d="m 12.112497,-9.7129701 c 1.322917,3.9687495 0,5.2916662 0,5.2916662 0,0 -1.322916,1.3229166 0,3.9687499"
            id="path2699"
            inkscape:label="slime-stink-01" 
        />

        <path
            style="fill:none;stroke:#3e3e3e;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
            d="m 6.8208308,-12.358804 c 1.322917,3.96875 0,5.291666 0,5.291666 0,0 -1.322916,1.322917 0,3.96875"
            id="path2699-7"
            inkscape:label="slime-stink-02" 
        />

        <path
            style="fill:none;stroke:#3e3e3e;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
            d="m 1.5291645,-9.71297 c 1.322917,3.96875 0,5.291666 0,5.291666 0,0 -1.322916,1.322917 0,3.96875"
            id="path2699-7-5"
            inkscape:label="slime-stink-03" 
        />
        </g>
        `

    ]

    let intervalId;
    let flag = true;

    return ((dirtValue)=>{
        
        let dirtLevel;

        if(dirtValue >= 80){
            dirtLevel = 0;
        }else if(dirtValue >= 60){
            dirtLevel = 1;
        } else {
            dirtLevel = 2;
        }

        if(dirtLevel === 0){
            clearInterval(intervalId);

            statusRenderingArea.innerHTML = "";

        } else if(dirtLevel === 1){

            clearInterval(intervalId);

            if(document.contains(document.getElementById(`slime-stink-1`))){
                document.getElementById(`slime-stink-1`).remove()
            }else if(document.contains(document.getElementById(`slime-stink-2`))){
                document.getElementById(`slime-stink-2`).remove()
            }

            statusRenderingArea.insertAdjacentHTML('afterbegin', dirtData[0]);

        } else {

            clearInterval(intervalId);

            if(document.contains(document.getElementById(`slime-stink-1`))){
                document.getElementById(`slime-stink-1`).remove()
            }else if(document.contains(document.getElementById(`slime-stink-2`))){
                document.getElementById(`slime-stink-2`).remove()
            }

            if(!document.contains(document.getElementById(`slime-dirt-spots`))){
                statusRenderingArea.insertAdjacentHTML('afterbegin', dirtData[0]);
            };

            statusRenderingArea.insertAdjacentHTML('afterbegin', dirtData[1])
    
            intervalId = setInterval(()=>{
                
                if(document.contains(document.getElementById(`slime-stink-1`))){
                    document.getElementById(`slime-stink-1`).remove()
                }else if(document.contains(document.getElementById(`slime-stink-2`))){
                    document.getElementById(`slime-stink-2`).remove()
                }
    
                let index = 1;
                
                if(flag){index = 2};
                
                statusRenderingArea.insertAdjacentHTML('afterbegin', dirtData[index]);
                
                flag = !flag;
            },1000)
            
        }
    })

}

export {updateBody, setDirtLevel};