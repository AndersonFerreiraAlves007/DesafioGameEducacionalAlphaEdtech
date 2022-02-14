// recebe um valor (pedra, papel, tesoura).
// sorteia um valor concorrente (pedra, papel, tesoura).
// retorna o vencedor da rodada.

// valor de entrada: numeo inteiro entre 1 e 3.

// testes:
let res01 = 0;
let res02 = 0;
let res03 = 0;
let fora = 0;
for (let i = 0; i < 1000; i++) {
    // const resut = Math.round(Math.random() * 2) + 1;
    const result = parseInt(Math.random() * 3 + 1);
    console.log(`valor = ${result}`);

    switch (result) {
        case 1:
            res01++;
            break;
        case 2:
            res02++;
            break;
        case 3:
            res03++;
            break;
        default:
            fora++
            console.log("erro em switch");
    }
}
console.log(`valores de res01 = ${res01}, res02 = ${res02}, res03 = ${res03},\nvalor fora do escopo = ${fora}`);