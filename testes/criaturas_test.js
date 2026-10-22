
import test from "node:test";
import assert from "node:assert/strict";

import {
    criarControladorCriaturas
} from "../aplicativos/web/scripts/exploracao/controladorCriaturas.js";

const cenarioTeste = {
    largura: 10,
    altura: 8,
    criaturas: [
        {
            id: "lobo-01",
            monstroId: "lobo-da-floresta",
            x: 3,
            y: 4
        },
        {
            id: "lobo-02",
            monstroId: "lobo-da-floresta",
            x: 5,
            y: 2
        }
    ]
};

test("cria as criaturas cadastradas no cenário", () => {
    const controlador = criarControladorCriaturas(cenarioTeste);

    assert.equal(controlador.listar().length, 2);
});

test("mantém IDs próprios para criaturas do mesmo tipo", () => {
    const controlador = criarControladorCriaturas(cenarioTeste);

    assert.equal(controlador.obterPorId("lobo-01").monstroId, "lobo-da-floresta");
    assert.equal(controlador.obterPorId("lobo-02").monstroId, "lobo-da-floresta");

    assert.notEqual(
        controlador.obterPorId("lobo-01").id,
        controlador.obterPorId("lobo-02").id
    );
});

test("retorna null para uma criatura inexistente", () => {
    const controlador = criarControladorCriaturas(cenarioTeste);

    assert.equal(controlador.obterPorId("dragao-01"), null);
});

test("não altera os dados originais do cenário", () => {
    const original = structuredClone(cenarioTeste);

    criarControladorCriaturas(cenarioTeste);

    assert.deepEqual(cenarioTeste, original);
});

test("não permite IDs de criatura duplicados", () => {
    const cenario = {
        ...cenarioTeste,
        criaturas: [
            cenarioTeste.criaturas[0],
            { ...cenarioTeste.criaturas[1], id: "lobo-01" }
        ]
    };

    assert.throws(
        () => criarControladorCriaturas(cenario),
        /duplicado/
    );
});

test("rejeita posições fora dos limites do cenário", () => {
    const cenario = {
        ...cenarioTeste,
        criaturas: [
            {
                id: "lobo-03",
                monstroId: "lobo-da-floresta",
                x: 10,
                y: 4
            }
        ]
    };

    assert.throws(
        () => criarControladorCriaturas(cenario),
        /posição inválida/
    );
});

test("rejeita criaturas sem monstroId válido", () => {
    const cenario = {
        ...cenarioTeste,
        criaturas: [
            {
                id: "lobo-04",
                x: 3,
                y: 4
            }
        ]
    };

    assert.throws(
        () => criarControladorCriaturas(cenario),
        /monstroId válido/
    );
});

test("retorna cópias dos dados das criaturas", () => {
    const controlador = criarControladorCriaturas(cenarioTeste);

    const criatura = controlador.obterPorId("lobo-01");
    criatura.x = 9;

    assert.equal(controlador.obterPorId("lobo-01").x, 3);
});
