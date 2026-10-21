
import {
    carregarPersonagem,
    salvarPersonagem
} from "../personagem/armazenamento.js";

const LOCALIZACAO_RETORNO = {
    regiaoId: "regiao-inicial",
    cidadeId: "cidade-inicial",
    localId: "praca"
};

export function processarDerrota(combate) {
    if (!combate || combate.status !== "derrota") {
        return {
            sucesso: false,
            mensagem: "O combate não terminou em derrota."
        };
    }

    if (combate.derrotaProcessada === true) {
        return {
            sucesso: false,
            mensagem: "Esta derrota já foi processada."
        };
    }

    const personagem = carregarPersonagem();

    if (!personagem) {
        return {
            sucesso: false,
            mensagem: "Nenhum personagem válido foi encontrado."
        };
    }

    const localizacaoAnterior = {
        ...personagem.localizacao
    };

    personagem.localizacao = {
        ...LOCALIZACAO_RETORNO
    };

    const salvamento = salvarPersonagem(personagem);

    if (!salvamento.sucesso) {
        return salvamento;
    }

    combate.derrotaProcessada = true;

    return {
        sucesso: true,
        personagem,
        localizacaoAnterior,
        localizacaoAtual: {
            ...personagem.localizacao
        },
        mensagem: "Você foi derrotado e retornou à Praça. Nenhuma recompensa foi concedida."
    };
}
