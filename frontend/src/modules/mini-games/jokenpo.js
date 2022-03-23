

//################ testando com click de botão
import { serverConnection } from '../server-communication.js';
import { dadosGlobais } from '../global-data.js'
import { statusBar } from '../update-status-bar.js'
export function agoraVai() {
    $(".jokenpo").show();

    // $(".jokenpo").modal({ backdrop: "static" })

    $(".jokenpo__closed").on("click", jokenpoClosed);
    function jokenpoClosed() {
        $(".jokenpo").hide();
    }

    // move buttons in screan
    // $(".jokenpo__rock").draggable({ revert: true });
    // $(".jokenpo__paper").draggable({ revert: true });
    // $(".jokenpo__scissors").draggable({ revert: true });

    $(".jokenpo__rock").on("click", mostrarEscolha);
    $(".jokenpo__paper").on("click", mostrarEscolha);
    $(".jokenpo__scissors").on("click", mostrarEscolha);

    async function mostrarEscolha() {
        const valueChoice = this.getAttribute("value");
        await choicePlayer(valueChoice);
    }

    // $(".jokenpo__player-choice").droppable({
    //     classes: {
    //         "ui-droppable-active": "ui-state-active",
    //     },
    //     drop: async function (event, ui) {
    //         $(this)
    //         // .addClass("ui-state-highlight")
    //         let valueChoice = ui.draggable.attr("value");
    //         await choicePlayer(valueChoice);
    //     }
    // });

    // image path
    const imageRock = "../../assets/images/game/jokenpo/rock-02.png";
    const imagePaper = "../../assets/images/game/jokenpo/paper-02.png";
    const imageScissors = "../../assets/images/game/jokenpo/scissors-02.png";

    // call the function jokenpo, change background of div ("jokenpo__player-choice")
    async function choicePlayer(number) {
        const currentPet = dadosGlobais.getCurrentPet()

        const xp_fun_change = 10;
        const xp_hygiene_change = -10;
        const xp_food_change = -10;

        const objectPet = {
            xp_food: ((currentPet.xp_food + xp_food_change) > 0) ? (currentPet.xp_food + xp_food_change) : 0,
            xp_hygiene: ((currentPet.xp_hygiene + xp_hygiene_change) > 0) ? (currentPet.xp_hygiene + xp_hygiene_change) : 0,
            xp_fun: ((currentPet.xp_fun + xp_fun_change) < 100) ? (currentPet.xp_fun + xp_fun_change) : 100
        }
        dadosGlobais.setCurrentPet(await serverConnection.updatePet(currentPet.id, objectPet));

        await statusBar.updateInfoPet()

        const choicePlayer = parseInt(number);
        const result = jokenpo(choicePlayer);

        let imageSlimeChoice = "";
        switch (result.machineChoice) {
            case "pedra":
                imageSlimeChoice = imageRock;
                $('.jokenpo__slime-choice').css({
                    'background-color': '#FBD165',
                });
                break;
            case "papel":
                imageSlimeChoice = imagePaper;
                $('.jokenpo__slime-choice').css({
                    'background-color': '#F4B0BF',
                });
                break;
            case "tesoura":
                imageSlimeChoice = imageScissors;
                $('.jokenpo__slime-choice').css({
                    'background-color': '#A9CC8A',
                });
                break;
            default:
                "erro in siwtch of result.machineChoice"
        }

        $(".jokenpo__slime-choice").css({
            "background-image": `url(${imageSlimeChoice})`,
            "background-size": "contain",
            "background-repeat": "no-repeat",
            "background-position": "center",
            // "background-color": "#ffffff",
        });

        let imagePlayerChoice = "";
        switch (result.playerChoice) {
            case "pedra":
                imagePlayerChoice = imageRock;
                $('.jokenpo__player-choice').css({
                    'background': '#FBD165',
                });
                break;
            case "papel":
                imagePlayerChoice = imagePaper;
                $('.jokenpo__player-choice').css({
                    'background': '#F4B0BF',
                });
                break;
            case "tesoura":
                imagePlayerChoice = imageScissors;
                $('.jokenpo__player-choice').css({
                    'background': '#A9CC8A',
                });
                break;
            default:
                "erro in siwtch of result.machineChoice"
        }

        $(".jokenpo__player-choice").css({
            "background-image": `url(${imagePlayerChoice})`,
            "background-size": "contain",
            "background-repeat": "no-repeat",
            "background-position": "center",
            // "background-color": "#ffffff",
        });

        $(".jokenpo__result").html(`
            <div> <p> ${result.result} </p> </div>
            `);
    }

    // main function
    // input value between 1 to 3
    function jokenpo(_num) {
        // definition of values:
        // rock = 1
        // paper = 2
        // scissors = 3

        // the value is already treated as an integer number
        const playerChoice = _num;

        const machineChoice = parseInt(Math.random() * 3 + 1);

        let result = "";

        if (playerChoice == machineChoice) {
            result = "empate";
        }
        else {
            // player = rock
            if (playerChoice == 1) {
                switch (machineChoice) {
                    case 2:
                        result = "guti-guti venceu";
                        break;
                    case 3:
                        result = "eba! você venceu";
                        break;
                    default:
                        result = "ops, algo deu errado no nosso sistema";
                }
            }
            // player = paper
            else if (playerChoice == 2) {
                switch (machineChoice) {
                    case 1:
                        result = "eba! você venceu";
                        break;
                    case 3:
                        result = "guti-guti venceu";
                        break;
                    default:
                        result = "ops, algo deu errado no nosso sistema";
                }
            }
            // player = scissors
            else if (playerChoice == 3) {
                switch (machineChoice) {
                    case 1:
                        // colocar nome dinamico do backend
                        result = "guti-guti venceu";
                        break;
                    case 2:
                        result = "eba! você venceu";
                        break;
                    default:
                        result = "ops, algo deu errado em nosso sistema";
                }
            }
        }
        // return in text form
        let playerChoiceText = "";
        let machineChoiceText = "";
        switch (playerChoice) {
            case 1:
                playerChoiceText = "pedra";
                break;
            case 2:
                playerChoiceText = "papel";
                break;
            case 3:
                playerChoiceText = "tesoura";
                break;
            default:
                "ops, algo deu errado no nosso sistema";
        }
        switch (machineChoice) {
            case 1:
                machineChoiceText = "pedra";
                break;
            case 2:
                machineChoiceText = "papel";
                break;
            case 3:
                machineChoiceText = "tesoura";
                break;
            default:
                "ops, algo deu errado no nosso sistema";
        }

        return {
            "playerChoice": playerChoiceText,
            "machineChoice": machineChoiceText,
            "result": result
        }
    }

}

