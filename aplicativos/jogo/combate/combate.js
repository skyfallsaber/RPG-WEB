
import {
    calcularEstatisticasPersonagem,
    calcularDano
} from "./regras.js";

function validarMonstro(monstro) {
    return Boolean(
        monstro &&
        typeof monstro.id === "string" &&
        typeof monstro.nome === "string" &&
        Number.isInteger(monstro.vidaMaxima) &&
        monstro.vidaMaxima > 0 &&
        Number.isFinite(monstro.ataque) &&
        monstro.ataque >= 0 &&
        Number.isFinite(monstro.defesa) &&
        monstro.defesa >= 0 &&
        Number.isFinite(monstro.agilidade) &&
        monstro.agilidade >= 0 &&
        Number.isFinite(monstro.recompensa?.xp) &&
        monstro.recompensa.xp > 0
    );
}

export function iniciarCombate(personagem, monstro) {
    const resultado = calcularEstatisticasPersonagem(personagem);

    if (!resultado.sucesso) {
        return resultado;
    }

    if (!validarMonstro(monstro)) {
        return {
            sucesso: false,
            mensagem: "Dados do monstro inválidos."
        };
    }

    const estatisticas = resultado.estatisticas;

    const combate = {
        personagem: {
            vida: estatisticas.vida,
            vidaMaxima: estatisticas.vidaMaxima,
            ataque: estatisticas.ataque,
            defesa: estatisticas.defesa,
            agilidade: estatisticas.agilidade
        },

        monstro: {
            id: monstro.id,
            nome: monstro.nome,
            vida: monstro.vidaMaxima,
            vidaMaxima: monstro.vidaMaxima,
            ataque: monstro.ataque,
            defesa: monstro.defesa,
            agilidade: monstro.agilidade,
            xpRecompensa: monstro.recompensa.xp
        },

        turnoAtual:
            estatisticas.agilidade >= monstro.agilidade
                ? "personagem"
                : "monstro",

        status: "em_andamento",
        recompensaReclamada: false,
        log: ["O combate começou."]
    };

    return {
        sucesso: true,
        combate
    };
}

export function executarTurnoPersonagem(combate) {
    if (
        !combate ||
        combate.status !== "em_andamento" ||
        combate.turnoAtual !== "personagem"
    ) {
        return {
            sucesso: false,
            mensagem: "Não é possível executar o turno do personagem."
        };
    }

    const resultado = calcularDano(
        combate.personagem.ataque,
        combate.monstro.defesa
    );

    if (!resultado.sucesso) {
        return resultado;
    }

    combate.monstro.vida = Math.max(
        0,
        combate.monstro.vida - resultado.dano
    );

    combate.log.push(
        `O personagem causou ${resultado.dano} de dano ao ${combate.monstro.nome}.`
    );

    if (combate.monstro.vida === 0) {
        combate.status = "vitoria";
        combate.turnoAtual = null;
        combate.log.push("O personagem venceu o combate.");
    } else {
        combate.turnoAtual = "monstro";
    }

    return {
        sucesso: true,
        combate,
        dano: resultado.dano
    };
}

export function executarTurnoMonstro(combate) {
    if (
        !combate ||
        combate.status !== "em_andamento" ||
        combate.turnoAtual !== "monstro"
    ) {
        return {
            sucesso: false,
            mensagem: "Não é possível executar o turno do monstro."
        };
    }

    const resultado = calcularDano(
        combate.monstro.ataque,
        combate.personagem.defesa
    );

    if (!resultado.sucesso) {
        return resultado;
    }

    combate.personagem.vida = Math.max(
        0,
        combate.personagem.vida - resultado.dano
    );

    combate.log.push(
        `O ${combate.monstro.nome} causou ${resultado.dano} de dano ao personagem.`
    );

    if (combate.personagem.vida === 0) {
        combate.status = "derrota";
        combate.turnoAtual = null;
        combate.log.push(
            "O personagem foi derrotado. Nenhuma recompensa foi concedida."
        );
    } else {
        combate.turnoAtual = "personagem";
    }

    return {
        sucesso: true,
        combate,
        dano: resultado.dano
    };
}
