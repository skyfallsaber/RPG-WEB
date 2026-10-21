
import test from "node:test";
import assert from "node:assert/strict";

import {
    executarTurnoAtual
} from "../aplicativos/jogo/combate/fluxoCombate.js";

import {
    iniciarCombate
} from "../aplicativos/jogo/combate/combate.js";

import {
    salvarPersonagem,
    carregarPersonagem,
    removerPersonagem
} from "../aplicativos/jogo/personagem/armazenamento.js";

function criarLocalStorageFalso() {
    const dados = new Map();

    return {
        getItem(chave) {
            return dados.get(chave) ?? null;
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
        constituicao: 0,
        inteligencia: 5,
        sabedoria: 5,
        carisma: 5,
        sorte: 5
    };

    const maestrias = Object.fromEntries(
        Object.keys(atributos).map(atributo => [
            atributo,
            { xp: 0, pontosAcumulados: 0 }
        ])
    );

    return {
        nome: "Teste",
        nivel: 1,
        xp: 0,
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

test("fluxo integrado retorna à Praça quando o personagem é derrotado", () => {
    const armazenamentoOriginal = globalThis.localStorage;
    globalThis.localStorage = criarLocalStorageFalso();

    try {
        const personagem = criarPersonagemTeste();
        assert.equal(salvarPersonagem(personagem).sucesso, true);

        const monstro = {
            id: "monstro-teste",
            nome: "Monstro de Teste",
            vidaMaxima: 100,
            ataque: 100,
            defesa: 0,
            agilidade: 0,
            recompensa: { xp: 50 }
        };

        const inicio = iniciarCombate(personagem, monstro);
        assert.equal(inicio.sucesso, true);

        const combate = inicio.combate;
        combate.turnoAtual = "monstro";

        const resultado = executarTurnoAtual(combate);

        assert.equal(resultado.sucesso, true);
        assert.equal(combate.status, "derrota");
        assert.equal(resultado.derrotaProcessada, true);

        const personagemSalvo = carregarPersonagem();

        assert.equal(personagemSalvo.localizacao.localId, "praca");
        assert.equal(personagemSalvo.xp, 0);
        assert.equal(personagemSalvo.nivel, 1);
    } finally {
        removerPersonagem();
        globalThis.localStorage = armazenamentoOriginal;
    }
});
