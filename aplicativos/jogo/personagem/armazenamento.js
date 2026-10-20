
import {
    adicionarExperiencia
} from "./progressao.js";

import {
    adicionarExperienciaMaestria,
    aplicarPontosDeMaestria
} from "../atributos/maestria.js";

const CHAVE_PERSONAGEM = "rpg_web_personagem";

const ATRIBUTOS = [
    "forca",
    "destreza",
    "agilidade",
    "constituicao",
    "inteligencia",
    "sabedoria",
    "carisma",
    "sorte"
];

function obterArmazenamento() {
    try {
        if (typeof localStorage === "undefined") {
            return null;
        }

        return localStorage;
    } catch {
        return null;
    }
}

function validarPersonagem(personagem) {
    if (
        !personagem ||
        typeof personagem !== "object" ||
        Array.isArray(personagem)
    ) {
        return false;
    }

    if (
        typeof personagem.nome !== "string" ||
        personagem.nome.trim() === "" ||
        !Number.isInteger(personagem.nivel) ||
        personagem.nivel < 1 ||
        !Number.isFinite(personagem.xp) ||
        personagem.xp < 0
    ) {
        return false;
    }

    if (
        !personagem.atributos ||
        typeof personagem.atributos !== "object" ||
        Array.isArray(personagem.atributos)
    ) {
        return false;
    }

    const chavesAtributos = Object.keys(personagem.atributos);

    if (
        chavesAtributos.length !== ATRIBUTOS.length ||
        !ATRIBUTOS.every(atributo =>
            Object.hasOwn(personagem.atributos, atributo)
        )
    ) {
        return false;
    }

    for (const atributo of ATRIBUTOS) {
        const valor = personagem.atributos[atributo];

        if (!Number.isInteger(valor) || valor < 0) {
            return false;
        }
    }

    if (
        !personagem.maestrias ||
        typeof personagem.maestrias !== "object" ||
        Array.isArray(personagem.maestrias)
    ) {
        return false;
    }

    for (const atributo of ATRIBUTOS) {
        const maestria = personagem.maestrias[atributo];

        if (
            !maestria ||
            !Number.isFinite(maestria.xp) ||
            maestria.xp < 0 ||
            !Number.isInteger(maestria.pontosAcumulados) ||
            maestria.pontosAcumulados < 0
        ) {
            return false;
        }
    }

    if (
        !personagem.localizacao ||
        typeof personagem.localizacao !== "object" ||
        typeof personagem.localizacao.localId !== "string" ||
        typeof personagem.localizacao.regiaoId !== "string" ||
        typeof personagem.localizacao.cidadeId !== "string"
    ) {
        return false;
    }

    return true;
}

export function salvarPersonagem(personagem) {
    if (!validarPersonagem(personagem)) {
        return {
            sucesso: false,
            mensagem: "Os dados do personagem são inválidos."
        };
    }

    const armazenamento = obterArmazenamento();

    if (!armazenamento) {
        return {
            sucesso: false,
            mensagem: "O armazenamento local não está disponível."
        };
    }

    try {
        armazenamento.setItem(
            CHAVE_PERSONAGEM,
            JSON.stringify(personagem)
        );

        return { sucesso: true };
    } catch {
        return {
            sucesso: false,
            mensagem: "Não foi possível salvar o personagem."
        };
    }
}

export function carregarPersonagem() {
    const armazenamento = obterArmazenamento();

    if (!armazenamento) {
        return null;
    }

    try {
        const personagemSalvo =
            armazenamento.getItem(CHAVE_PERSONAGEM);

        if (!personagemSalvo) {
            return null;
        }

        const personagem = JSON.parse(personagemSalvo);

        if (!validarPersonagem(personagem)) {
            return null;
        }

        return personagem;
    } catch {
        return null;
    }
}

export function removerPersonagem() {
    const armazenamento = obterArmazenamento();

    if (!armazenamento) {
        return {
            sucesso: false,
            mensagem: "O armazenamento local não está disponível."
        };
    }

    try {
        armazenamento.removeItem(CHAVE_PERSONAGEM);

        return { sucesso: true };
    } catch {
        return {
            sucesso: false,
            mensagem: "Não foi possível remover o personagem."
        };
    }
}

export function adicionarExperienciaPersonagem(quantidade) {
    const personagem = carregarPersonagem();

    if (!personagem) {
        return {
            sucesso: false,
            mensagem: "Nenhum personagem válido foi encontrado."
        };
    }

    const resultado = adicionarExperiencia(
        personagem,
        quantidade
    );

    if (!resultado.sucesso) {
        return resultado;
    }

    const aplicacao = aplicarPontosDeMaestria(
        personagem.atributos,
        personagem.maestrias,
        personagem.nivel
    );

    if (!aplicacao.sucesso) {
        return aplicacao;
    }

    const salvamento = salvarPersonagem(personagem);

    if (!salvamento.sucesso) {
        return salvamento;
    }

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
            mensagem: "Nenhum personagem válido foi encontrado."
        };
    }

    const resultado = adicionarExperienciaMaestria(
        personagem.maestrias,
        atributo,
        quantidade
    );

    if (!resultado.sucesso) {
        return resultado;
    }

    const aplicacao = aplicarPontosDeMaestria(
        personagem.atributos,
        personagem.maestrias,
        personagem.nivel
    );

    if (!aplicacao.sucesso) {
        return aplicacao;
    }

    const salvamento = salvarPersonagem(personagem);

    if (!salvamento.sucesso) {
        return salvamento;
    }

    return {
        sucesso: true,
        personagem,
        atributo,
        experiencia: resultado.experiencia,
        pontosAcumulados:
            personagem.maestrias[atributo].pontosAcumulados
    };
}
