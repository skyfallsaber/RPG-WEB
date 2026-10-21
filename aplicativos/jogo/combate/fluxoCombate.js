
import {
    executarTurnoPersonagem,
    executarTurnoMonstro
} from "./combate.js";

import {
    processarDerrota
} from "./resultadoCombate.js";

export function executarTurnoAtual(combate) {
    if (!combate || combate.status !== "em_andamento") {
        return {
            sucesso: false,
            mensagem: "Não existe um turno válido para executar."
        };
    }

    let resultado;

    if (combate.turnoAtual === "personagem") {
        resultado = executarTurnoPersonagem(combate);
    } else if (combate.turnoAtual === "monstro") {
        resultado = executarTurnoMonstro(combate);
    } else {
        return {
            sucesso: false,
            mensagem: "Turno atual inválido."
        };
    }

    if (!resultado.sucesso) {
        return resultado;
    }

    if (combate.status === "derrota") {
        const retorno = processarDerrota(combate);

        if (!retorno.sucesso) {
            return {
                sucesso: false,
                mensagem: retorno.mensagem,
                combate
            };
        }

        combate.log.push(retorno.mensagem);

        return {
            sucesso: true,
            combate,
            dano: resultado.dano,
            derrotaProcessada: true,
            personagem: retorno.personagem
        };
    }

    return {
        ...resultado,
        combate
    };
}
