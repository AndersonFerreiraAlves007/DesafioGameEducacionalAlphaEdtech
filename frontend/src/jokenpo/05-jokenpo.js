// version on draglle drop
$(document).ready(function () {
    // hiden they sections game end jokenpo
    gameClosed();
    jokenpoClosed();

    $(".home-button__game").on("click", gameOpem);
    function gameOpem() {
        $(".game").show();
    }

    $(".game__closed").on("click", gameClosed);
    function gameClosed() {
        $(".game").hide();
    }

    $(".game__jokenpo").on("click", jokenpoOpem);
    function jokenpoOpem() {
        $(".jokenpo").show();
    }

    $(".jokenpo__closed").on("click", jokenpoClosed);
    function jokenpoClosed() {
        $(".jokenpo").hide();
    }

    // will be replaced by the drag and drop code
    $(".jokenpo__rock").on("click", choice);
    $(".jokenpo__paper").on("click", choice);
    $(".jokenpo__scissors").on("click", choice);

    const imageRock = "./assets/images/game/jokenpo/rock.png";
    const imagePaper = "./assets/images/game/jokenpo/paper.png";
    const imageScissors = "./assets/images/game/jokenpo/scissors.png";

    function choice() {
        $(this).click(function () {
            const choicePlayer = $(this).attr("value");
            const result = jokenpo(choicePlayer);

            let imageSlimeChoice = "";
            switch (result.machineChoice) {
                case "pedra":
                    imageSlimeChoice = imageRock;
                    break;
                case "papel":
                    imageSlimeChoice = imagePaper;
                    break;
                case "tesoura":
                    imageSlimeChoice = imageScissors;
                    break;
                default:
                    "erro in siwtch of result.machineChoice"
            }

            $(".jokenpo__slime-choice").css({
                "background-image": `url(${imageSlimeChoice})`,
                "background-size": "contain",
                "background-repeat": "no-repeat",
                "background-position": "center",
                "background-color": "#ffffff",
            });

            let imagePlayerChoice = "";
            switch (result.playerChoice) {
                case "pedra":
                    imagePlayerChoice = imageRock;
                    break;
                case "papel":
                    imagePlayerChoice = imagePaper;
                    break;
                case "tesoura":
                    imagePlayerChoice = imageScissors;
                    break;
                default:
                    "erro in siwtch of result.machineChoice"
            }

            $(".jokenpo__player-choice").css({
                "background-image": `url(${imagePlayerChoice})`,
                "background-size": "contain",
                "background-repeat": "no-repeat",
                "background-position": "center",
                "background-color": "#ffffff",
            });

            $(".jokenpo__result").html(`
            <div> <p> ${result.result} </p> </div>
            `);
        })
    }

    // main function
    // input value between 1 to 3
    function jokenpo(_num) {
        // definition of values:
        // rock = 1
        // paper = 2
        // scissors = 3

        const playerChoice = parseInt(_num);

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
                        result = "maquina vence";
                        break;
                    case 3:
                        result = "jogador vence";
                        break;
                    default:
                        result = "erro no switch para ej == 1";
                }
            }
            // player = paper
            else if (playerChoice == 2) {
                switch (machineChoice) {
                    case 1:
                        result = "jogador vence";
                        break;
                    case 3:
                        result = "maquina vence";
                        break;
                    default:
                        result = "erro no switch para ej == 2";
                }
            }
            // player = scissors
            else if (playerChoice == 3) {
                switch (machineChoice) {
                    case 1:
                        result = "maquina vence";
                        break;
                    case 2:
                        result = "jogador vence";
                        break;
                    default:
                        result = "erro no switch para ej == 3";
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
                "erro in switch the clientChoiceText";
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
                "erro no switch de machineChoiceTexto";
        }

        return {
            "playerChoice": playerChoiceText,
            "machineChoice": machineChoiceText,
            "result": result
        }
    }
});