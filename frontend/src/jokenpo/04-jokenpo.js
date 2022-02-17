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
    const rock = $("jokenpo");
    $(".jokenpo__rock").on("click", teste);
    $(".jokenpo__paper").on("click", teste);
    $(".jokenpo__scissors").on("click", teste);

    function teste() {
        $(this).click(function () {
            console.log($(this).attr("value"));

            const choicePlayer = $(this).attr("value");
            const result = jokenpo(choicePlayer);

            $(".jokenpo__slime-choice").html(`
            <p> ${result.machineChoice} </p>
            `);
            $(".jokenpo__player-choice").html(`
            <p> ${result.playerChoice} </p>
            `);
            // alert(`resultado = ${result.result}`);
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