// recebe um valor (pedra, papel, tesoura).
// sorteia um valor concorrente (pedra, papel, tesoura).
// retorna o vencedor da rodada.

// valor de entrada: numeo inteiro entre 1 e 3.

// testes:

// função principal
function jokenpo(_num) {
    // definição dos valores:
    // pedra = 1
    // papel = 2
    // tesoura = 3

    // escolha do Jogador
    const ej = _num;

    // escolha da maquina
    const em = parseInt(Math.random() * 3 + 1);

    // texto que informa quem venceu
    let result = "";

    // estrutura lójica
    if (ej == em) {
        result = "empate";
    }
    else {
        // jogador = pedra
        if (ej == 1) {
            switch (em) {
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
        // jogador = papel
        else if (ej == 2) {
            switch (em) {
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
        // jogador == tesoura;
        else if (ej == 3) {
            switch (em) {
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

    let ejTexto = "";
    let emTexto = "";
    switch (ej) {
        case 1:
            ejTexto = "pedra";
            break;
        case 2:
            ejTexto = "papel";
            break;
        case 3:
            ejTexto = "tesoura";
            break;
        default:
            "erro no switch de ejTexto";
    }
    switch (em) {
        case 1:
            emTexto = "pedra";
            break;
        case 2:
            emTexto = "papel";
            break;
        case 3:
            emTexto = "tesoura";
            break;
        default:
            "erro no switch de emTexto";
    }

    return {
        "escolha-jogador": ejTexto,
        "escolha-maquina": emTexto,
        "resultado-do-jogo": result
    }
}

// loop para testar se esta dando erro.
for (let i = 0; i < 10; i++) {
    const escolhaDaVez = parseInt(Math.random() * 3 + 1);
    const resultTest = jokenpo(escolhaDaVez);
    console.log(resultTest);
}
