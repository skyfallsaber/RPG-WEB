import {
    calcularXpParaProximoNivel
} from "../../../configuracoes/progressao/personagem.js";

export function adicionarExperiencia(
    personagem,
    quantidade
) {

    if (!Number.isFinite(quantidade) || quantidade <= 0) {
        return {
            sucesso: false,
            mensagem: "A quantidade de experiência deve ser maior que 0."
        };
    }

    personagem.xp += quantidade;

    let niveisGanhos = 0;

    while (
        personagem.xp >=
        calcularXpTotalParaNivel(personagem.nivel + 1)
    ) {

        personagem.nivel++;

        niveisGanhos++;
    }

    return {
        sucesso: true,
        experiencia: personagem.xp,
        nivel: personagem.nivel,
        niveisGanhos
    };
}

function calcularXpTotalParaNivel(nivel) {

    let xpTotal = 0;

    for (let nivelAtual = 1; nivelAtual < nivel; nivelAtual++) {

        xpTotal +=
            calcularXpParaProximoNivel(nivelAtual);
    }

    return xpTotal;
}