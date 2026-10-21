
import {
    adicionarExperienciaPersonagem
} from "../personagem/armazenamento.js";

export function concederRecompensaVitoria(combate) {
    if (
        !combate ||
        combate.status !== "vitoria" ||
        combate.recompensaReclamada
    ) {
        return {
            sucesso: false,
            mensagem: "A recompensa não está disponível."
        };
    }

    const xpConcedido = combate.monstro?.xpRecompensa;

    if (
        !Number.isFinite(xpConcedido) ||
        xpConcedido <= 0
    ) {
        return {
            sucesso: false,
            mensagem: "A recompensa de XP é inválida."
        };
    }

    const resultado = adicionarExperienciaPersonagem(
        xpConcedido
    );

    if (!resultado.sucesso) {
        return resultado;
    }

    combate.recompensaReclamada = true;

    combate.log.push(
        `Você recebeu ${xpConcedido} XP pela vitória.`
    );

    return {
        sucesso: true,
        xpConcedido,
        experienciaTotal: resultado.experiencia,
        nivel: resultado.nivel,
        niveisGanhos: resultado.niveisGanhos
    };
}
