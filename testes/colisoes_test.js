
import test from "node:test";
import assert from "node:assert/strict";

import {
    estaDentroDoCenario,
    posicaoBloqueada
} from "../aplicativos/web/scripts/exploracao/colisoes.js";

const cenarioTeste = {
    largura: 6,
    altura: 5,
    terreno: Array.from(
        { length: 5 },
        () => Array(6).fill("grama")
    ),
    terrenosBloqueados: ["agua", "pedra"],
    objetos: [
        { tipo: "arvore", x: 1, y: 1 },
        { tipo: "pedra", x: 3, y: 1 },
        { tipo: "casa", x: 2, y: 2, largura: 2, altura: 2 },
        { tipo: "baú", x: 5, y: 4, bloqueiaMovimento: true },
        { tipo: "flor", x: 0, y: 1 }
    ]
};

test("reconhece posições dentro dos limites", () => {
    assert.equal(estaDentroDoCenario(cenarioTeste, 0, 0), true);
    assert.equal(estaDentroDoCenario(cenarioTeste, 5, 4), true);
});

test("rejeita posições fora dos limites", () => {
    assert.equal(estaDentroDoCenario(cenarioTeste, -1, 0), false);
    assert.equal(estaDentroDoCenario(cenarioTeste, 6, 0), false);
    assert.equal(estaDentroDoCenario(cenarioTeste, 0, 5), false);
});

test("bloqueia árvores e pedras", () => {
    assert.equal(posicaoBloqueada(cenarioTeste, 1, 1), true);
    assert.equal(posicaoBloqueada(cenarioTeste, 3, 1), true);
});

test("bloqueia toda a área ocupada pela casa", () => {
    assert.equal(posicaoBloqueada(cenarioTeste, 2, 2), true);
    assert.equal(posicaoBloqueada(cenarioTeste, 3, 2), true);
    assert.equal(posicaoBloqueada(cenarioTeste, 2, 3), true);
    assert.equal(posicaoBloqueada(cenarioTeste, 3, 3), true);
    assert.equal(posicaoBloqueada(cenarioTeste, 4, 3), false);
});

test("bloqueia terrenos configurados como intransitáveis", () => {
    cenarioTeste.terreno[0][2] = "agua";
    cenarioTeste.terreno[0][3] = "pedra";

    assert.equal(posicaoBloqueada(cenarioTeste, 2, 0), true);
    assert.equal(posicaoBloqueada(cenarioTeste, 3, 0), true);
});

test("permite atravessar células livres e objetos não bloqueantes", () => {
    assert.equal(posicaoBloqueada(cenarioTeste, 0, 0), false);
    assert.equal(posicaoBloqueada(cenarioTeste, 0, 1), false);
    assert.equal(posicaoBloqueada(cenarioTeste, 4, 4), false);
});

test("bloqueia objetos novos configurados para impedir passagem", () => {
    assert.equal(posicaoBloqueada(cenarioTeste, 5, 4), true);
});

test("considera posições fora do mapa bloqueadas", () => {
    assert.equal(posicaoBloqueada(cenarioTeste, -1, 0), true);
    assert.equal(posicaoBloqueada(cenarioTeste, 6, 0), true);
});
