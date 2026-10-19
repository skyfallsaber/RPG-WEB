const CHAVE_PERSONAGEM = "rpg_web_personagem";
import {
    adicionarExperiencia
} from "./progressao.js";
import {
    adicionarExperienciaMaestria,
    aplicarPontosDeMaestria
} from "../atributos/maestria.js";


export function salvarPersonagem(personagem) {
    localStorage.setItem(
        CHAVE_PERSONAGEM,
        JSON.stringify(personagem)
    );
}

export function carregarPersonagem() {
    const personagemSalvo =
        localStorage.getItem(CHAVE_PERSONAGEM);

    if (!personagemSalvo) {
        return null;
    }

    return JSON.parse(personagemSalvo);
}

export function removerPersonagem() {
    localStorage.removeItem(CHAVE_PERSONAGEM);
}
export function adicionarExperienciaPersonagem(quantidade) {

    const personagem = carregarPersonagem();

    if (!personagem) {
        return {
            sucesso: false,
            mensagem: "Nenhum personagem encontrado."
        };
    }

    const resultado =
        adicionarExperiencia(
            personagem,
            quantidade
        );

    if (!resultado.sucesso) {
        return resultado;
    }
    aplicarPontosDeMaestria(
    personagem.atributos,
    personagem.maestrias,
    personagem.nivel
);

    salvarPersonagem(personagem);

    return {
        sucesso: true,
        personagem,
        experiencia: resultado.experiencia,
        nivel: resultado.nivel,
        niveisGanhos: resultado.niveisGanhos
    };
}
export function adicionarExperienciaMaestriaPersonagem(
    atributo,
    quantidade
) {

    const personagem = carregarPersonagem();

    if (!personagem) {
        return {
            sucesso: false,
            mensagem: "Nenhum personagem encontrado."
        };
    }

    const resultado =
        adicionarExperienciaMaestria(
            personagem.maestrias,
            atributo,
            quantidade
        );

    if (!resultado.sucesso) {
        return resultado;
    }

    const aplicacao =
        aplicarPontosDeMaestria(
            personagem.atributos,
            personagem.maestrias,
            personagem.nivel
        );

    if (!aplicacao.sucesso) {
        return aplicacao;
    }

    salvarPersonagem(personagem);

    return {
        sucesso: true,
        personagem,
        atributo,
        experiencia: resultado.experiencia,
        pontosAcumulados:
            personagem.maestrias[atributo].pontosAcumulados
    };
}