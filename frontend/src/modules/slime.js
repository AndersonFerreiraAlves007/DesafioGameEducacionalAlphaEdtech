class Slime {

    #name;
    #userId;
    #id;
    #xpFood;
    #xpFun;
    #xpHygiene;
    #color;

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

                <g inkscape:label="slime" inkscape:groupmode="layer" id="layer1">
                    <g id="g1777" inkscape:label="slime-complete" transform="translate(10.376582,20.296304)">

                        <path
                            style="display:inline;fill:#00a1cc;fill-opacity:1;stroke:#004c64;stroke-width:0.648978;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
                            d="m -3.5024074,8.0540503 c 0,5.0178887 5.0412708,5.1918237 10.059159,5.1918237 5.0178884,0 10.0591584,-0.173935 10.0591584,-5.1918237 0,-5.0178882 -5.04127,-7.78773596 -10.0591584,-7.78773596 -5.0178882,0 -10.059159,2.76984776 -10.059159,7.78773596 z"
                            id="path2999-17-9-8-5-3-4" inkscape:connector-curvature="0" sodipodi:nodetypes="sssss"
                            inkscape:label="slime-body" 
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
                            id="path3810-5-6-8" transform="scale(-1,1)" cx="-3.9608397" cy="5.1336493" r="1.297956"
                            inkscape:label="slime-left-eye" 
                        />

                        <circle transform="scale(-1,1)"
                            style="display:inline;fill:#191919;fill-opacity:1;stroke:none;stroke-width:0.324489"
                            id="path3810-1-7-1-1" cx="-8.503684" cy="5.1336493" r="1.297956"
                            inkscape:label="slime-right-eye" 
                        />

                        <circle
                            style="display:inline;fill:#e6e6e6;fill-opacity:1;stroke:none;stroke-width:0.324489"
                            id="path3832-6-8-9" transform="scale(-1,1)" cx="-3.6363509" cy="4.8091598"
                            r="0.64897799" inkscape:label="slime-left-eye-glow" 
                        />

                        <circle
                            style="display:inline;fill:#e6e6e6;fill-opacity:1;stroke:none;stroke-width:0.324489"
                            id="path3832-7-1-9-8" transform="scale(-1,1)" cx="-8.1791954" cy="4.8091598"
                            r="0.64897799" inkscape:label="slime-right-eye-glow" 
                        />



                    </g>
                </g>



            </svg>
        `)
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
        }else{
            this.#xpFood = newXpFood;
        }

    }
}

export {Slime};