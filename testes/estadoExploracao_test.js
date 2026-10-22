import test from "node:test";
import assert from "node:assert/strict";

import {
    CHAVE_ESTADO_EXPLORACAO,
    criarEstadoExploracao,
    carregarPosicoesExploracao,
    obterPosicaoLocal,
    salvarPosicaoLocal
} from "../aplicativos/jogo/exploracao/estadoExploracao.js";

function criarArmazenamentoFalso() {
    const dados = new Map();

    return {
        getItem(chave) {
            return dados.has(chave) ? dados.get(chave) : null;
        },
        setItem(chave, valor) {
            dados.set(chave, String(valor));
        }
    };
}

test("cria estado inicial para um local sem salvar automaticamente", () => {
    const armazenamento = criarArmazenamentoFalso();
    const estado = criarEstadoExploracao("praca", { x: 20, y: 30 });

    assert.deepEqual(estado, {
        localId: "praca",
        posicao: { x: 20, y: 30 }
    });
    assert.equal(armazenamento.getItem(CHAVE_ESTADO_EXPLORACAO), null);
});

test("usa a posição inicial quando o local ainda não tem posição salva", () => {
    const armazenamento = criarArmazenamentoFalso();

    assert.deepEqual(
        obterPosicaoLocal("praca", { x: 100, y: 80 }, armazenamento),
        { x: 100, y: 80 }
    );
});

test("salva e recupera a última posição de um local", () => {
    const armazenamento = criarArmazenamentoFalso();

    salvarPosicaoLocal("praca", { x: 320, y: 180 }, armazenamento);

    assert.deepEqual(
        obterPosicaoLocal("praca", { x: 10, y: 10 }, armazenamento),
        { x: 320, y: 180 }
    );
});

test("mantém posições independentes para locais diferentes", () => {
    const armazenamento = criarArmazenamentoFalso();

    salvarPosicaoLocal("praca", { x: 320, y: 180 }, armazenamento);
    salvarPosicaoLocal("floresta-inicial", { x: 640, y: 420 }, armazenamento);

    assert.deepEqual(carregarPosicoesExploracao(armazenamento), {
        praca: { x: 320, y: 180 },
        "floresta-inicial": { x: 640, y: 420 }
    });
});

test("ignora conteúdo JSON corrompido e usa a posição inicial", () => {
    const armazenamento = criarArmazenamentoFalso();
    armazenamento.setItem(CHAVE_ESTADO_EXPLORACAO, "{conteudo inválido");

    assert.deepEqual(
        obterPosicaoLocal("praca", { x: 15, y: 25 }, armazenamento),
        { x: 15, y: 25 }
    );
});

test("rejeita IDs vazios e coordenadas inválidas", () => {
    assert.throws(
        () => criarEstadoExploracao("", { x: 0, y: 0 }),
        /ID do local/
    );
    assert.throws(
        () => criarEstadoExploracao("praca", { x: -1, y: 0 }),
        /coordenadas/
    );
    assert.throws(
        () => salvarPosicaoLocal("praca", { x: 1, y: Number.NaN }, criarArmazenamentoFalso()),
        /coordenadas/
    );
});
