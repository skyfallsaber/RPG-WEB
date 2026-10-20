
import test from "node:test";
import assert from "node:assert/strict";

import {
    criarAtributosIniciais,
    validarCriacao,
    alterarAtributo
} from "../aplicativos/jogo/personagem/personagem.js";

import {
    adicionarExperiencia
} from "../aplicativos/jogo/personagem/progressao.js";

test("atributos iniciais começam em zero", () => {
    const atributos = criarAtributosIniciais();

    assert.equal(Object.keys(atributos).length, 8);
    assert.ok(Object.values(atributos).every(valor => valor === 0));
});

test("criação aceita exatamente 40 pontos válidos", () => {
    const atributos = {
        forca: 12,
        destreza: 12,
        agilidade: 12,
        constituicao: 4,
        inteligencia: 0,
        sabedoria: 0,
        carisma: 0,
        sorte: 0
    };

    assert.equal(validarCriacao("Aventureiro", atributos).valido, true);
});

test("criação rejeita atributos negativos", () => {
    const atributos = {
        forca: 13,
        destreza: 12,
        agilidade: 12,
        constituicao: 4,
        inteligencia: 0,
        sabedoria: 0,
        carisma: 0,
        sorte: -1
    };

    assert.equal(validarCriacao("Aventureiro", atributos).valido, false);
});

test("criação rejeita nome vazio", () => {
    const atributos = {
        forca: 12,
        destreza: 12,
        agilidade: 12,
        constituicao: 4,
        inteligencia: 0,
        sabedoria: 0,
        carisma: 0,
        sorte: 0
    };

    assert.equal(validarCriacao("   ", atributos).valido, false);
});

test("atributo não ultrapassa o limite inicial", () => {
    const atributos = criarAtributosIniciais();
    atributos.forca = 12;

    assert.equal(alterarAtributo(atributos, "forca", 1).sucesso, false);
});

test("XP inválido não deve ser aceito", () => {
    const personagem = { nivel: 1, xp: 0 };

    assert.equal(adicionarExperiencia(personagem, -100).sucesso, false);
    assert.equal(adicionarExperiencia(personagem, 0).sucesso, false);
    assert.equal(personagem.xp, 0);
});

test("XP suficiente permite subir vários níveis", () => {
    const personagem = { nivel: 1, xp: 0 };

    const resultado = adicionarExperiencia(personagem, 6000);

    assert.equal(resultado.sucesso, true);
    assert.equal(personagem.nivel, 4);
    assert.equal(personagem.xp, 6000);
    assert.equal(resultado.niveisGanhos, 3);
});

import {
    criarMaestrias,
    adicionarExperienciaMaestria
} from "../aplicativos/jogo/atributos/maestria.js";

test("maestrias começam com XP e pontos zerados", () => {
    const maestrias = criarMaestrias();

    assert.equal(Object.keys(maestrias).length, 8);

    for (const maestria of Object.values(maestrias)) {
        assert.equal(maestria.xp, 0);
        assert.equal(maestria.pontosAcumulados, 0);
    }
});

test("100 XP de maestria concedem um ponto", () => {
    const maestrias = criarMaestrias();

    adicionarExperienciaMaestria(maestrias, "forca", 100);

    assert.equal(maestrias.forca.xp, 100);
    assert.equal(maestrias.forca.pontosAcumulados, 1);
});

test("maestria rejeita atributo inexistente", () => {
    const maestrias = criarMaestrias();

    const resultado = adicionarExperienciaMaestria(
        maestrias,
        "atributo-inexistente",
        20
    );

    assert.equal(resultado.sucesso, false);
});

test("maestria rejeita XP negativo", () => {
    const maestrias = criarMaestrias();

    const resultado = adicionarExperienciaMaestria(
        maestrias,
        "forca",
        -20
    );

    assert.equal(resultado.sucesso, false);
    assert.equal(maestrias.forca.xp, 0);
});

import {
    carregarPersonagem,
    salvarPersonagem,
    removerPersonagem
} from "../aplicativos/jogo/personagem/armazenamento.js";

test("armazenamento retorna null quando não existe personagem", () => {
    const armazenamentoOriginal = globalThis.localStorage;

    const dados = new Map();

    globalThis.localStorage = {
        getItem: chave => dados.get(chave) ?? null,
        setItem: (chave, valor) => dados.set(chave, valor),
        removeItem: chave => dados.delete(chave)
    };

    try {
        assert.equal(carregarPersonagem(), null);
    } finally {
        if (armazenamentoOriginal === undefined) {
            delete globalThis.localStorage;
        } else {
            globalThis.localStorage = armazenamentoOriginal;
        }
    }
});

test("armazenamento rejeita JSON corrompido", () => {
    const armazenamentoOriginal = globalThis.localStorage;

    globalThis.localStorage = {
        getItem: () => "{json-invalido",
        setItem: () => {},
        removeItem: () => {}
    };

    try {
        assert.equal(carregarPersonagem(), null);
    } finally {
        if (armazenamentoOriginal === undefined) {
            delete globalThis.localStorage;
        } else {
            globalThis.localStorage = armazenamentoOriginal;
        }
    }
});
