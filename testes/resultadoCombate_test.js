
import test from "node:test";
import assert from "node:assert/strict";

import {
    processarDerrota
} from "../aplicativos/jogo/combate/resultadoCombate.js";

import {
    salvarPersonagem,
    carregarPersonagem,
    removerPersonagem
} from "../aplicativos/jogo/personagem/armazenamento.js";

function criarLocalStorageFalso() {
    const dados = new Map();

    return {
        getItem(chave) {
            return dados.has(chave) ? dados.get(chave) : null;
        },

        setItem(chave, valor) {
            dados.set(chave, String(valor));
        },

        removeItem(chave) {
            dados.delete(chave);
        }
    };
}

function criarPersonagemTeste() {
    const atributos = {
        forca: 5,
        destreza: 5,
        agilidade: 5,
        constituicao: 5,
        inteligencia: 5,
        sabedoria: 5,
        carisma: 5,
        sorte: 5
    };

    const maestrias = Object.fromEntries(
        Object.keys(atributos).map(atributo => [
            atributo,
            {
                xp: 20,
                pontosAcumulados: 1
            }
        ])
    );

    return {
        nome: "Personagem de Teste",
        nivel: 3,
        xp: 250,
        classe: null,
        atributos,
        maestrias,
        localizacao: {
            regiaoId: "regiao-inicial",
            cidadeId: "cidade-inicial",
            localId: "floresta-inicial"
        }
    };
}

test("derrota retorna o personagem à Praça preservando o progresso", () => {
    const armazenamentoOriginal = globalThis.localStorage;

    globalThis.localStorage = criarLocalStorageFalso();

    try {
        const personagem = criarPersonagemTeste();
        const salvamento = salvarPersonagem(personagem);

        assert.equal(salvamento.sucesso, true);

        const combate = {
            status: "derrota"
        };

        const resultado = processarDerrota(combate);

        assert.equal(resultado.sucesso, true);
        assert.deepEqual(resultado.localizacaoAtual, {
            regiaoId: "regiao-inicial",
            cidadeId: "cidade-inicial",
            localId: "praca"
        });

        const personagemSalvo = carregarPersonagem();

        assert.equal(personagemSalvo.xp, 250);
        assert.equal(personagemSalvo.nivel, 3);
        assert.deepEqual(
            personagemSalvo.atributos,
            personagem.atributos
        );
        assert.deepEqual(
            personagemSalvo.maestrias,
            personagem.maestrias
        );
    } finally {
        removerPersonagem();
        globalThis.localStorage = armazenamentoOriginal;
    }
});

test("não processa derrota quando o combate não foi perdido", () => {
    const resultado = processarDerrota({
        status: "em_andamento"
    });

    assert.equal(resultado.sucesso, false);
});

test("não processa a mesma derrota duas vezes", () => {
    const armazenamentoOriginal = globalThis.localStorage;

    globalThis.localStorage = criarLocalStorageFalso();

    try {
        salvarPersonagem(criarPersonagemTeste());

        const combate = {
            status: "derrota"
        };

        const primeiraTentativa = processarDerrota(combate);
        const segundaTentativa = processarDerrota(combate);

        assert.equal(primeiraTentativa.sucesso, true);
        assert.equal(segundaTentativa.sucesso, false);
    } finally {
        removerPersonagem();
        globalThis.localStorage = armazenamentoOriginal;
    }
});
