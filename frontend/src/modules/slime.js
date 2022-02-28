import {dadosGlobais} from './global-data.js';
import {gameController} from './control-game.js';

class Slime {

    #name;
    #userId;
    #id;
    #xpFood;
    #xpFun;
    #xpHygiene;
    #color;
    #sound;

    #pulseBodyIntervalId;

    #stinkAnimationIntervalId;
    #stinkyFlag = true;

    constructor(petName, ownerId, petId, xpFood, xpFun, xpHygiene, petColor){
        this.#name = petName;
        this.#userId = ownerId;
        this.#id = petId;
        this.#xpFood = xpFood;
        this.#xpFun = xpFun;
        this.#xpHygiene = xpHygiene;
        this.#color = petColor;

        document.getElementById('slime-root').insertAdjacentHTML('afterbegin',`
            <svg width="256" height="256" viewBox="0 0 33.866666 33.866668" version="1.1" id="svg907"
            inkscape:version="1.1.2 (0a00cf5339, 2022-02-04)" sodipodi:docname="slime.svg"
            xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
            xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
            xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"
            >

                <g id="slime-layer">
                    <g id="slime-complete" transform="translate(10.376582,20.296304)">

                        <path
                            style="display:inline;fill:${this.#color};fill-opacity:1;stroke:#004c64;stroke-width:0.648978;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
                            d="m -3.5024074,8.0540503 c 0,5.0178887 5.0412708,5.1918237 10.059159,5.1918237 5.0178884,0 10.0591584,-0.173935 10.0591584,-5.1918237 0,-5.0178882 -5.04127,-7.78773596 -10.0591584,-7.78773596 -5.0178882,0 -10.059159,2.76984776 -10.059159,7.78773596 z"
                            id="slime-body"
                        />

                        <path
                            style="display:inline;fill:#ffffff;fill-opacity:0.392157;stroke:none;stroke-width:0.324489"
                            d="m 6.5567516,3.1867152 c 3.2257867,0 7.1387574,0.973467 7.1387574,0.973467 C 12.722042,2.3754928 9.7825383,1.5642703 6.5567516,1.5642703 c -3.2257873,0 -6.16529099,0.8112225 -7.138758,2.5959119 0,0 3.9129707,-0.973467 7.138758,-0.973467 z"
                            id="path3802-4-4-2-5-3-9" inkscape:connector-curvature="0" sodipodi:nodetypes="scscs"
                            inkscape:label="slime-top-highlight" 
                        />

                        <path
                            style="display:inline;fill:#000000;fill-opacity:0.27451;stroke:none;stroke-width:0.324489"
                            d="m -1.2309843,10.000984 c 0,1.075262 4.203531,1.946934 7.7877359,1.946934 3.5842074,0 7.7877354,-0.871672 7.7877354,-1.946934 0,-1.0752615 -4.203528,-1.9469337 -7.7877354,-1.9469337 -3.5842049,0 -7.7877359,0.8716722 -7.7877359,1.9469337 z"
                            id="path3807-0-8-4-1-5-6" inkscape:connector-curvature="0" sodipodi:nodetypes="sssss"
                            inkscape:label="slime-bottom-shadow" 
                        />

                        <g id="status-changes">

                        </g>

                        <circle style="display:inline;fill:#191919;fill-opacity:1;stroke:none;stroke-width:0.324489"
                            id="slime-left-eye" transform="scale(-1,1)" cx="-3.9608397" cy="5.1336493" r="1.297956" 
                        />

                        <circle transform="scale(-1,1)"
                            style="display:inline;fill:#191919;fill-opacity:1;stroke:none;stroke-width:0.324489"
                            id="slime-right-eye" cx="-8.503684" cy="5.1336493" r="1.297956"
                        />

                        <circle
                            style="display:inline;fill:#e6e6e6;fill-opacity:1;stroke:none;stroke-width:0.324489"
                            id="slime-left-eye-glow" transform="scale(-1,1)" cx="-3.6363509" cy="4.8091598"
                            r="0.64897799"
                        />

                        <circle
                            style="display:inline;fill:#e6e6e6;fill-opacity:1;stroke:none;stroke-width:0.324489"
                            id="slime-right-eye-glow" transform="scale(-1,1)" cx="-8.1791954" cy="4.8091598"
                            r="0.64897799" 
                        />



                    </g>
                </g>



            </svg>
        `);

        this.pulseBody();

        this.renderDirtLevel(this.#xpHygiene);

        this.foodComplain(this.#xpFood);

        this.eyeMover();
    }

    get petFullData(){
        return ({
            'name': this.#name,
            'id': this.#id,
            'userId': this.#userId,
            'color': this.#color,
            'xpFood': this.#xpFood,
            'xpFun': this.#xpFun,
            'xpHygiene': this.#xpHygiene
        })
    }

    set xpFood (value){
        const newXpFood = this.#xpFood + value
        
        if(newXpFood > 100){
            this.#xpFood = 100;
        }else if(newXpFood < 0){
            this.#xpFood = 0;
        }else{
            this.#xpFood = newXpFood;
        }

    }

    set xpFun (value){
        const newXpFun = this.#xpFun + value
        
        if(newXpFun > 100){
            this.#xpFun = 100;
        }else if(newXpFun < 0){
            this.#xpFun = 0;
        }else{
            this.#xpFun = newXpFun;
        }

    }


    set xpHygiene (value){
        const newXpHygiene = this.#xpHygiene + value
        
        if(newXpHygiene > 100){
            this.#xpHygiene = 100;
        }else if(newXpHygiene < 0){
            this.#xpHygiene = 0;
        }else{
            this.#xpHygiene = newXpHygiene;
        }

    }

    set color (colorValue){
        this.#color = colorValue;
        document.getElementById('slime-body').style.fill = this.#color
    }

    pulseBody(){
    
        const slimeBody = document.getElementById('slime-body');
    
        const bodyNormalLoop = [
            'm -3.5024074,8.0540503 c 0,5.0178887 5.0412708,5.1918237 10.059159,5.1918237 5.0178884,0 10.0591584,-0.173935 10.0591584,-5.1918237 0,-5.0178882 -5.04127,-7.78773596 -10.0591584,-7.78773596 -5.0178882,0 -10.059159,2.76984776 -10.059159,7.78773596 z',
            'm -3.1800741,8.007151 c 0,5.017889 5.0412708,5.191824 10.059159,5.191824 5.0178881,0 9.4749041,-0.113125 9.4749041,-5.1310139 0,-5.0178882 -4.701846,-8.04309862 -9.7197343,-8.04309862 -5.0178882,0 -9.8143288,2.96440032 -9.8143288,7.98228852 z',
            'm -2.8225664,7.9805218 c 0,5.0178882 4.6837631,5.2184532 9.7016513,5.2184532 5.0178881,0 9.1565461,-0.113125 9.1565461,-5.1310139 0,-5.0178882 -4.474504,-8.497982 -9.4923928,-8.497982 -5.0178882,0 -9.3658046,3.3926545 -9.3658046,8.4105427 z'
        ]
        
        let counter = 0;
        let flag = true;
    
        this.#pulseBodyIntervalId = setInterval(()=>{
    
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


    renderDirtLevel(dirtValue){

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
        
        let dirtLevel;

        if(dirtValue >= 80){
            dirtLevel = 0;
        }else if(dirtValue >= 60){
            dirtLevel = 1;
        } else {
            dirtLevel = 2;
        }

        if(dirtLevel === 0){
            clearInterval(this.#stinkAnimationIntervalId);

            //statusRenderingArea.innerHTML = "";
            
            if(document.contains(document.getElementById(`slime-dirt-spots`))){
                document.getElementById('slime-dirt-spots').remove();
            }
            
            if(document.contains(document.getElementById(`slime-stink-1`))){
                document.getElementById(`slime-stink-1`).remove()
            }else if(document.contains(document.getElementById(`slime-stink-2`))){
                document.getElementById(`slime-stink-2`).remove()
            }

        } else if(dirtLevel === 1){

            clearInterval(this.#stinkAnimationIntervalId);

            if(document.contains(document.getElementById(`slime-stink-1`))){
                document.getElementById(`slime-stink-1`).remove()
            }else if(document.contains(document.getElementById(`slime-stink-2`))){
                document.getElementById(`slime-stink-2`).remove()
            }

            if(document.contains(document.getElementById(`slime-dirt-spots`))){
                document.getElementById('slime-dirt-spots').remove();
            }

            statusRenderingArea.insertAdjacentHTML('afterbegin', dirtData[0]);

        } else {

            clearInterval(this.#stinkAnimationIntervalId);

            if(document.contains(document.getElementById(`slime-stink-1`))){
                document.getElementById(`slime-stink-1`).remove()
            }else if(document.contains(document.getElementById(`slime-stink-2`))){
                document.getElementById(`slime-stink-2`).remove()
            }

            if(document.contains(document.getElementById(`slime-dirt-spots`))){
                document.getElementById('slime-dirt-spots').remove();
            }

            statusRenderingArea.insertAdjacentHTML('afterbegin', dirtData[0]);

            /*
            if(!document.contains(document.getElementById(`slime-dirt-spots`))){
                statusRenderingArea.insertAdjacentHTML('afterbegin', dirtData[0]);
            };
            */

            statusRenderingArea.insertAdjacentHTML('afterbegin', dirtData[1])
    
            this.#stinkAnimationIntervalId = setInterval(()=>{
                
                if(document.contains(document.getElementById(`slime-stink-1`))){
                    document.getElementById(`slime-stink-1`).remove()
                }else if(document.contains(document.getElementById(`slime-stink-2`))){
                    document.getElementById(`slime-stink-2`).remove()
                }
    
                let index = 1;
                
                if(this.#stinkyFlag){index = 2};
                
                statusRenderingArea.insertAdjacentHTML('afterbegin', dirtData[index]);
                
                this.#stinkyFlag = !this.#stinkyFlag;
            },1000)
            
        }
    

    }

    eyeMover(){

        //get the eye elements start positions for the scope
    
        const eyeStartValues = [];
    
        getStartValues();
    
        function getStartValues(){
    
            const eyeLeft0 = document.getElementById('slime-left-eye');
            const eyeRight0 = document.getElementById('slime-right-eye');
            const eyeLeftGlow0 = document.getElementById('slime-left-eye-glow');
            const eyeRightGlow0 = document.getElementById('slime-right-eye-glow');
    
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
            const eyeLeft = document.getElementById('slime-left-eye');
            const eyeRight = document.getElementById('slime-right-eye');
            const eyeLeftGlow = document.getElementById('slime-left-eye-glow');
            const eyeRightGlow = document.getElementById('slime-right-eye-glow');
        
            const bothEyes = [eyeLeft,eyeLeftGlow,eyeRight,eyeRightGlow];
        
            // Moving all eye components
            bothEyes.forEach((element, index)=>{
                const currentX = element.getAttribute('cx');
                const currentY = element.getAttribute('cy');
        
                element.setAttribute('cx', `${Number(eyeStartValues[index].x) + eyeXIncrement}`)
                element.setAttribute('cy', `${Number(eyeStartValues[index].y) + eyeYIncrement}`)
        
                
            })
        
        }
    
    }

    foodComplain(xp_food){

        const statusRenderingArea = document.getElementById('status-changes');
    
        const statusChangeData = [
            `
            <g id="food-complain">
                <path
                    style="display:inline;fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:2.397;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                    d="m 47.545631,60.141562 c -3.824042,-3.812423 -4.608552,-4.540385 -5.011083,-4.649879 -0.330287,-0.08984 -4.555352,-0.130459 -13.720822,-0.131899 -14.385521,-0.0023 -13.766223,0.02501 -15.19659,-0.669097 -0.87916,-0.426622 -2.259408,-1.804323 -2.675815,-2.670875 -0.704963,-1.467044 -0.680532,-0.938077 -0.680532,-14.73497 0,-10.979928 0.0242,-12.749452 0.182688,-13.357929 0.605447,-2.324466 2.62764,-4.202704 4.947706,-4.59549 0.54867,-0.09289 6.638856,-0.121251 20.819856,-0.09696 l 20.044331,0.03434 0.680269,0.260038 c 1.889307,0.722204 3.234501,2.059287 3.939619,3.915864 l 0.271884,0.715869 0.03491,12.647019 c 0.02439,8.837959 -0.0048,12.880593 -0.09696,13.422543 -0.497861,2.928027 -3.130112,5.128677 -6.13739,5.13106 -1.035523,8.35e-4 -1.617836,0.154963 -2.091696,0.55369 -0.655923,0.551923 -0.652929,0.531943 -0.716884,4.78223 l -0.05966,3.964503 z"
                    id="path3956"
                    transform="matrix(0.26458333,0,0,0.26458333,-10.376582,-20.296304)"
                    inkscape:label="slime-speech-balloon"
                />
    
                <g
                id="g2608"
                transform="matrix(0.02192573,0,0,0.02192573,-3.8540415,-13.487529)"
                inkscape:label="slime-food">
                    <g
                        id="g2584"
                    >
                        <path
                            style="fill:#ddaf6d"
                            d="M 144.97,9.061 C 64.33,9.061 9.061,49.833 9.061,99.667 v 9.061 c 0,5.436 3.624,9.061 9.061,9.061 h 253.697 c 5.436,0 9.061,-3.624 9.061,-9.061 V 99.667 C 280.879,49.833 225.609,9.061 144.97,9.061 Z M 9.061,262.758 c 0,9.967 8.155,18.121 18.121,18.121 h 235.576 c 9.967,0 18.121,-8.155 18.121,-18.121 v -9.967 c 0,-4.53 -3.624,-8.155 -8.155,-8.155 H 17.215 c -4.53,0 -8.155,3.624 -8.155,8.155 z"
                            id="path2582" 
                        />
                    </g>
    
                    <path
                        style="fill:#bb6f39"
                        d="m 18.121,208.394 h 253.697 c 9.967,0 18.121,8.155 18.121,18.121 0,9.967 -8.155,18.121 -18.121,18.121 H 18.121 C 8.155,244.636 0,236.482 0,226.515 0,216.548 8.155,208.394 18.121,208.394 Z"
                        id="path2586" 
                    />
    
                    <path
                        style="fill:#efc75e"
                        d="m 18.121,172.152 h 253.697 v 36.242 h -18.121 l -27.182,27.182 -27.182,-27.182 H 18.121 Z"
                        id="path2588"
                    />
    
                    <path
                        style="fill:#bf392c"
                        d="M 18.121,117.788 H 271.818 V 144.97 H 18.121 Z"
                        id="path2590"
                    />
    
                    <g
                    id="g2596">
                        <path
                            style="fill:#c69d63"
                            d="m 18.121,117.788 h 18.121 c -5.436,0 -9.061,-3.624 -9.061,-9.061 v -9.061 c 0,-48.021 50.739,-86.982 126.848,-90.606 -2.718,0 -6.342,0 -9.061,0 C 64.33,9.061 9.061,49.833 9.061,99.667 v 9.061 c 0,5.436 3.624,9.06 9.06,9.06 z"
                            id="path2592" 
                        />
    
                        <path
                            style="fill:#c69d63"
                            d="m 27.182,262.758 v -18.121 h -9.967 c -4.53,0 -8.155,3.624 -8.155,8.155 v 9.967 c 0,9.967 8.155,18.121 18.121,18.121 h 18.121 c -9.966,-10e-4 -18.12,-8.156 -18.12,-18.122 z"
                            id="path2594" 
                        />
                    </g>
    
                    <rect
                        x="18.121"
                        y="117.788"
                        style="fill:#ae3c30"
                        width="18.121"
                        height="27.181999"
                        id="rect2598" 
                    />
    
                    <path
                        style="fill:#d7b354"
                        d="m 19.027,172.152 v 0 l -0.906,17.215 v 19.027 h 18.121 v -19.027 c -9.06,-0.906 -15.403,-8.155 -17.215,-17.215 z"
                        id="path2600" 
                    />
    
                    <path
                        style="fill:#3db39e"
                        d="m 271.818,145.876 v 0 L 18.121,144.97 v 0.906 C 8.155,147.688 0,156.749 0,167.621 c 0,12.685 9.967,22.652 22.652,22.652 10.873,0 19.933,-8.155 21.745,-18.121 h 37.148 c 0,9.967 9.967,18.121 22.652,18.121 12.685,0 22.652,-8.155 22.652,-18.121 h 36.242 c 0,9.967 9.967,18.121 22.652,18.121 12.685,0 22.652,-8.155 22.652,-18.121 h 37.148 c 1.812,9.967 10.873,18.121 21.745,18.121 12.685,0 22.651,-9.967 22.651,-22.652 0,-10.873 -8.154,-19.933 -18.121,-21.745 z"
                        id="path2602"
                    />
                    <path
                        style="fill:#37a18e"
                        d="m 0.906,173.058 c 0,0.906 0.906,1.812 0.906,2.718 0,0.906 0,0.906 0.906,1.812 0,0.906 0.906,1.812 0.906,1.812 0,0.906 0.906,0.906 0.906,1.812 0.906,0.906 0.906,0.906 1.812,1.812 l 0.906,0.906 c 0.906,0.906 0.906,0.906 1.812,1.812 l 0.906,0.906 c 0.906,0.906 1.812,0.906 2.718,0.906 0.906,0 0.906,0.906 1.812,0.906 0.906,0 1.812,0.906 3.624,0.906 h 0.906 v 0 c 0.906,0.906 1.812,0.906 3.624,0.906 3.624,0 6.342,-0.906 9.061,-1.812 -8.155,-3.624 -13.591,-11.779 -13.591,-20.839 0,-10.873 8.155,-19.933 18.121,-21.745 v -0.906 h -18.12 v 0.906 C 8.155,147.688 0,156.749 0,167.621 c 0,1.812 0,2.718 0,4.53 0.906,10e-4 0.906,0.907 0.906,0.907 z"
                        id="path2604" 
                    />
    
                    <path
                        style="fill:#a86433"
                        d="m 18.121,226.515 c 0,-9.967 8.155,-18.121 18.121,-18.121 H 18.121 C 8.155,208.394 0,216.548 0,226.515 c 0,9.967 8.155,18.121 18.121,18.121 h 18.121 c -9.966,0 -18.121,-8.154 -18.121,-18.121 z"
                        id="path2606"
                    />
    
                </g>
    
            </g>
            `
        ];
    
    
        if(xp_food >= 80){
            if(document.contains(document.getElementById(`food-complain`))){
                document.getElementById(`food-complain`).remove()
            };
        }else{
            if(!document.contains(document.getElementById(`food-complain`))){
                statusRenderingArea.insertAdjacentHTML('afterbegin', statusChangeData[0]);
            }
    
        }
        
    }

    updateSlime(){
        const currentPet = dadosGlobais.getCurrentPet();
        this.#color = currentPet.color;
        this.#name = currentPet.name;
        this.#id = currentPet.id;
        this.#xpFood = currentPet.xp_food;
        this.#xpFun = currentPet.xp_fun;
        this.#xpHygiene = currentPet.xp_hygiene;

        this.renderDirtLevel(this.#xpHygiene);
        this.foodComplain(this.#xpFood);

        document.getElementById('slime-body').style.fill = this.#color;
        
    }

    feed(food){

        const newStatus = {
            xp_food: ((this.#xpFood + food.xp_food_change) < 100) ? (this.#xpFood + food.xp_food_change) : 100,
            xp_fun: ((this.#xpFun + food.xp_fun_change) < 100) ? (this.#xpFun + food.xp_fun_change) : 100
        }

        this.xpFood = food.xp_food_change;
        this.xpFun = food.xp_fun_change;

        gameController.updatePet(this.#id, newStatus)
        // .then(()=>{
        //     this.updateSlime();
        // });

        this.#sound = new Audio();
        this.#sound.src = '/assets/audios/that-nice-bite.mp3';

        if(this.#sound.paused){
            this.#sound.play();
        }else{
            this.#sound.currentTime = 0;
        }

    }
}

export {Slime};